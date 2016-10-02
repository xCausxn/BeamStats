import { getFullStatus } from '../controllers';
export const StatusRoutes = [
    { method: 'GET', path: '/api/v1/status/', handler: getFullStatus },
];