import MyBidsTable from './MyBidsTable';
import { Card, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import BidService from 'src/services/bids/index';
import TodaysWinningTable from './TodaysWinningTable';
import { BidsWinnerListObject } from 'src/services/types/bids';

const MyOrders = () => {
  const [bidsData, setBidsData] = useState([]);
  const [winningData, setWinningData] = useState<Array<BidsWinnerListObject>>(
    []
  );
  const data = [
    {
      ZodiacName: 'Shree',
      image: 'http://localhost:8000/images/1701708182304_563.png',
      time: '12:45 AM',
      date: '2023-12-09'
    }
  ];

  const getBidsData = () => {
    BidService.GetMyBidsList().then((res) => {
      if (res.data.success) {
        setBidsData(res.data.data);
      }
    });
  };

  const getWinningBidsData = () => {
    BidService.WinnerList().then((res) => {
      if (res.data.success) {
        setWinningData(res.data.data);
      }
    });
  };

  useEffect(() => {
    getBidsData();
    getWinningBidsData();
  }, []);

  return (
    <Container sx={{ maxWidth: '100%', mt: 3 }} maxWidth={false}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={6}>
          <Card>
            <MyBidsTable bids={bidsData} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <TodaysWinningTable data={winningData} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyOrders;
