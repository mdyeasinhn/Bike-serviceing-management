import express from 'express';
import { ServiceRecordController } from './serviceRecord.controller';


const router = express.Router();

router.get('/status', ServiceRecordController.getPendingOrOverdueServices);

router.post('/', ServiceRecordController.createService);

router.get('/', ServiceRecordController.getAllServices);

router.get('/:id', ServiceRecordController.getSpecificRecord);

router.put('/:id/complete', ServiceRecordController.updatedServiceRecord);



export const ServiceRecordRoutes = router;