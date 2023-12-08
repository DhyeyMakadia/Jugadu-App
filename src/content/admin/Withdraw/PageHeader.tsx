import { Grid, Typography, Button } from '@mui/material'

const PageHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Manage Withdraw Request(s)
        </Typography>
        <Typography variant="subtitle2">
          Manage Request(s) of withdrawal
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PageHeader