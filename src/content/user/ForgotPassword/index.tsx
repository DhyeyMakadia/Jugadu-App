import {
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  CardContent,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import Text from 'src/components/Text';
import { ROUTES } from 'src/utils/routes';

const ForgotPassword = () => {
  return (
    <Container>
      <Grid container spacing={3} marginTop={5}>
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h2" gutterBottom>
                  Forgot Password
                </Typography>
                <Typography variant="subtitle2">
                  OOPS! Sorry to hear that your password is lost
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Step 1:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      Reach out to us via Whatsapp on
                      <b> 9558958458</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Step 2:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      Ask the Admin for Forgot Password Link.
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Step 3:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      Once Admin verifies your details, Link will be sent to
                      your registered mobile number.
                    </Text>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
            <Typography variant="body2" p={2}>
              <Link to={ROUTES.Login}>Back to Login</Link>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
