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
import { UserWithdrawList } from 'src/services/types/withdraw';

const getStatusLabel = (status: number): JSX.Element => {
  const map = {
    0: {
      text: 'Rejected',
      color: 'error'
    },
    1: {
      text: 'Accepted',
      color: 'success'
    },
    null: {
      text: 'Pending',
      color: 'warning'
    }
  };
  const { text, color }: any = map[status];
  return <Label color={color}>{text}</Label>;
};

interface Filters {
  status?: 'accept' | 'reject' | 'pending';
}

const applyFilters = (
  withdrawData: Array<UserWithdrawList>,
  filters: Filters
): Array<UserWithdrawList> => {
  return withdrawData.filter((item) => {
    if (filters.status === 'accept') {
      return item.accept_decline === 1;
    }
    if (filters.status === 'reject') {
      return item.accept_decline === 0;
    }
    if (filters.status === 'pending') {
      return item.accept_decline === null;
    }
    return withdrawData;
  });
};

type Props = {
  withdrawData: Array<UserWithdrawList>;
};

const WithdrawRequestList: FC<Props> = ({ withdrawData }) => {
  const [filters, setFilters] = useState<Filters>({ status: null });
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'accept',
      name: 'Accept'
    },
    {
      id: 'reject',
      name: 'Reject'
    },
    {
      id: 'pending',
      name: 'Pending'
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

  const filteredData = applyFilters(withdrawData, filters);
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
        title="Withdraw Requests"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 &&
              filteredData.map((item, index) => {
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
                        ₹ {item.request_amount ?? 0}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusLabel(item?.accept_decline)}
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

export default WithdrawRequestList;
