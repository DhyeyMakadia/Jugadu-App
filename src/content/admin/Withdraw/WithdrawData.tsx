import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WithdrawDataTable from './WithdrawDataTable';
import { WithDrawObject } from 'src/services/types/withdraw';
import WithdrawService from 'src/services/withdraw/index';

const WithdrawData = () => {
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
      <WithdrawDataTable
        withdrawRequests={withDrawRequestData}
        refetch={getWithdrawRequest}
      />
    </Card>
  );
};

export default WithdrawData;
