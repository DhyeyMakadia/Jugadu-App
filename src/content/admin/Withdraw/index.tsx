import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import WithdrawData from './WithdrawData';

const Withdraw = () => {
  return (
    <>
      <Helmet>
        <title>Admin - Manage Withdraw Requests</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth={false} style={{ width: '100%' }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <WithdrawData />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Withdraw;
