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
import {
  BidsWinnerListObject,
  GetAllUserRashiObject
} from 'src/services/types/bids';
import Timer from 'src/components/Timer';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, EffectCreative } from 'swiper/modules';
import LiveClock from 'src/components/LiveClock';
import BidService from 'src/services/bids/index';

const Dashboard = () => {
  const [placeBidDialogOpen, setPlaceBidDialogOpen] = useState<{
    isOpen: boolean;
    id: number;
  }>({ id: 0, isOpen: false });
  const [latestWinnerData, setLatestWinnerData] =
    useState<BidsWinnerListObject>();
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

  const getWinningBidsData = () => {
    BidService.WinnerList().then((res) => {
      if (res.data.success) {
        setLatestWinnerData(res.data.data[0]);
      }
    });
  };

  useEffect(() => {
    getWinningBidsData();
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
            <Typography component="b" variant="h4">
              Bids End in: <Timer />
            </Typography>
            <Typography variant="subtitle2">
              <LiveClock />
            </Typography>
            <Typography component="b" variant="h4">
              {latestWinnerData?.time} {'  '}
              {latestWinnerData?.ZodiacName}
            </Typography>
          </Grid>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            style={{ backgroundColor: 'white', marginTop: '10px' }}
            autoplay={{
              delay: 5000
            }}
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: false,
                translate: [0, 0, -400]
              },
              next: {
                translate: ['100%', 0, 0]
              }
            }}
            modules={[Autoplay, EffectCreative]}
            className="mySwiper"
          >
            {rashiData?.length > 0 &&
              rashiData.map((i, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={i?.image}
                    style={{ objectFit: 'contain' }}
                    width="100%"
                    height="300px"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
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
                      // maxWidth: 200,
                      minWidth: 160,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <CardMedia
                      sx={{ height: 175, backgroundSize: 200 }}
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
                              marginLeft={2}
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
