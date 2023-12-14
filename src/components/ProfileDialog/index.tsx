import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import UserService from 'src/services/users/index';
import { MyProfileObject } from 'src/services/types/users';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type ProfileDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ProfileDialog: FC<ProfileDialogProps> = ({ isOpen, handleClose }) => {
  const [profileDetails, setProfileDetails] = useState<MyProfileObject>();

  const getProfileDetails = () => {
    UserService.ProfileDetails().then((res) => {
      if (res.data.success) {
        setProfileDetails(res.data.data[0]);
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      getProfileDetails();
    }
  }, [isOpen]);

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>My Profile</DialogTitle>
      <DialogContent>
        <Grid container xs={12}>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              id="outlined-read-only-input"
              label="Name"
              value={profileDetails?.name}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              id="outlined-read-only-input"
              label="Mobile"
              value={profileDetails?.mobile_number}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              id="outlined-read-only-input"
              label="Email"
              value={profileDetails?.email}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              id="outlined-read-only-input"
              label="Referral"
              value={profileDetails?.referral_code}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
