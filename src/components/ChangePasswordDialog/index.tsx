import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  TextField,
  DialogActions,
  Button,
  Slide,
  FormHelperText
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import React, { FC } from 'react';
import { ValidationMessage } from 'src/utils/resources';
import UserService from 'src/services/users/index';
import { toast } from 'react-toastify';

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
  handleClose: () => void;
};

const ChangePasswordDialog: FC<Props> = ({ isOpen, handleClose }) => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .transform((value) => (!value ? null : value))
      .required(ValidationMessage.PasswordRequired),
    password: Yup.string()
      .transform((value) => (!value ? null : value))
      .required(ValidationMessage.PasswordRequired),
    confirmPassword: Yup.string()
      .required(ValidationMessage.ConfirmPasswordRequired)
      .oneOf([Yup.ref('password')], ValidationMessage.InvalidConfirmPassword)
  });

  const handleChangePassword = (values: FormikValues) => {
    const payload = {
      old_password: values.oldPassword,
      new_password: values.password
    };
    console.log(payload);
    UserService.ChangePassword(payload).then((res) => {
      debugger
      if (res.data.success) {
        handleClose();
        toast.success('Password Changed Successfully');
      } else {
        debugger
        toast.error(res.data.message);
      }
    });
  };
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Change Password</DialogTitle>
      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ pb: '20px' }}
                    error={!!(errors.oldPassword && touched.oldPassword)}
                  >
                    {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                    <TextField
                      margin="dense"
                      name="oldPassword"
                      id="amount"
                      label="Old Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="oldPassword" />
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ pb: '20px' }}
                    error={!!(errors.password && touched.password)}
                  >
                    {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                    <TextField
                      margin="dense"
                      name="password"
                      id="amount"
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="password" />
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ pb: '20px' }}
                    error={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                  >
                    {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                    <TextField
                      margin="dense"
                      name="confirmPassword"
                      id="amount"
                      label="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="confirmPassword" />
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button type="submit">Change Password</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ChangePasswordDialog;
