import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BikeService } from "./bike.service";
import { StatusCodes } from "http-status-codes";

const createBike = catchAsync(async (req: Request, res: Response) => {
    const result = await BikeService.createBike(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Bike added successfully!",
        data: result,
    });
});


const getAllBikes = catchAsync(async (req, res) => {
    const result = await BikeService.getAllBikes();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Bikes fetched successfully",
      data: result,
    });
  });
export const BikeController ={
    createBike,
    getAllBikes
}