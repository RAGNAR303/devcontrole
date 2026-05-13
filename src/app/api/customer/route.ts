import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from '@/lib/prisma'




export async function GET(request: Request) {


    const { searchParams } = new URL(request.url) // acessa a url, e procura campo search com parametro
    const customerEmail = searchParams.get("email") // procura pelo nome a váriavel que vai vir a nome buscado




    if (!customerEmail || customerEmail === "") {
        return NextResponse.json({ messege: "Cliente não encrontado na base de dados" }, { status: 400 })
    }

    try {


        const customer = await prismaClient.customer.findFirst({
            where: {
                email: customerEmail
            }
        })
        return NextResponse.json(
            customer
        )
    } catch (error) {
        console.log(error)

        return NextResponse.json({ messege: "Cliente não encrontado na base de dados" }, { status: 400 })
    }


}


export async function DELETE(request: Request) {



    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "not authorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
        return NextResponse.json({ message: "falid delete customer" }, { status: 401 })
    }


    try {

        await prismaClient.customer.delete({
            where: {
                id: userId as string
            }
        })


        return NextResponse.json({ message: "Cliente deletado com sucesso!" })
    } catch (error) {
        return NextResponse.json({ message: "falid delete customer" }, { status: 401 })
    }

}



// Rota criaçao de usuario 
export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "not authorized" }, { status: 401 })
    }

    const { name, email, phone, address, userId } = await request.json()

    try {
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "Nao informado",
                userId: userId
            }
        })
    } catch (error) {
        return NextResponse.json({ message: "Failed create new customer" }, { status: 400 })
    }
    return NextResponse.json({ message: "Rota de cadastro" })

}
