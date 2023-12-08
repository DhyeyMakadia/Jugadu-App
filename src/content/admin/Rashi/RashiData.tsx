import React, { FC, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import RashiDataTable from './RashiDataTable';
import { RashiObject } from 'src/services/types/rashi';
import RashiService from 'src/services/rashi/index';

type RashiDataProps = {
  rashiData: Array<RashiObject>
  openAddRashiDialog: (x: RashiObject) => void;
  getRashiList: () => void;
};

const RashiData: FC<RashiDataProps> = ({ openAddRashiDialog, rashiData, getRashiList }) => {

  return (
    <Card>
      <RashiDataTable
        rashis={rashiData}
        openAddRashiDialog={openAddRashiDialog}
        refetch={getRashiList}
      />
    </Card>
  );
};

export default RashiData;
