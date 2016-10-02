import { GeneralRoutes } from './general.routes';
import { StatusRoutes } from './status.routes';
export const RouteConfig = [
    ...GeneralRoutes,
    ...StatusRoutes
];