import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WithdrawDataTable from './WithdrawDataTable';
import { WithDrawObject } from 'src/services/types/withdraw';
import WithdrawService from 'src/services/withdraw/index';

const WithdrawData = () => {
  const withdrawData = [
    {
      id: 1,
      name: 'Shivam Garala',
      email: 'shivam@gmail.com',
      mobile_number: '7988465512',
      request_amount: '1000',
      accept_decline: 0
    },
    {
      id: 2,
      name: 'Shivam Garala',
      email: 'shivam@gmail.com',
      mobile_number: '7988465512',
      request_amount: '1000',
      accept_decline: 1
    },
    {
      id: 3,
      name: 'Shivam Garala',
      email: 'shivam@gmail.com',
      mobile_number: '7988465512',
      request_amount: '1000',
      accept_decline: null
    }
  ];

  const [withDrawRequestData, setWithDrawRequestData] = useState<
    Array<WithDrawObject>
  >([]);
  const getWithdrawRequest = () => {
    WithdrawService.GetAllWithdrawRequest().then((res) => {
      setWithDrawRequestData(res.data.data ?? []);
    });
  };

  useEffect(() => {
    getWithdrawRequest();
  }, []);

  return (
    <Card>
      <WithdrawDataTable withdrawRequests={withDrawRequestData} refetch={getWithdrawRequest} />
    </Card>
  );
};

export default WithdrawData;
