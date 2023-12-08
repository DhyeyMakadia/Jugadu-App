import React, { FC } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { AddTwoTone as AddTwoToneIcon } from '@mui/icons-material';

type PageHeaderProps = {
  openAddRashiDialog: () => void;
};

const PageHeader: FC<PageHeaderProps> = ({ openAddRashiDialog }) => {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Manage Rashi(s)
        </Typography>
        <Typography variant="subtitle2">
          Manage Rashi(s) the way you like!
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => openAddRashiDialog()}
        >
          Add Rashi
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
