import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import UsersData from 'src/content/admin/Users/UsersData';
import { ReferralListObject } from 'src/services/types/users';
import UserService from 'src/services/users/index';

const ReferralList = () => {
  const [referralListData, setReferralListData] = useState<
    Array<ReferralListObject>
  >([]);

  const getReferralDetails = () => {
    UserService.GetReferralDetails().then((res) => {
      if (res.data.success) {
        setReferralListData(res.data.data);
      }
    });
  };
  useEffect(() => {
    getReferralDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>Referral List</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <Card>
                <CardHeader title="Referral(s) List" />
                <Divider />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Mobile Number</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {referralListData.length > 0 &&
                        referralListData.map((item, index) => {
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
                                  {index}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                >
                                  {item.mobile_number}
                                </Typography>
                              </TableCell>
                              <TableCell>{item.email}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* <AddRashiDialog
        data={editRashiData}
        isOpen={addRashiDialogOpen}
        handleClose={handleAddRashiDialogClose}
      /> */}
      <Footer />
    </>
  );
};

export default ReferralList;
