import prismaClient from '@/lib/prisma'
import { NextResponse } from 'next/server'


interface ParamsProps {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: ParamsProps) {

    try {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: (await params).id,
            }
        })

        return NextResponse.json(customer)
    } catch (error) {
        return NextResponse.json({ error: "Erro e buscar contato" }, { status: 500 })
    }
}


export async function PUT(request: Request, { params }: ParamsProps) {

    try {
        const body = await request.json()
        if (!body) {
            return NextResponse.json({ error: "Nenhuma informação recebida" }, { status: 500 })

        }
        
        const { name, email, phone, address } = body

        const updateCustomer = await prismaClient.customer.update({
            where: {
                id: (await params).id
            },
            data: {
                name,
                email,
                phone,
                address,
                updated_at: new Date
            }
        })

        return NextResponse.json(updateCustomer)
    } catch (error) {
        return NextResponse.json({ error: "Erro em atualizar cliente" }, { status: 500 })
    }

}