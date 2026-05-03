import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prismaClient from '@/lib/prisma'




export async function PATCH(request: Request) {

    const session = await getServerSession(authOptions)


    if (!session || !session.user) {
        return NextResponse.json({ message: "No authorized" }, { status: 401 })
    }
    // Achando o id fo ticket , mandado na rota
    const { id } = await request.json()
    const findTicketId = await prismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })


    if (!findTicketId) {
        return NextResponse.json({ error: "Filed update ticket" }, { status: 400 })
    }

    try {
        await prismaClient.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: "FECHADO"
            }
        })

        return NextResponse.json({ error: "Chamado atualizado com sucesso!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Filed update ticket" }, { status: 400 })
    }


}