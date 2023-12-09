import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  TextField,
  Button,
  DialogActions,
  useTheme,
  useMediaQuery,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import BidService from 'src/services/bids/index';
import { toast } from 'react-toastify';
import { StatusCode } from 'src/utils/constants';
import WithdrawService from 'src/services/withdraw/index';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
  isOpen: boolean;
  handleClose: (x?: boolean) => void;
};

const WithdrawRequestDialog: FC<Props> = ({ handleClose, isOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  const handleAddWithdrawRequest = () => {
    if (withdrawAmount > 0) {
      WithdrawService.CreateWithdrawRequest({
        request_amount: withdrawAmount
      }).then((res) => {
        if (res.data.success) {
          toast.success('Withdraw Request Created Successfully');
          setWithdrawAmount(0);
          handleClose(true);
        }
      });
    } else {
      toast.error('Withdraw Amount must be greater than zero');
    }
  };

  const handleDialogClose = () => {
    setWithdrawAmount(0);
    handleClose();
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleDialogClose}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Withdraw Request</DialogTitle>
      <DialogContent>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ pb: '20px' }}
              // error={!!(errors.name && touched.name)}
            >
              {/* <InputLabel htmlFor="name">Name</InputLabel> */}
              <TextField
                margin="dense"
                name="amount"
                id="amount"
                label="Amount"
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                type="number"
                fullWidth
                variant="standard"
              />
              {/* <FormHelperText error>
            <ErrorMessage name="mobile_number" />
          </FormHelperText> */}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel Request</Button>
        <Button onClick={handleAddWithdrawRequest}>Add Request</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawRequestDialog;