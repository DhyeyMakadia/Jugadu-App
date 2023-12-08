import React, { useState } from 'react';
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

export const ThemeContext = React.createContext(null);

const ThemeProviderWrapper: React.FC = (props) => {
  const { pathname } = useLocation();
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [themeName, _setThemeName] = useState(curThemeName);
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
    Cookies.remove("auth_token");
    Cookies.remove("isAdmin");
    window.location.reload();
  };
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
          handleLogout
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
