import prisma from "@/app/libs/prismadb"
import type { ISafeListingWithSafeUser } from "../@types/listing"

interface IParams {
    /** ID of the listing */
    listingId?: string
}

/**
 * Get listing by listing's ID
 * @param param0 listingId
 * @returns A safe listing with a safe user as an owner. `Promise<ISafeListingWithSafeUser | null>` 
 */
export default async function getListingById({ listingId }: IParams): Promise<ISafeListingWithSafeUser | null> {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                // Include owner user
                user: true
            }
        })
        if (!listing) {
            // Listing not found
            return null
        }

        const safeListing: ISafeListingWithSafeUser = {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }

        return safeListing
    } catch (error: any) {
        throw new Error(error)
    }
}


