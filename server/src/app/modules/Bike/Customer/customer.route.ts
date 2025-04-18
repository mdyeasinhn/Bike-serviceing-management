import express from 'express';
import { customerController } from './customer.controller';


const router = express.Router();

router.post('/', customerController.createCustomer)
router.get('/', customerController.getAllCustomers)


export const customerRoutes = router;




