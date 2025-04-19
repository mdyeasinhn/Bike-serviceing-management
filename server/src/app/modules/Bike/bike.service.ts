import { Bike } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBike } from "./bike.interface";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";


const createBike = async (payload: IBike) => {

    const result = await prisma.bike.create({
      data: {
        brand: payload.brand,
        model: payload.model,
        year: payload.year,
        customerId: payload.customerId,
      },
    });
    return result;
  };

  const getAllBikes = async () => {
    const result = await prisma.bike.findMany({
      orderBy: {
        year: "desc",
      },
    });
    return result;
  };

  const getSpecificBike  = async (id: string): Promise<Bike | null> => {
    const exists = await prisma.bike.findUnique({
        where: {
            bikeId: id
        },
    })
    if (!exists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Bike not found!",);
    }

    const result = await prisma.bike.findUniqueOrThrow({
        where: {
            bikeId: id,
        }
    })

    return result;
}


export const BikeService ={
    createBike,
    getAllBikes,
    getSpecificBike,
}