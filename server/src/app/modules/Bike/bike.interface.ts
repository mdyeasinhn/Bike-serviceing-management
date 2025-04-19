import { Brand } from "@prisma/client";

export interface IBike {
    brand: Brand;
    model: string;
    year: number;
    customerId: string;
  }