import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'


interface IParams {
    listingId?: string
}
export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    // Extarct parameters
    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    // Upddate user's favorite ID's list
    let favoriteIds = [...(currentUser.favoriteIds || [])]
    // Add `listingId` to user's `favoriteIds`
    favoriteIds.push(listingId)

    // Update in db
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    // Extarct parameters
    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    // Update user's favorite ID's list
    let favoriteIds = [...(currentUser.favoriteIds || [])]
    // Rempte `listingId` from user's `favoriteIds` list
    favoriteIds = favoriteIds.filter(favoriteId => favoriteId !== listingId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user)
}