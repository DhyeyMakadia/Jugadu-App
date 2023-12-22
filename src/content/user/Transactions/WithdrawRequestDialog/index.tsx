import React, { FC, useRef, useState } from 'react';
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
  Slide,
  IconButton,
  FormHelperText
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { toast } from 'react-toastify';
import WithdrawService from 'src/services/withdraw/index';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { preventNonNumericalInput } from 'src/utils/helperFunctions';

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
  const formRef = useRef<any>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    amount: Yup.string()
      .matches(/^\d+$/, 'Amount must be in digits only')
      .required('Amount is required'),
    accountNo: Yup.string()
      .matches(/^\d+$/, 'Account Number must be digits only')
      .required('Account Number is required'),
    confirmAccountNo: Yup.string()
      .oneOf([Yup.ref('accountNo')], 'Account Number must match')
      .matches(/^\d+$/, 'Account Number must be digits only')
      .required('Confirm Account Number is required'),
    ifsc: Yup.string().required('IFSC Code is required')
  });

  const handleAddWithdrawRequest = (values: FormikValues) => {
    if (values.amount > 500) {
      const payload = {
        request_amount: values.amount,
        account_holder_name: values.name,
        account_number: values.accountNo,
        ifsc_code: values.ifsc
      };
      WithdrawService.CreateWithdrawRequest(payload).then((res) => {
        if (res.data.success) {
          toast.success('Withdraw Request Created Successfully');
          formRef.current.resetForm();
          handleClose(true);
        } else {
          toast.error(res.data.message);
        }
      });
    } else {
      toast.error('Withdraw Amount must be greater than ₹500');
    }
  };

  const handleDialogClose = () => {
    formRef.current.resetForm();
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
      <Formik
        initialValues={{
          name: '',
          amount: null,
          accountNo: '',
          confirmAccountNo: '',
          ifsc: ''
        }}
        innerRef={formRef}
        validationSchema={validationSchema}
        onSubmit={handleAddWithdrawRequest}
        enableReinitialize
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form>
              <DialogTitle>Add Withdraw Request</DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleDialogClose}
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
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={!!(errors.amount && touched.amount)}
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <TextField
                        margin="dense"
                        name="amount"
                        id="amount"
                        label="Amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        fullWidth
                        variant="standard"
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="amount" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={!!(errors.name && touched.name)}
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <TextField
                        margin="dense"
                        name="name"
                        id="name"
                        label="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <FormHelperText error>
                        <ErrorMessage name="name" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={!!(errors.accountNo && touched.accountNo)}
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <TextField
                        margin="dense"
                        name="accountNo"
                        id="accountNo"
                        label="Account Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        fullWidth
                        variant="standard"
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="accountNo" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={
                        !!(errors.confirmAccountNo && touched.confirmAccountNo)
                      }
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <TextField
                        margin="dense"
                        name="confirmAccountNo"
                        id="ConfirmAccountNo"
                        label="Confirm Account Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        fullWidth
                        variant="standard"
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="confirmAccountNo" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={!!(errors.ifsc && touched.ifsc)}
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <TextField
                        margin="dense"
                        name="ifsc"
                        id="ifsc"
                        label="IFSC Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <FormHelperText error>
                        <ErrorMessage name="ifsc" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel Request</Button>
                <Button type="submit">Add Request</Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default WithdrawRequestDialog;
