import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Grid
} from '@mui/material';
import PlaceBidDialog from './PlaceBidDialog';
import RashiService from 'src/services/rashi/index';
import BidsService from 'src/services/bids/index';
import { RashiObject } from 'src/services/types/rashi';
import { GetAllUserRashiObject } from 'src/services/types/bids';

const Dashboard = () => {
  const [placeBidDialogOpen, setPlaceBidDialogOpen] = useState<{
    isOpen: boolean;
    id: number;
  }>({ id: 0, isOpen: false });
  const [rashiData, setRashiData] = useState<Array<GetAllUserRashiObject>>([]);

  const getRashiData = () => {
    BidsService.GetAllUserRashi().then((res) => {
      setRashiData(res.data.data);
    });
  };

  const handlePlaceBidDialogClose = (success: boolean) => {
    if (success) {
      getRashiData();
    }
    setPlaceBidDialogOpen({ isOpen: false, id: 0 });
  };

  useEffect(() => {
    getRashiData();
  }, []);

  return (
    <Container sx={{ width: '100%' }} maxWidth={false}>
      <Grid container xs={12} spacing={2} margin={1}>
        {rashiData.length > 0 &&
          rashiData.map((rashi, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 400, height: '100%', display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={rashi.image}
                    title={rashi.name}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      flexGrow: 1
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        {rashi.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        May the celestial dance of the stars illuminate your
                        path with joy, love, and endless possibilities.
                      </Typography>
                      {rashi.bid_amount > 0 && (
                        <>
                          <br />
                          <Typography
                            variant="body2"
                            component="b"
                            color="text.secondary"
                            fontWeight="bold"
                          >
                            Amount: {rashi.bid_amount}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                    <div style={{ flexGrow: 1 }}></div>
                    <CardActions>
                      <Button
                        size="medium"
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                          setPlaceBidDialogOpen({
                            isOpen: true,
                            id: rashi.id
                          })
                        }
                      >
                        Place bid
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <PlaceBidDialog
        isOpen={placeBidDialogOpen.isOpen}
        handleClose={handlePlaceBidDialogClose}
        zodiacId={placeBidDialogOpen.id}
      />
    </Container>
  );
};

export default Dashboard;
