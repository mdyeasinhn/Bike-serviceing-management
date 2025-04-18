import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { customerService } from "./customer.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createCustomer = catchAsync(async (req: Request, res: Response) => {
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



// Get a single customer by ID
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;


  const result = await customerService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer fetched successfully!",
    data: result,
  });
})

// Update admin data by ID
const updatedIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const result = await customerService.updatedIntoDB(id, data);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer updated successfully!",
    data: result,
  });

})

const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
 const result = await customerService.deleteCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer deleted successfully!",
    data : result
  });
});

export const customerController = {
  createCustomer,
  getAllCustomers,
  getByIdFromDB,
  updatedIntoDB,
  deleteCustomer
}
