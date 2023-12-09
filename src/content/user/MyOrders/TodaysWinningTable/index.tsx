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
import { BidsWinnerListObject } from 'src/services/types/bids';

type Props = {
  data: Array<BidsWinnerListObject>;
};
const TodaysWinningTable: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Todays Winnings" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zodiac Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
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
                      {item.ZodiacName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img src={item.image} alt="" width={50} height={50} />
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      // fontWeight="bold"
                      // align="center"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.time}
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

export default TodaysWinningTable;
