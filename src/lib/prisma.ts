import { PrismaClient } from '../generated/prisma/client'


// let prisma: PrismaClient


// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient()
// } else {

//     let globalWithprisma = global as typeof globalThis & {
//         prisma: PrismaClient
//     }

//     if (!globalWithprisma.prisma) {
//         globalWithprisma.prisma = new PrismaClient()
//     }

//     prisma = globalWithprisma.prisma
// }





const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}

export default prisma


