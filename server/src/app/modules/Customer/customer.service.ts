import { StatusCodes } from "http-status-codes";
import { ICustomer } from "./customer.interface";
import { Customer } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../utils/AppError";

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

const getByIdFromDB = async (id: string): Promise<Customer | null> => {

    const result = await prisma.customer.findUniqueOrThrow({
        where: {
            customerId: id,
        }
    })

    return result;
}

const updatedIntoDB = async (id: string, data: Partial<Customer>): Promise<Customer> => {
    await prisma.customer.findUniqueOrThrow({
        where: {
            customerId: id
        }
    })

    const result = await prisma.customer.update({
        where: {
            customerId: id
        },
        data
    })

    return result;
}

const deleteCustomer = async (id: string) => {
    const result = await prisma.customer.delete({
      where: {
        customerId: id,
      },
    });
    return result;
  };
  
export const customerService = {
    createCustomer,
    getAllCustomers,
    getByIdFromDB,
    updatedIntoDB,
    deleteCustomer
}