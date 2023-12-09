import { FC } from 'react';
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { BidsListObject } from 'src/services/types/bids';

type Props = {
  bidsList: Array<BidsListObject>;
};

const DashboardRashiList: FC<Props> = ({ bidsList }) => {
  return (
    <Card>
      <Card>
        <CardHeader title="Rashi(s) List" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="center">Total Bids</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bidsList.map((rashi) => (
                <TableRow
                  hover
                  key={rashi.id}
                  style={rashi.is_win ? { backgroundColor: '#70ffa199' } : {}}
                >
                  <TableCell>
                    {rashi.is_win ? <EmojiEventsIcon /> : ''}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {rashi.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img src={rashi.image} alt="" width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      align="center"
                    >
                      {rashi.bid_amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Card>
  );
};

export default DashboardRashiList;
