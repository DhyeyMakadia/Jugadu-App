import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { Helmet } from 'react-helmet-async';
import { Link, NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { preventNonNumericalInput } from 'src/utils/helperFunctions';
import { ValidationMessage } from 'src/utils/resources';
import * as Yup from 'yup';
import AuthService from 'src/services/auth/index';
import { toast } from 'react-toastify';
import { ROUTES } from 'src/utils/routes';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    mobile_number: Yup.string()
      .length(10, 'Mobile Number must of 10 Characters')
      .matches(/^\d+$/, 'Mobile Number must be digits only')
      .required(ValidationMessage.MobileRequired),
    name: Yup.string().required(ValidationMessage.NameRequired),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is Required'),
    password: Yup.string()
      .transform((value) => (!value ? null : value))
      .required('Password is Required'),
    repeatPassword: Yup.string().when('password', (password, field) => {
      if (password[0]) {
        return field
          .required(ValidationMessage.InvalidConfirmPassword)
          .oneOf(
            [Yup.ref('password')],
            ValidationMessage.InvalidConfirmPassword
          );
      } else {
        return field.required('Confirm Password is Requrired');
      }
    }),
    referral: Yup.string().nullable()
  });

  const handleSignup = (values: FormikValues) => {
    const payload = {
      name: values.name,
      mobile_number: values.mobile_number,
      email: values.email,
      password: values.password
    };
    AuthService.signUp(payload).then((res) => {
      if (res.data.success) {
        toast.success('User created successfully');
        navigate(ROUTES.Login);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <Container style={{ height: '100%' }} maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          height="100%"
        >
          <Grid item md={8} xs={12} margin={2}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                mobile_number: '',
                password: '',
                repeatPassword: '',
                referral: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
              enableReinitialize
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Card>
                      <CardHeader title="Create an account" />
                      <Divider />
                      <CardContent>
                        <Box className="login-box">
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                id="standard-search"
                                name="name"
                                label="Your Name"
                                type="text"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.name && !!touched.name}
                              />
                              <FormHelperText error className="custom-error">
                                <ErrorMessage name="name" />
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name="mobile_number"
                                id="standard-search"
                                label="Mobile Number"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                onKeyPress={(e) => preventNonNumericalInput(e)}
                                error={
                                  !!errors.mobile_number &&
                                  !!touched.mobile_number
                                }
                              />
                              <FormHelperText error className="custom-error">
                                <ErrorMessage name="mobile_number" />
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                id="standard-search"
                                name="email"
                                label="Your Email"
                                type="text"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.email && !!touched.email}
                              />
                              <FormHelperText error className="custom-error">
                                <ErrorMessage name="email" />
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                id="standard-search"
                                name="password"
                                label="Your Password"
                                type="password"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.password && !!touched.password}
                              />
                              <FormHelperText error className="custom-error">
                                <ErrorMessage name="password" />
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                id="standard-search"
                                name="repeatPassword"
                                label="Repeat your password"
                                type="password"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  !!errors.repeatPassword &&
                                  !!touched.repeatPassword
                                }
                              />
                              <FormHelperText error className="custom-error">
                                <ErrorMessage name="repeatPassword" />
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                id="standard-search"
                                name="referral"
                                label="Your Referral Code (Optional)"
                                type="text"
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Checkbox
                                checked={isTermsChecked}
                                onChange={(e, value) =>
                                  setIsTermsChecked(value)
                                }
                              />
                              <Typography component="span" variant="body1">
                                I Agree all statements in&nbsp;
                              </Typography>
                              <Link to={ROUTES.TnC}>Terms of service</Link>
                            </Grid>
                            <Grid item xs={12} className="create-account">
                              <Button
                                size="medium"
                                variant="contained"
                                type="submit"
                                disabled={!isTermsChecked}
                              >
                                Create Account
                              </Button>
                            </Grid>
                            <Grid item xs={12} textAlign="center" marginTop={2}>
                              <Typography component="span" variant="body1">
                                Already have an account?&nbsp;
                              </Typography>
                              <Button
                                component={RouterLink}
                                size="small"
                                variant="text"
                                to={'/login'}
                              >
                                Login
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Signup;
