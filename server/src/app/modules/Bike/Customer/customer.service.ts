import { StatusCodes } from "http-status-codes";
import prisma from "../../../../shared/prisma"
import { ICustomer } from "./customer.interface";
import AppError from "../../../utils/AppError";

const createCustomer = async (payload: ICustomer) => {

    const exists = await prisma.customer.findUnique({
        where: {
            email: payload.email,
        },
        select: { email: true },
    })
    if (exists) {
        throw new AppError(StatusCodes.CONFLICT, "Email already exists!",);
    }
    const result = await prisma.customer.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        },
    });

    return result;

}

const getAllCustomers = async () => {
    const result = await prisma.customer.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};

export const customerService = {
    createCustomer,
    getAllCustomers,
}