"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
// Create a new customer after checking if email already exists
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            email: payload.email,
        },
        select: { email: true },
    });
    if (exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Email already exists!");
    }
    const result = yield prisma_1.default.customer.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        },
    });
    return result;
});
// Retrieve all customers, ordered by creation date (latest first)
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
// Retrieve a specific customer by ID
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Customer not found!");
    }
    const result = yield prisma_1.default.customer.findUniqueOrThrow({
        where: {
            customerId: id,
        }
    });
    return result;
});
// Update a customer's details by ID
const updatedIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Customer not found!");
    }
    const result = yield prisma_1.default.customer.update({
        where: {
            customerId: id
        },
        data
    });
    return result;
});
// Delete a customer by ID
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Customer not found!");
    }
    const result = yield prisma_1.default.customer.delete({
        where: {
            customerId: id,
        },
    });
    return result;
});
exports.customerService = {
    createCustomer,
    getAllCustomers,
    getByIdFromDB,
    updatedIntoDB,
    deleteCustomer
};
