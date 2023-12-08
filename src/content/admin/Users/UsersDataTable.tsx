import React, { ChangeEvent, FC, useRef, useState } from 'react';
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
  Checkbox,
  TableBody,
  Typography,
  Tooltip,
  IconButton,
  TablePagination,
  useTheme,
  List,
  ListItem,
  Popover,
  ListItemText
} from '@mui/material';
import { format, formatDistance, subDays } from 'date-fns';
import numeral from 'numeral';
import BulkActions from 'src/content/applications/Transactions/BulkActions';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UsersObject, UsersResponse } from 'src/services/types/users';
import { NavLink } from 'react-router-dom';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ConfirmDialog from 'src/components/ConfirmDialog';
import AddBalanceDialog from './AddBalanceDialog';
import { ConfirmDialogProps } from 'src/services/types/common';
import UserService from 'src/services/users/index';
import { toast } from 'react-toastify';

const getStatusLabel = (status: number): JSX.Element => {
  const map = {
    0: {
      text: 'In-Active',
      color: 'error'
    },
    1: {
      text: 'Active',
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
  status?: 'active' | 'inactive';
}

const applyFilters = (
  usersData: Array<UsersObject>,
  filters: Filters
): Array<UsersObject> => {
  return usersData.filter((user) => {
    if (filters.status === 'active') {
      return user.status === 1;
    }
    if (filters.status === 'inactive') {
      return user.status === 0;
    }
    return usersData;
  });
};

type UsersDataTableProps = {
  users: Array<UsersObject>;
  refetch: () => void;
  // openAddUsersDialog: (x: UsersObject) => void;
};

const UsersDataTable: FC<UsersDataTableProps> = ({
  users,
  refetch
  // openAddUsersDialog
}) => {
  const theme = useTheme();
  const optionRef = useRef<HTMLButtonElement>();
  const [filters, setFilters] = useState<Filters>({ status: null });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<UsersObject>(null);
  const [confirmDialogData, setConfirmDialogData] =
    useState<ConfirmDialogProps>({
      isOpen: false,
      handleClose: () => {},
      title: '',
      description: '',
      onConfirm: () => {}
    });
  const [addBalanceDialogOpen, setAddBalanceDialogOpen] = useState<{
    id: number;
    isOpen: boolean;
  }>({ id: 0, isOpen: false });

  const handleConfirmDialogClose = () => {
    setConfirmDialogData({
      isOpen: false,
      handleClose: () => {},
      title: '',
      description: '',
      onConfirm: () => {}
    });
  };

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'inactive',
      name: 'In-Active'
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

  const handleOptionsClose = () => {
    setSelectedUser(null);
    setAnchorEl(null);
  };

  const handleAddBalanceClose = () => {
    setAddBalanceDialogOpen({ id: 0, isOpen: false });
  };

  const handleUserStatus = (id: number, active: boolean) => {
    let payload = {
      status: 0
    };
    if (active) {
      payload.status = 1;
    } else {
      payload.status = 0;
    }
    console.log(id, payload);
    UserService.UpdateUserStatus(id, payload).then((res) => {
      if (res.data.success) {
        toast.success('User Status Updated Successfully');
        handleConfirmDialogClose();
        refetch();
      }
    });
  };

  const filteredUsers = applyFilters(users, filters);
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
        title="User(s) List"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => {
              return (
                <TableRow hover key={user.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.name} 
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
                      {user.email}
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
                      ₹ {user.running_balance ?? 0}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(user.status)}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Tooltip title="Edit User" arrow>
                      <IconButton
                        // onClick={() => openAddUsersDialog(user)}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Options" arrow>
                      <IconButton
                        ref={optionRef}
                        sx={{
                          '&:hover': {
                            background: theme.colors.secondary.lighter
                          },
                          color: theme.palette.secondary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e) => {
                          setAnchorEl(e.currentTarget);
                          setSelectedUser(user);
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Popover
                      anchorEl={anchorEl}
                      onClose={handleOptionsClose}
                      open={Boolean(anchorEl)}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <List sx={{ p: 1 }} component="nav">
                        <ListItem
                          button
                          onClick={() => {
                            setAddBalanceDialogOpen({
                              id: selectedUser.id,
                              isOpen: true
                            });
                            handleOptionsClose();
                          }}
                        >
                          <AddCircleIcon fontSize="small" sx={{ mr: 1 }} />
                          <ListItemText primary="Add Balance" />
                        </ListItem>
                        {selectedUser?.status === 1 && (
                          <ListItem
                            button
                            onClick={() => {
                              setConfirmDialogData({
                                isOpen: true,
                                handleClose: handleConfirmDialogClose,
                                title: 'Change Status',
                                description:
                                  'Are you sure you want to change the user status to IN-ACTIVE?',
                                onConfirm: () =>
                                  handleUserStatus(selectedUser.id, false)
                              });
                              handleOptionsClose();
                            }}
                          >
                            <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                            <ListItemText primary="In-Active User" />
                          </ListItem>
                        )}
                        {selectedUser?.status === 0 && (
                          <ListItem
                            button
                            onClick={() => {
                              setConfirmDialogData({
                                isOpen: true,
                                handleClose: handleConfirmDialogClose,
                                title: 'Change Status',
                                description:
                                  'Are you sure you want to change the user status to ACTIVE?',
                                onConfirm: () =>
                                  handleUserStatus(selectedUser.id, true)
                              });
                              handleOptionsClose();
                            }}
                          >
                            <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                            <ListItemText primary="Active User" />
                          </ListItem>
                        )}
                        {/* <ListItem
                          button
                          onClick={() => {
                            setConfirmDialogData({
                              isOpen: true,
                              handleClose: handleConfirmDialogClose,
                              title: 'Delete User',
                              description:
                                'Are you sure you want to delete the user?',
                              onConfirm: () => {}
                            });
                            handleOptionsClose();
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
                          <ListItemText primary="Delete User" />
                        </ListItem> */}
                      </List>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ConfirmDialog {...confirmDialogData} />
        <AddBalanceDialog
          {...addBalanceDialogOpen}
          handleClose={handleAddBalanceClose}
          refetch={refetch}
        />
      </TableContainer>
    </Card>
  );
};

UsersDataTable.propTypes = {
  users: PropTypes.array.isRequired
};

UsersDataTable.defaultProps = {
  users: []
};

export default UsersDataTable;
