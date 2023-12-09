import {
  Card,
  CardHeader,
  Box,
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
  Tooltip,
  IconButton,
  useTheme
} from '@mui/material';
import React, { FC, useState } from 'react';
import ConfirmDialog from 'src/components/ConfirmDialog';
import Label from 'src/components/Label';
import { ConfirmDialogProps } from 'src/services/types/common';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { WithDrawObject } from 'src/services/types/withdraw';
import WithdrawService from 'src/services/withdraw/index';
import { toast } from 'react-toastify';

const getStatusLabel = (status: number): JSX.Element => {
  const map = {
    0: {
      text: 'Declined',
      color: 'error'
    },
    1: {
      text: 'Approved',
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

type Props = {
  withdrawRequests: Array<WithDrawObject>;
  refetch: () => void;
};

const WithdrawDataTable: FC<Props> = ({ withdrawRequests, refetch }) => {
  const theme = useTheme();
  const [confirmDialogData, setConfirmDialogData] =
    useState<ConfirmDialogProps>({
      isOpen: false,
      title: '',
      description: '',
      handleClose: () => {},
      onConfirm: () => {}
    });

  const handleConfirmDialogClose = () => {
    setConfirmDialogData({
      isOpen: false,
      title: '',
      description: '',
      handleClose: () => {},
      onConfirm: () => {}
    });
  };

  const handleWithdrawRequestSubmit = (id: number, accept: boolean) => {
    if (accept) {
      WithdrawService.AcceptWithdrawRequest({ withdraw_request_id: id }).then(
        (res) => {
          if (res.data.success) {
            toast.success('Withdraw Request Accepted');
            refetch();
          }
        }
      );
    } else {
      WithdrawService.RejectWithdrawRequest({ withdraw_request_id: id }).then(
        (res) => {
          if (res.data.success) {
            toast.success('Withdraw Request Rejected');
            refetch();
          }
        }
      );
    }
  };
  return (
    <Card>
      <CardHeader
        // action={
        //   <Box width={150}>
        //     <FormControl fullWidth variant="outlined">
        //       <InputLabel>Status</InputLabel>
        //       <Select
        //         value={filters.status || 'all'}
        //         onChange={handleStatusChange}
        //         label="Status"
        //         autoWidth
        //       >
        //         {statusOptions.map((statusOption) => (
        //           <MenuItem key={statusOption.id} value={statusOption.id}>
        //             {statusOption.name}
        //           </MenuItem>
        //         ))}
        //       </Select>
        //     </FormControl>
        //   </Box>
        // }
        title="Withdraw Request(s)"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Request Amount</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawRequests.map((request) => {
              return (
                <TableRow hover key={request.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {request?.userDetails?.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(rashi.name, 'MMMM dd yyyy')}
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
                      {request?.userDetails?.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      // align='center'
                      gutterBottom
                      noWrap
                    >
                      ₹ {request?.request_amount ?? 0}
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
                      {request?.userDetails?.mobile_number}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(request?.accept_decline)}
                  </TableCell>
                  <TableCell align="center">
                    {request.accept_decline === null ? (
                      <>
                        <Tooltip title="Accept Request" arrow>
                          <IconButton
                            onClick={() => {
                              setConfirmDialogData({
                                isOpen: true,
                                title: 'Accept Request',
                                description: `Are you sure you want to Accept Withdraw Request?`,
                                onConfirm: () =>
                                  handleWithdrawRequestSubmit(request.id, true),
                                handleClose: handleConfirmDialogClose
                              });
                            }}
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <DoneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Decline Request" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setConfirmDialogData({
                                isOpen: true,
                                title: 'Decline Request',
                                description:
                                  'Are you sure you want to decline Withdraw Request?',
                                onConfirm: () =>
                                  handleWithdrawRequestSubmit(
                                    request.id,
                                    false
                                  ),
                                handleClose: handleConfirmDialogClose
                              });
                            }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>-</>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ConfirmDialog {...confirmDialogData} />
      </TableContainer>
    </Card>
  );
};

export default WithdrawDataTable;
