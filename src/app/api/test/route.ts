import prismaClient from '@/lib/prisma'
import { NextResponse } from "next/server";

async function GET(request: Request) {

    const user = await prismaClient.user.findMany()

    return NextResponse.json({ message: "Tudo certo", ok: true, user })

}

