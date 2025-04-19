import { Bike } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBike } from "./bike.interface";


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