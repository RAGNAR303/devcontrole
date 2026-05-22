import prismaClient from '@/lib/prisma'
import { console } from 'inspector'

import { NextRequest, NextResponse } from 'next/server'


interface ParamsProps {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: NextRequest, { params }: ParamsProps) {

    const { id } = await params


    console.log(id)
    try {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(customer)
    } catch (error) {
        return NextResponse.json({ error: "Erro e buscar contato" }, { status: 500 })
    }
}


export async function PUT(request: NextRequest, { params }: ParamsProps) {



    const { id } = await params

    try {
        const body = await request.json()

        console.log(body)

        if (!body) {
            return NextResponse.json({ error: "Nenhuma informação recebida" }, { status: 500 })

        }



        const updateCustomer = await prismaClient.customer.update({
            where: {
                id
            },
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                address: body.address,
                updated_at: new Date
            }
        })

        return NextResponse.json(updateCustomer)
    } catch (error) {
        return NextResponse.json({ error: "Erro em atualizar cliente" }, { status: 500 })
    }

}