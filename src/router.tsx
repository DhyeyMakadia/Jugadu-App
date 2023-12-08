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

const Overview = Loader(lazy(() => import('src/content/overview')));

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
const Transactions = Loader(lazy(() => import('src/content/user/Transactions')));
const MyOrders = Loader(lazy(() => import('src/content/user/MyOrders')));

// Admin
const AdminDashboard = Loader(
  lazy(() => import('src/content/admin/Dashboard'))
);
const Users = Loader(lazy(() => import('src/content/admin/Users')));
const Rashi = Loader(lazy(() => import('src/content/admin/Rashi')));
const WithdrawList = Loader(lazy(() => import('src/content/admin/Withdraw')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

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
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
