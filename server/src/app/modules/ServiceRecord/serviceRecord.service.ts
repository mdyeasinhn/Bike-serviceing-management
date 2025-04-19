import { ServiceRecord } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IService } from "./serviceRecord.interface";

const createService = async (payload: IService) => {
    const result = await prisma.serviceRecord.create({
        data: {
            bikeId: payload.bikeId,
            serviceDate: payload.serviceDate,
            description: payload.description,
            status: payload.status,
        },
    });
    return result;
};

const getAllServices = async () => {
    const result = await prisma.serviceRecord.findMany({
        orderBy: {
            serviceDate: "asc",
        },
    });
    return result;
};


const getSpecificRecord = async (id: string): Promise<ServiceRecord | null> => {

    const result = await prisma.serviceRecord.findUniqueOrThrow({
        where: {
            serviceId: id,
        }
    })

    return result;
}

export const ServiceRecordService = {
    createService,
    getAllServices,
    getSpecificRecord
};
