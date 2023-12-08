import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
import { Container, Grid } from '@mui/material'
import UsersData from './UsersData'
import Footer from 'src/components/Footer'

const Users = () => {
  return (
    <>
      <Helmet>
        <title>Admin - Manage Users</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <UsersData />
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
  )
}

export default Users