import { Button, Card, Container, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import TransactionTable from './TransactionTable';
import { TransactionsObject } from 'src/services/types/wallet';
import WalletService from 'src/services/wallet/index';
import WithdrawService from 'src/services/withdraw/index';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { ThemeContext } from 'src/theme/ThemeProvider';
import WithdrawRequestDialog from './WithdrawRequestDialog';
import { UserWithdrawList } from 'src/services/types/withdraw';
import WithdrawRequestList from './WithdrawRequestList';
import { Helmet } from 'react-helmet-async';

const Transactions = () => {
  const { currentBalance } = useContext(ThemeContext);
  const [transactionsData, setTransactionsData] = useState<
    Array<TransactionsObject>
  >([]);
  const [withdrawListData, setWithdrawListData] = useState<
    Array<UserWithdrawList>
  >([]);
  const [withdrawRequestDialogOpen, setWithdrawRequestDialogOpen] =
    useState<boolean>(false);

  const getTransactionData = () => {
    WalletService.GetTransactions().then((res) => {
      if (res.data.success) {
        setTransactionsData(res.data.data);
      }
    });
  };

  const getWithdrawRequestList = () => {
    WithdrawService.GetUserWithdrawList().then((res) => {
      if (res.data.success) {
        setWithdrawListData(res.data.data);
      }
    });
  };

  const handleWithdrawDialogClose = (success: boolean) => {
    if (success) {
      getWithdrawRequestList();
    }
    setWithdrawRequestDialogOpen(false);
  };

  useEffect(() => {
    getWithdrawRequestList();
    getTransactionData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Transactions</title>
      </Helmet>
      <Container sx={{ maxWidth: '100%', mt: 3 }} maxWidth={false}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Transactions
            </Typography>
            <Typography variant="subtitle2">
              Current Balance: ₹ {currentBalance}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => setWithdrawRequestDialogOpen(true)}
            >
              Add WithDraw Request
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} lg={6}>
            <Card>
              <TransactionTable transactions={transactionsData} />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <WithdrawRequestList withdrawData={withdrawListData} />
            </Card>
          </Grid>
        </Grid>
        <WithdrawRequestDialog
          isOpen={withdrawRequestDialogOpen}
          handleClose={handleWithdrawDialogClose}
        />
      </Container>
    </>
  );
};

export default Transactions;
