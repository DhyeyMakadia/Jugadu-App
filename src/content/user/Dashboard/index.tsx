import { useEffect, useState } from 'react';
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
import BidsService from 'src/services/bids/index';
import { GetAllUserRashiObject } from 'src/services/types/bids';
import Timer from 'src/components/Timer';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pl: { xs: '5px !important', md: '18px !important' },
          pr: { xs: '5px !important', md: '18px !important' }
        }}
        maxWidth={false}
      >
        <Grid
          container
          // justifyContent="space-between"
          // alignItems="center"
          sx={{ mb: 1, mt: 3 }}
        >
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="subtitle2">
              Bids End in: <Timer />
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={2} margin={1} sx={{ pb: 3 }}>
          {rashiData?.length > 0 &&
            rashiData.map((rashi, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  sx={{
                    pl: { xs: '0 !important', sm: '18px !important' },
                    display: { xs: 'flex', sm: 'block' },
                    justifyContent: 'center'
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: 200,
                      minWidth: 160,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <CardMedia
                      sx={{ height: 175, backgroundSize: 210 }}
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
                      <CardContent sx={{ p: 0 }}>
                        {/* <Typography gutterBottom variant="h3" component="div">
                          {rashi.name}
                        </Typography> */}
                        {/* <Typography variant="body2" color="text.secondary">
                          May the celestial dance of the stars illuminate your
                          path with joy, love, and endless possibilities.
                        </Typography> */}
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
    </>
  );
};

export default Dashboard;
