import React, { FC, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { RashiObject } from 'src/services/types/rashi';
import { UsersObject } from 'src/services/types/users';
import UsersDataTable from './UsersDataTable';
import UserService from 'src/services/users/index';

const UsersData: FC = () => {
  const [usersData, setUsersData] = useState<Array<UsersObject>>([]);

  const getUsersList = () => {
    UserService.GetAllUsers().then((res) => {
      setUsersData(res.data.data);
    });
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <Card>
      <UsersDataTable users={usersData} refetch={getUsersList} />
    </Card>
  );
};

export default UsersData;
