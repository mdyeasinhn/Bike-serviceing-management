import { StatusCodes } from "http-status-codes";
import prisma from "../../../../shared/prisma"
import { AppError } from "../../../utils/AppError";
import { ICustomer } from "./customer.interface";

const createCustomer = async (payload: ICustomer) => {

    const exists = await prisma.customer.findUnique({
        where: {
            email: payload.email,
        },
        select: { email: true },
    })
    if (exists) {
        throw new AppError("Email already exists", StatusCodes.CONFLICT);
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
export const customerService = {
    createCustomer
}