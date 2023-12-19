import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  useTheme,
  useMediaQuery,
  Slide,
  IconButton
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

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
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleClose()}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Money</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <img
              src="/Payment-QRCode.jpg"
              alt=""
              style={{ objectFit: 'contain', width: '100%' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyDialog;
