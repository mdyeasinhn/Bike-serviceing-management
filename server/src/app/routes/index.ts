import express from 'express'
import { customerRoutes } from '../modules/Customer/customer.route';
import { BikeRoutes } from '../modules/Bike/bike.route';



const router = express.Router();


const moduleRoutes =[
    {
        path : '/customers',
        route : customerRoutes
    },
    {
        path : '/bikes',
        route : BikeRoutes
    },
    
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;