import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { ROUTES } from 'src/utils/routes';
import AuthService from 'src/services/auth/index';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ValidationMessage } from 'src/utils/resources';
import { StatusCode } from 'src/utils/constants';
import { ThemeContext } from 'src/theme/ThemeProvider';
import { useContext } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { setShowLoader } = useContext(ThemeContext)
  
  const validationSchema = Yup.object().shape({
    mobile_number: Yup.string()
      .length(10, 'Mobile Number must of 10 Characters')
      .matches(/^\d+$/, 'Mobile Number must be digits only')
      .required('Mobile Number is required'),
    password: Yup.string().required('Password is Required')
  });

  const handleLogin = (values: FormikValues) => {
    const payload = {
      mobile_number: values.mobile_number,
      password: values.password
    };
    setShowLoader(true);
    AuthService.signIn(payload)
      .then((response) => {
        if (!response.data || !response.data.data.authToken) {
          setShowLoader(false);
          toast.error(ValidationMessage.InvalidCredentials);
          return;
        }
        if (response.data) {
          Cookies.set('auth_token', response.data.data.authToken);
          Cookies.set('isAdmin', String(response.data.data.is_admin));
          Cookies.set('LoggedInUser', String(response.data.data.name));
          setShowLoader(false);
          if (response.data.data.is_admin) {
            navigate(ROUTES.AdminDashboard);
            toast.success(ValidationMessage.SignInSuccess);
          } else  {
            navigate(ROUTES.Dashboard);
            toast.success(ValidationMessage.SignInSuccess);
          }
        } else {
          setShowLoader(false);
          toast.error(ValidationMessage.InvalidCredentials);
          return;
        }
      })
      .catch((err) => {
        setShowLoader(false);
        switch (err?.response?.status) {
          case StatusCode.Forbidden:
            toast.error(ValidationMessage.InactiveUser);
            break;
          case StatusCode.Unauthorized:
            toast.error(ValidationMessage.InvalidCredentials);
            break;
          case StatusCode.Conflict:
            toast.error(err?.response?.data?.message);
            break;
          default:
            toast.error(ValidationMessage.SomethingWentWrong);
            break;
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
          <Grid item md={8} xs={12}>
            <Formik
              initialValues={{
                mobile_number: '',
                password: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
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
                      <CardHeader title="Login" />
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
                                name="password"
                                fullWidth
                                id="standard-search"
                                label="Password"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                error={!!(errors.password && touched.password)}
                              />
                              <FormHelperText error className="custom-error">
                                <ErrorMessage name="password" />
                              </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                              <Link to={ROUTES.ForgotPassword}>
                                Forgot Password?
                              </Link>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                size="medium"
                                variant="contained"
                                fullWidth
                              >
                                Login
                              </Button>
                            </Grid>
                            <Grid item xs={12} textAlign="center" marginTop={1}>
                              <Typography component="span" variant="body1">
                                New User?&nbsp;
                              </Typography>
                              <Button
                                component={RouterLink}
                                size="medium"
                                variant="outlined"
                                to={ROUTES.Signup}
                              >
                                Register
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

export default Login;
