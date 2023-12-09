import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/content/admin/Rashi/PageHeader';
import RashiData from './RashiData';
import AddRashiDialog from './AddRashiDialog';
import { RashiObject } from 'src/services/types/rashi';
import RashiService from 'src/services/rashi/index';

const ManageRashi = () => {
  const [addRashiDialogOpen, setAddRashiDialogOpen] = useState<boolean>(false);
  const [editRashiData, setEditRashiData] = useState<RashiObject | null>(null);
  const [rashiData, setRashiData] = useState<Array<RashiObject>>([]);

  const getRashiList = () => {
    RashiService.GetAllRashi().then((res) => {
      setRashiData(res.data.data);
    });
  };

  useEffect(() => {
    getRashiList();
  }, []);

  const handleAddRashiDialogOpen = (data?: RashiObject) => {
    setEditRashiData(data ?? null);
    setAddRashiDialogOpen(true);
  };

  const handleAddRashiDialogClose = () => {
    setAddRashiDialogOpen(false);
    setEditRashiData(null);
  };
  return (
    <>
      <Helmet>
        <title>Admin - Manage Rashi</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader openAddRashiDialog={handleAddRashiDialogOpen} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RashiData
              rashiData={rashiData}
              openAddRashiDialog={handleAddRashiDialogOpen}
              getRashiList={getRashiList}
            />
          </Grid>
        </Grid>
      </Container>
      <AddRashiDialog
        data={editRashiData}
        isOpen={addRashiDialogOpen}
        handleClose={handleAddRashiDialogClose}
        refetch={getRashiList}
      />
      <Footer />
    </>
  );
};

export default ManageRashi;
