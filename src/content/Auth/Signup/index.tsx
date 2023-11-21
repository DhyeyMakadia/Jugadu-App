import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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

const Signup = () => {
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
            <Card>
              <CardHeader title="Create an account" />
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
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Your Name"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
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
                        label="Your Email"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Your Password"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Repeat your password"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="standard-search"
                        label="Your Referral Code (Optional)"
                        type="text"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Checkbox defaultChecked />
                      <Typography component="span" variant="body1">
                        I Agree all statements in&nbsp;
                      </Typography>
                      <Link href="#">Terms of service</Link>
                    </Grid>
                    <Grid item xs={12} className="create-account">
                      <Button size="medium" variant="contained">
                        Create Account
                      </Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center" marginTop={2}>
                      <Typography component="span" variant="body1">
                        Already have an account?&nbsp;
                      </Typography>
                      <Button
                        component={RouterLink}
                        size="medium"
                        variant="outlined"
                        to={'/login'}
                      >
                        Login
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

export default Signup;
