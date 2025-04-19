import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ServiceRecordService } from "./serviceRecord.service";

const createService = catchAsync(async (req, res) => {
    const result = await ServiceRecordService.createService(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Service record created successfully!",
        data: result,
    });
});
const getAllServices = catchAsync(async (req, res) => {
    const result = await ServiceRecordService.getAllServices();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Service records fetched successfully!",
      data: result,
    });
  });



export const ServiceRecordController = {
    createService,
    getAllServices
}

