import { FC } from 'react';
import {
  Card,
  CardHeader,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@mui/material';
// import AddBalanceDialog from './AddBalanceDialog';
import { BidsWinnerListObject, MyBidsObject } from 'src/services/types/bids';
import Label from 'src/components/Label';

type Props = {
  bids: Array<MyBidsObject>;
};

const MyBidsTable: FC<Props> = ({ bids }) => {
  return (
    <Card>
      <CardHeader title="My Bids" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zodiac Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="center">Result</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map((bid, index) => {
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
                      {bid.ZodiacName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img src={bid.image} alt="" width={50} height={50} />
                  </TableCell>
                  <TableCell>₹ {bid.amount}</TableCell>
                  <TableCell>{bid.date}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      // fontWeight="bold"
                      // align="center"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {bid.time}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {bid.is_win === 1 ? (
                      <Label color="success">Winner</Label>
                    ) : (
                      ''
                    )}
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

export default MyBidsTable;
