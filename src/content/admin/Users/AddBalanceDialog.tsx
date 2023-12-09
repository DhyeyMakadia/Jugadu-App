import React, { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Slide,
  TextField} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import WalletService from 'src/services/wallet/index';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type AddBalanceDialogProps = {
  isOpen: boolean;
  id: number;
  handleClose: () => void;
  refetch: () => void;
};

const AddBalanceDialog: FC<AddBalanceDialogProps> = ({
  isOpen,
  id,
  handleClose,
  refetch
}) => {
  const [amount, setAmount] = useState(0);
  const handleAddBalanceSubmit = () => {
    WalletService.AddBalance({ user_id: id, amount: amount }).then((res) => {
      if (res.data.success) {
        toast.success('Balance Added Successfully');
        handleClose();
        refetch();
      }
    });
    console.log(id, amount);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Balance</DialogTitle>
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
                name="balance"
                id="balance"
                label="Balance"
                autoFocus
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddBalanceSubmit}>Add Balance</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBalanceDialog;
