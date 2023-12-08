import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import DashboardRashiList from './DashboardRashiList';
import { BidsListObject } from 'src/services/types/bids';
import BidService from 'src/services/bids/index';

const Dashboard = () => {
  const [bidsList, setBidsList] = useState<Array<BidsListObject>>([]);

  const getBidsListData = () => {
    BidService.GetBidsList().then((res) => {
      if (res.data.success && res.data.data.length > 0) {
        setBidsList(res.data.data);
      }
    });
  };

  const winner = bidsList.find((x) => x.is_win);

  useEffect(() => {
    getBidsListData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin - Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          rashiList={bidsList.map((x) => ({ label: x.name, value: x.id }))}
          winningRashi={{ label: winner?.name, value: winner?.id }}
          refetch={getBidsListData}
        />
      </PageTitleWrapper>
      <Container sx={{ maxWidth: '100%' }} maxWidth={false}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={3}>
            <Card>
              <CardMedia
                sx={{ height: 150 }}
                image={winner?.image}
                title={winner?.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {winner?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Winning sign for the current slot
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <DashboardRashiList bidsList={bidsList} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
