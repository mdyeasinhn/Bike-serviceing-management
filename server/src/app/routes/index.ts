import express from 'express'
import { customerRoutes } from '../modules/Bike/Customer/customer.route';

const router = express.Router();


const moduleRoutes =[
    {
        path : '/customer',
        route : customerRoutes
    },
    
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;