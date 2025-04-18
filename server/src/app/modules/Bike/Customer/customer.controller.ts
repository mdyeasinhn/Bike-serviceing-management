import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { customerService } from "./customer.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createCustomer = catchAsync(async (req : Request, res : Response) => {
    const result = await customerService.createCustomer(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Customer created successfully!",
      data: result,
    });
  });

  const getAllCustomers = catchAsync(async (req, res) => {
    const result = await customerService.getAllCustomers();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Customers fetched successfully!S",
      data: result,
    });
  });

export const customerController = {
    createCustomer,
    getAllCustomers
}
