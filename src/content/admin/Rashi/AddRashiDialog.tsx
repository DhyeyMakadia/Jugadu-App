import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Slide,
  Switch,
  TextField,
  useMediaQuery,
  Typography,
  IconButton
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { RashiObject } from 'src/services/types/rashi';
import { ErrorMessage, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import RashiService from 'src/services/rashi/index';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type AddRashiDialogProps = {
  data: RashiObject;
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
};

const AddRashiDialog: FC<AddRashiDialogProps> = ({
  data,
  isOpen,
  handleClose,
  refetch
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    order: Yup.string()
      .matches(/^\d+$/, 'Order must be digits only')
      .required('Order is required'),
    image: Yup.mixed().nullable(),
    status: Yup.boolean()
  });

  const handleAddRashiSubmit = (values: FormikValues) => {
    const formData = new FormData();
    if (values.image) {
      const file = values?.image?.target
        ? values?.image?.target?.files[0]
        : values.image;
      formData.append('image', file);
    }
    const status = values.status ? '1' : '0';
    formData.append('name', values.name);
    formData.append('order', values.order);
    formData.append('status', status);

    if (data) {
      RashiService.UpdateRashi(data.id, formData).then((res) => {
        if (res.data.success) {
          toast.success('Rashi updated Successfully');
          handleClose();
          refetch();
        }
      });
    } else {
      RashiService.AddRashi(formData).then((res) => {
        if (res.data.success) {
          toast.success('Rashi added Successfully');
          handleClose();
          refetch();
        }
      });
    }
  };
  return (
    <Formik
      initialValues={{
        name: data?.name ?? '',
        order: data?.order ?? 0,
        image: data?.image ?? null,
        status: data?.status ?? true
      }}
      validationSchema={validationSchema}
      onSubmit={handleAddRashiSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => {
        const fileName = values?.image?.target?.files[0]?.name;
        return (
          <form onSubmit={handleSubmit} encType="multipart/formdata">
            <Dialog
              fullScreen={fullScreen}
              onClose={handleClose}
              open={isOpen}
              TransitionComponent={Transition}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>{data ? 'Edit Rashi' : 'Add Rashi'}</DialogTitle>
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
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <FormHelperText error sx={{ ml: 0 }}>
                        <ErrorMessage name="name" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={!!(errors.order && touched.order)}
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <TextField
                        margin="dense"
                        name="order"
                        id="order"
                        label="Order"
                        type="number"
                        value={values.order}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        variant="standard"
                      />
                      <FormHelperText error sx={{ ml: 0 }}>
                        <ErrorMessage name="order" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      sx={{ pb: '20px' }}
                      error={!!(errors.image && touched.image)}
                    >
                      {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Image
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => setFieldValue('image', e)}
                          name="image"
                        />
                      </Button>
                      <Typography component="div" variant="body1">
                        {fileName}
                      </Typography>
                      <FormHelperText error>
                        <ErrorMessage name="image" />
                      </FormHelperText>
                    </FormControl>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{ pb: '10px' }}
                        error={!!(errors.status && touched.status)}
                      >
                        {/* <InputLabel htmlFor="switch">Name</InputLabel> */}
                        <FormControlLabel
                          control={
                            <Switch
                              onChange={(e, value) =>
                                setFieldValue('status', value)
                              }
                              checked={values.status}
                              color="primary"
                            />
                          }
                          label="Status"
                          labelPlacement="start"
                          sx={{ mr: 1 }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="status" />
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add Rashi</Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddRashiDialog;
