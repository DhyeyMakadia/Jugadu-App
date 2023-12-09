import {
  Grid,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Timer from 'src/components/Timer';
import BidService from 'src/services/bids/index';

type Options = { label: string; value: number };

type Props = {
  rashiList: Options[];
  winningRashi: Options;
  refetch: () => void;
};

const PageHeader: FC<Props> = ({ rashiList, winningRashi, refetch }) => {
  const [selectedRashi, setSelectedRashi] = useState<{
    label: string;
    value: number;
  }>({ label: '', value: 0 });

  const handleChangeWinner = (value: Options) => {
    BidService.ChangeWinner({ zodiac_id: value.value }).then((res) => {
      if (res.data.success) {
        setSelectedRashi(value);
        toast.success('Winner Changed Successfully');
        refetch();
      }
    });
  };

  useEffect(() => {
    if (winningRashi.label) {
      setSelectedRashi(winningRashi);
    }
  }, [winningRashi]);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Dashbord
        </Typography>
        {/* <Typography variant="subtitle2">Current Time : 10:15:59</Typography> */}
        <Typography variant="subtitle2">
          Bid Ends in : <Timer />
        </Typography>
      </Grid>
      <Grid item>
        <Autocomplete
          fullWidth
          blurOnSelect
          value={selectedRashi}
          onChange={(e, newValue: Options) => {
            console.log(newValue);
            handleChangeWinner(newValue);
          }}
          options={rashiList}
          disableClearable={true}
          sx={{ minWidth: 200 }}
          renderInput={(params) => <TextField {...params} label="Winner" />}
        />
      </Grid>
    </Grid>
  );
};

export default PageHeader;
