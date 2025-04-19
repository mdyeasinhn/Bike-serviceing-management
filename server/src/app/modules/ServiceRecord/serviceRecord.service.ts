import { ServiceRecord } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IService } from "./serviceRecord.interface";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";

// Create a new service record
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

// Retrieve all service records, ordered by service date
const getAllServices = async () => {
    const result = await prisma.serviceRecord.findMany({
        orderBy: {
            serviceDate: "asc",
        },
    });
    return result;
};

// Get a specific service record by ID
const getSpecificRecord = async (id: string): Promise<ServiceRecord | null> => {
    const exists = await prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        },
    });
    if (!exists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Service record not found!");
    }

    const result = await prisma.serviceRecord.findUniqueOrThrow({
        where: {
            serviceId: id,
        }
    });

    return result;
};

// Update a service record by ID; set status to 'done' if completionDate is provided
const updatedServiceRecord = async (id: string, data: Partial<ServiceRecord>): Promise<ServiceRecord> => {
    const exists = await prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        },
    });

    if (!exists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Service record not found!");
    }

    // Automatically update status if completionDate is set
    if (data.completionDate) {
        data.status = "done";
    }

    const result = await prisma.serviceRecord.update({
        where: {
            serviceId: id
        },
        data
    });

    return result;
};

const getPendingOrOverdueServices = async () => {

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await prisma.serviceRecord.findMany({
        where: {
            status: {
                in: ["pending", "inprogress"],
            },
            serviceDate: {
                lt: sevenDaysAgo,
            },
        },
        orderBy: {
            serviceDate: "asc",
        },
    });

    return result;
};


export const ServiceRecordService = {
    createService,
    getAllServices,
    getSpecificRecord,
    updatedServiceRecord,
    getPendingOrOverdueServices
};
