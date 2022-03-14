import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient;
}

let models: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    models = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    models = global.prisma;
}

const modelsImm = models;

export default modelsImm;