
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ServiceRecordService } from "./serviceRecord.service";
import { Request, Response } from "express";

const createService = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceRecordService.createService(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Service record created successfully!",
        data: result,
    });
});
const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceRecordService.getAllServices();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Service records fetched successfully!",
      data: result,
    });
  });

  const getSpecificRecord = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ServiceRecordService.getSpecificRecord(id);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Service record fetched successfully!",
      data: result,
    });
  });

export const ServiceRecordController = {
    createService,
    getAllServices,
    getSpecificRecord
}

