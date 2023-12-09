import { Box, Typography, Container, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { ROUTES } from 'src/utils/routes';
import { useNavigate } from 'react-router';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              The page you were looking for doesn't exist.
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              It's on us, we moved the content to a different page. The button
              below should help!
            </Typography>
          </Box>
          <Container sx={{ textAlign: 'center', mt: 3, p: 4 }} maxWidth="sm">
            <Button
              variant="outlined"
              onClick={() => navigate(ROUTES.Dashboard)}
            >
              Go to homepage
            </Button>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;