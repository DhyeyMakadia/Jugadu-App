import { useContext, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { ROUTES } from 'src/utils/routes';
import { ThemeContext } from 'src/theme/ThemeProvider';
import Cookies from 'js-cookie';
import ProfileDialog from 'src/components/ProfileDialog';
import HowToPlayDialog from 'src/components/HowToPlayDialog';
import PersonIcon from '@mui/icons-material/Person';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const { handleLogout, currentBalance } = useContext(ThemeContext);
  const userName = Cookies.get('LoggedInUser');
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
    handleClose();
  };

  const handleHowToPlayDialog = () => {
    setHowToPlayOpen(true);
    handleClose();
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        {/* <Avatar variant="rounded" alt={userName} src={user.avatar} /> */}
        {/* <Hidden mdDown> */}
        <UserBoxText>
          <UserBoxLabel variant="body1">{userName}</UserBoxLabel>
          <UserBoxDescription variant="body2">
            Balance: ₹ {currentBalance}
          </UserBoxDescription>
        </UserBoxText>
        {/* </Hidden> */}
        {/* <Hidden smDown> */}
        <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        {/* </Hidden> */}
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <UserBoxText>
            <UserBoxLabel variant="body1">{userName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              Balance: ₹ {currentBalance}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button onClick={handleProfileDialogOpen}>
            <PersonIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            to={ROUTES.MyOrders}
            component={NavLink}
            onClick={handleClose}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem
            button
            to={ROUTES.Transactions}
            component={NavLink}
            onClick={handleClose}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Transactions" />
          </ListItem>
          <ListItem
            button
            to={ROUTES.ReferralList}
            component={NavLink}
            onClick={handleClose}
          >
            <ViewStreamIcon fontSize="small" />
            <ListItemText primary="Referral List" />
          </ListItem>
          <ListItem button onClick={handleHowToPlayDialog}>
            <ContactSupportIcon fontSize="small" />
            <ListItemText primary="How to Play" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
      <ProfileDialog
        isOpen={profileDialogOpen}
        handleClose={() => setProfileDialogOpen(false)}
      />
      <HowToPlayDialog
        isOpen={howToPlayOpen}
        handleClose={() => setHowToPlayOpen(false)}
      />
    </>
  );
}

export default HeaderUserbox;
