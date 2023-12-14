import Cookies from 'js-cookie';
import React, { FC, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ThemeContext } from 'src/theme/ThemeProvider';
import { ROUTES } from 'src/utils/routes';

type Props = {
  children: any;
};

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { isPublicPage, isAdminPage } = useContext(ThemeContext);
  const token = Cookies.get('auth_token');
  const isAdmin = parseInt(Cookies.get('isAdmin')) === 1;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      if (!isAdmin && isAdminPage) {
        navigate(ROUTES.NotFound);
      } else {
        if (
          pathname
            .split('/')
            .some((r) =>
              [ROUTES.Login, ROUTES.Signup, ROUTES.ForgotPassword].includes(
                `/${r}`
              )
            )
        ) {
          navigate(ROUTES.Dashboard);
        }
      }
    } else if (!isPublicPage) {
      navigate(ROUTES.Login);
    }

    // eslint-disable-next-line
  }, [pathname]);
  return children;
};

export default ProtectedRoutes;
