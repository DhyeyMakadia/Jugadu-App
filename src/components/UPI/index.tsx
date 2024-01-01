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
import React, { FC, useEffect, useRef, useState } from 'react';
import { ValidationMessage } from 'src/utils/resources';
import WalletService from 'src/services/wallet/index';
import { toast } from 'react-toastify';
import { GetUpiObject } from 'src/services/types/wallet';

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

const UPIDialog: FC<Props> = ({ isOpen, handleClose }) => {
  const [upiData, setUpiData] = useState<GetUpiObject>({
    upi_id: '',
    merchant_name: ''
  });

  const formRef = useRef<any>(null);

  const validationSchema = Yup.object().shape({
    merchant_name: Yup.string().required(
      `Merchant ${ValidationMessage.NameRequired}`
    ),
    upi_id: Yup.string().required('UPI Id is required')
  });

  const getUpiDetails = () => {
    WalletService.GetUpiDetails().then((res) => {
      if (res.data.success) {
        setUpiData(res.data.data);
      }
    });
  };

  const handleChangePassword = (values: FormikValues) => {
    const payload = {
      upi_id: values.upi_id,
      merchant_name: values.merchant_name
    };
    WalletService.UpdateUpiDetails(payload).then((res) => {
      if (res.data.success) {
        handleClose();
        toast.success('UPI Details Updated Successfully');
      } else {
        toast.error(res.data.message);
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      getUpiDetails();
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
      <DialogTitle>Change UPI Credentials</DialogTitle>
      <Formik
        initialValues={{
          merchant_name: upiData.merchant_name ?? '',
          upi_id: upiData.upi_id ?? ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
        innerRef={formRef}
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
                    error={!!(errors.merchant_name && touched.merchant_name)}
                  >
                    {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                    <TextField
                      margin="dense"
                      name="merchant_name"
                      value={values.merchant_name}
                      id="name"
                      label="Merchant Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="merchant_name" />
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ pb: '20px' }}
                    error={!!(errors.upi_id && touched.upi_id)}
                  >
                    {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                    <TextField
                      margin="dense"
                      name="upi_id"
                      id="id"
                      label="UPI Id"
                      value={values.upi_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="upi_id" />
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button type="submit">Update Credentials</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UPIDialog;
