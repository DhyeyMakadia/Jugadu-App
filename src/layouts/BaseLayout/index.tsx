import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { Box, useTheme } from '@mui/material';
import Header from '../SidebarLayout/Header';
import { PublicPages } from 'src/utils/constants';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isHeader = !pathname
    .split('/')
    .some((r) => PublicPages.includes(`/${r}`));

  return (
    <>
      {isHeader ? (
        <Box
          sx={{
            flex: 1,
            height: '100%'
          }}
        >
          <Header />
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              display: 'block',
              flex: 1,
              pt: `${theme.header.height}`
            }}
          >
            <Box display="block">{children || <Outlet />}</Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            height: '100%'
          }}
          className={pathname === '/login' ? 'login-cover' : ''}
        >
          {children || <Outlet />}
        </Box>
      )}
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
