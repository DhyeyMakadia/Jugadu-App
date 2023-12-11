import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { ToastContainer } from 'react-toastify';
import SuspenseLoader from 'src/components/SuspenseLoader';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from 'src/components/ProtectedRoutes';
import { PublicPages, UserPages } from 'src/utils/constants';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import WalletService from 'src/services/wallet/index';

export const ThemeContext = React.createContext(null);

const ThemeProviderWrapper: React.FC = (props) => {
  const { pathname } = useLocation();
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const isLoggedIn = Cookies.get('auth_token');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [themeName, _setThemeName] = useState(curThemeName);
  const [currentBalance, setCurrentBalance] = useState<string>('');
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  const isPublicPage = pathname
    .split('/')
    .some((r) => PublicPages.includes(`/${r}`));
  const isUserPage = pathname
    .split('/')
    .some((r) => UserPages.includes(`/${r}`));
  const isAdminPage = pathname.includes('/admin');

  const handleLogout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('isAdmin');
    Cookies.remove('LoggedInUser');
    window.location.reload();
  };

  const getCurrentBalance = () => {
    WalletService.GetBalance().then((res) => {
      if (res.data.success) {
        setCurrentBalance(res.data.data[0].running_balance);
      }
    });
  };

  useEffect(() => {
    if (!!isLoggedIn) {
      getCurrentBalance();
    }
  }, [isLoggedIn]);

  return (
    <StylesProvider injectFirst>
      {showLoader && <SuspenseLoader />}
      <ThemeContext.Provider
        value={{
          setThemeName,
          setShowLoader,
          isPublicPage,
          isAdminPage,
          isUserPage,
          handleLogout,
          currentBalance,
          getCurrentBalance
        }}
      >
        <ProtectedRoutes>
          <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </ProtectedRoutes>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
