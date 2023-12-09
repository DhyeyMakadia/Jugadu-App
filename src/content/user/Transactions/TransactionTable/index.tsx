import { ChangeEvent, FC, useRef, useState } from 'react';
import {
  Card,
  Box,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  useTheme
} from '@mui/material';
import Label from 'src/components/Label';
// import AddBalanceDialog from './AddBalanceDialog';
import { TransactionsObject } from 'src/services/types/wallet';

const getStatusLabel = (status: number): JSX.Element => {
  const map = {
    0: {
      text: 'Debit',
      color: 'error'
    },
    1: {
      text: 'Credit',
      color: 'success'
    }
    // pending: {
    //   text: 'Pending',
    //   color: 'warning'
    // }
  };
  const { text, color }: any = map[status];
  return <Label color={color}>{text}</Label>;
};

interface Filters {
  status?: 'credit' | 'debit';
}

const applyFilters = (
  transactionsData: Array<TransactionsObject>,
  filters: Filters
): Array<TransactionsObject> => {
  return transactionsData.filter((transaction) => {
    if (filters.status === 'credit') {
      return transaction.debit_credit === 1;
    }
    if (filters.status === 'debit') {
      return transaction.debit_credit === 0;
    }
    return transactionsData;
  });
};

type Props = {
  transactions: Array<TransactionsObject>;
};

const TransactionTable: FC<Props> = ({ transactions }) => {
  const [filters, setFilters] = useState<Filters>({ status: null });
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'credit',
      name: 'Credit'
    },
    {
      id: 'debit',
      name: 'Debit'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };
  const filteredTransactions = applyFilters(transactions, filters);
  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="My Transactions"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.date}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(user.name, 'MMMM dd yyyy')}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(transaction.debit_credit)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      // align="center"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      ₹ {transaction.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TransactionTable;
