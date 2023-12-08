import { ROUTES } from './routes';

export const StatusCode = {
  Success: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  InternalServer: 500
};

export const PublicPages = [
  ROUTES.Login,
  ROUTES.Signup,
  ROUTES.Faqs,
  ROUTES.ForgotPassword,
  ROUTES.TnC,
  ROUTES.NotFound
];

export const UserPages = [
  ROUTES.Dashboard,
  ROUTES.MyOrders,
  ROUTES.Transactions
];
