import { StatusCodes } from "http-status-codes";
import { ICustomer } from "./customer.interface";
import { Customer } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../utils/AppError";

// Create a new customer after checking if email already exists
const createCustomer = async (payload: ICustomer) => {
    const exists = await prisma.customer.findUnique({
        where: {
            email: payload.email,
        },
        select: { email: true },
    });
    if (exists) {
        throw new AppError(StatusCodes.CONFLICT, "Email already exists!");
    }

    const result = await prisma.customer.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        },
    });

    return result;
};

// Retrieve all customers, ordered by creation date (latest first)
const getAllCustomers = async () => {
    const result = await prisma.customer.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};

// Retrieve a specific customer by ID
const getByIdFromDB = async (id: string): Promise<Customer | null> => {
    const exists = await prisma.customer.findUnique({
        where: {
            customerId: id
        },
    });
    if (!exists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Customer not found!");
    }

    const result = await prisma.customer.findUniqueOrThrow({
        where: {
            customerId: id,
        }
    });

    return result;
};

// Update a customer's details by ID
const updatedIntoDB = async (id: string, data: Partial<Customer>): Promise<Customer> => {
    const exists = await prisma.customer.findUnique({
        where: {
            customerId: id
        },
    });
    if (!exists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Customer not found!");
    }

    const result = await prisma.customer.update({
        where: {
            customerId: id
        },
        data
    });

    return result;
};

// Delete a customer by ID
const deleteCustomer = async (id: string) => {
    const exists = await prisma.customer.findUnique({
        where: {
            customerId: id
        },
    });
    if (!exists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Customer not found!");
    }

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
};
