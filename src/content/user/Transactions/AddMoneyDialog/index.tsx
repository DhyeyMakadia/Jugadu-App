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
import WalletService from 'src/services/wallet/index';
import Swal from 'sweetalert2';
import environment from 'src/environment';

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

const AddMoneyDialog: FC<Props> = ({ handleClose, isOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [addMoneyAmount, setAddMoneyAmount] = useState<number>(0);

  const handleAddWithdrawRequest = () => {
    if (addMoneyAmount > 0) {
      WalletService.UserAddBalance({
        amount: addMoneyAmount
      }).then((res) => {
        if (res.data.success) {
          toast.success('Withdraw Request Created Successfully');
          handleClose(true);
        } else if (
          res.data.message === 'Your amount cannot be greater than 2000'
        ) {
          handleClose();
          Swal.fire({
            icon: 'info',
            title: 'Approval needed',
            text: 'Kindly submit a request to the administrator to authorize the addition of funds exceeding the amount of ₹2000.'
          })
            .then((result) => {
              if (result.isConfirmed) {
                const message = encodeURI(
                  `Hello admin, \n\nI Need to add ${addMoneyAmount} Rupees to my SP Rashi FAL Wallet. \n\nThanks.`
                );
                window.open(
                  `https://wa.me/${environment.contact}?text=${message}`
                );
              }
            })
            .finally(() => {
              setAddMoneyAmount(0);
            });
        }
      });
    } else {
      toast.error('Withdraw Amount must be greater than zero');
    }
  };

  const handleDialogClose = () => {
    setAddMoneyAmount(0);
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
      <DialogTitle>Add Money</DialogTitle>
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
                onChange={(e) => setAddMoneyAmount(Number(e.target.value))}
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
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleAddWithdrawRequest}>Add Money</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMoneyDialog;
