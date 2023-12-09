import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import WithdrawData from './WithdrawData';
import WithdrawService from 'src/services/withdraw/index'
import { WithDrawObject } from 'src/services/types/withdraw';

const Withdraw = () => {
  return (
    <>
      <Helmet>
        <title>Admin - Manage Withdraw Requests</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
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