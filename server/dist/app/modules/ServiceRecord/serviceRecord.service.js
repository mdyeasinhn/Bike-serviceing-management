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
exports.ServiceRecordService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const http_status_codes_1 = require("http-status-codes");
// Create a new service record
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.create({
        data: {
            bikeId: payload.bikeId,
            serviceDate: payload.serviceDate,
            description: payload.description,
            status: payload.status,
        },
    });
    return result;
});
// Retrieve all service records, ordered by service date
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findMany({
        orderBy: {
            serviceDate: "asc",
        },
    });
    return result;
});
// Get a specific service record by ID
const getSpecificRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId: id
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service record not found!");
    }
    const result = yield prisma_1.default.serviceRecord.findUniqueOrThrow({
        where: {
            serviceId: id,
        }
    });
    return result;
});
// Update a service record by ID; set status to 'done' if completionDate is provided
const updatedServiceRecord = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId: id
        },
    });
    if (!exists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Service record not found!");
    }
    // Automatically update status if completionDate is set
    if (data.completionDate) {
        data.status = "done";
    }
    const result = yield prisma_1.default.serviceRecord.update({
        where: {
            serviceId: id
        },
        data
    });
    return result;
});
const getPendingOrOverdueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const result = yield prisma_1.default.serviceRecord.findMany({
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
});
exports.ServiceRecordService = {
    createService,
    getAllServices,
    getSpecificRecord,
    updatedServiceRecord,
    getPendingOrOverdueServices
};
