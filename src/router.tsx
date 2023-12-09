import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { ROUTES } from './utils/routes';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

// Auth
const Login = Loader(lazy(() => import('src/content/Auth/Login')));
const Signup = Loader(lazy(() => import('src/content/Auth/Signup')));

// Common
const ForgotPassword = Loader(
  lazy(() => import('src/content/user/ForgotPassword'))
);
const TermsAndConditions = Loader(
  lazy(() => import('src/content/user/TermsAndConditions'))
);

// User
const Dashboard = Loader(lazy(() => import('src/content/user/Dashboard')));
const Transactions = Loader(
  lazy(() => import('src/content/user/Transactions'))
);
const MyOrders = Loader(lazy(() => import('src/content/user/MyOrders')));

// Admin
const AdminDashboard = Loader(
  lazy(() => import('src/content/admin/Dashboard'))
);
const Users = Loader(lazy(() => import('src/content/admin/Users')));
const Rashi = Loader(lazy(() => import('src/content/admin/Rashi')));
const WithdrawList = Loader(lazy(() => import('src/content/admin/Withdraw')));

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: ROUTES.Dashboard,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.Dashboard,
        element: <Dashboard />
      },
      {
        path: ROUTES.MyOrders,
        element: <MyOrders />
      },
      {
        path: ROUTES.Transactions,
        element: <Transactions />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: ROUTES.Login,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.Login,
        element: <Login />
      }
    ]
  },
  {
    path: ROUTES.Signup,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.Signup,
        element: <Signup />
      }
    ]
  },
  {
    path: ROUTES.ForgotPassword,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.ForgotPassword,
        element: <ForgotPassword />
      }
    ]
  },
  {
    path: ROUTES.TnC,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.TnC,
        element: <TermsAndConditions />
      }
    ]
  },
  {
    path: 'admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'rashi',
        element: <Rashi />
      },
      {
        path: 'withdraw',
        element: <WithdrawList />
      }
    ]
  }
];

export default routes;
