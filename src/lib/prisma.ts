import { PrismaClient} from '../generated/prisma/client'
import { withAccelerate } from "@prisma/extension-accelerate"

let prisma: PrismaClient


if(process.env.NODE_ENV === 'production'){
    prisma = new PrismaClient()
}else{
    // eslint-disable-next-line prefer-const
    let globalWithprisma = global as typeof globalThis & {
        prisma: PrismaClient
    }

    if(!globalWithprisma.prisma ){
        globalWithprisma.prisma = new PrismaClient() 
    }

    prisma = globalWithprisma.prisma
}

export default prisma


