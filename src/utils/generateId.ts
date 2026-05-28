import prismaClient from '@/lib/prisma'

export async function generateIdCustom() {

    const today = new Date()
    const datePart = today
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")

    const count = await prismaClient.ticket.count({
        where: {
            created_at: {
                gte: new Date(today.setHours(0, 0, 0, 0))
            }
        }
    })

    return `TCK-${datePart}-${String(count + 1).padStart(4, "0")}`
}

