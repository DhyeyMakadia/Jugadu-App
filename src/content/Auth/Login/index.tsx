import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';

const Login = () => {
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
            <Card>
              <CardHeader title="Login" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  className="login-box"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Country Code"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Mobile Number"
                        type="number"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Password"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Link href="#">Forgot Password?</Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Button size="medium" variant="contained" fullWidth>
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
                        to={'/signup'}
                      >
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
