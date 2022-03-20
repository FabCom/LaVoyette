import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient;
}

let modelsImm: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    modelsImm = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    modelsImm = global.prisma;
}

const models = modelsImm;

export default models;