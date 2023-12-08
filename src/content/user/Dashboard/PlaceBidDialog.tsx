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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type PlaceBidDialogProps = {
  isOpen: boolean;
  handleClose: (x?: boolean) => void;
  zodiacId: number;
};

const PlaceBidDialog: FC<PlaceBidDialogProps> = ({
  isOpen,
  handleClose,
  zodiacId
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [bidAmount, setBidAmount] = useState<number>(500);

  const handlePlaceBid = () => {
    if (bidAmount > 0) {
      const payload = {
        zodiac_id: zodiacId,
        bid_amount: bidAmount
      };
      BidService.PlaceBid(payload).then((res) => {
        if (res.data.success) {
          toast.success('Bid Placed Successfully');
          handleClose(true);
        }
      });
    } else {
      toast.error('Bid Amount must be greater than zero');
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Place Bid</DialogTitle>
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
                onChange={(e) => setBidAmount(Number(e.target.value))}
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
        <Button onClick={() => handleClose()}>Cancel Bid</Button>
        <Button onClick={handlePlaceBid}>Place Bid</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceBidDialog;
