import express from 'express';
import { customerController } from './customer.controller';


const router = express.Router();

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getByIdFromDB);
router.put('/:id', customerController.updatedIntoDB);
router.delete('/:id', customerController.deleteCustomer);



export const customerRoutes = router;




