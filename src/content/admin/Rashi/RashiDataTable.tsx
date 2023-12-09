import { ChangeEvent, FC, useState } from 'react';
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
  Tooltip,
  IconButton,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { RashiObject } from 'src/services/types/rashi';
import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConfirmDialog from 'src/components/ConfirmDialog';
import { ConfirmDialogProps } from 'src/services/types/common';
import RashiService from 'src/services/rashi/index';
import { toast } from 'react-toastify';
import { ValidationMessage } from 'src/utils/resources';

const getStatusLabel = (status: number = 1): JSX.Element => {
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
  rashisData: Array<RashiObject>,
  filters: Filters
): Array<RashiObject> => {
  return rashisData.filter((rashi) => {
    if (filters.status === 'active') {
      return rashi.status === 1;
    }
    if (filters.status === 'inactive') {
      return rashi.status === 0;
    }
    return rashisData;
  });
};

type RashiDataTableProps = {
  rashis: Array<RashiObject>;
  openAddRashiDialog: (x: RashiObject) => void;
  refetch: () => void;
};

const RashiDataTable: FC<RashiDataTableProps> = ({
  rashis,
  openAddRashiDialog,
  refetch
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<Filters>({ status: null });
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

  const handleDeleteRashi = (id: number) => {
    RashiService.DeleteRashi(id)
      .then((res) => {
        if (res.data.success) {
          toast.success('Rashi deleted successfully');
          refetch();
          handleConfirmDialogClose();
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        toast.error(ValidationMessage.SomethingWentWrong);
      });
  };

  const filteredRashis = applyFilters(rashis, filters);
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
        title="Rashi(s) List"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRashis.map((rashi) => {
              return (
                <TableRow hover key={rashi.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {rashi?.name}
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
                      <img
                        src={rashi?.image}
                        alt=""
                        width={'50px'}
                        height={'50px'}
                      />
                      {/* {rashi.image} */}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(rashi?.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Rashi" arrow>
                      <IconButton
                        onClick={() => openAddRashiDialog(rashi)}
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
                    </Tooltip>
                    <Tooltip title="Delete Rashi" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setConfirmDialogData({
                            isOpen: true,
                            title: 'Delete Rashi',
                            description:
                              'Are you sure you want to delete Rashi?',
                            onConfirm: () => handleDeleteRashi(rashi?.id),
                            handleClose: handleConfirmDialogClose
                          });
                        }}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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

RashiDataTable.propTypes = {
  rashis: PropTypes.array.isRequired
};

RashiDataTable.defaultProps = {
  rashis: []
};

export default RashiDataTable;
