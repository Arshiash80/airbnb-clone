import prisma from "@/app/libs/prismadb"
import type { SafeListing } from "../@types/listing"

/**
 * Get listings from dattabase with prisma
 * @returns Array of listings. `Listing[]`
 */
export const getListings = async (): Promise<SafeListing[]> => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Convert listing array to SafeListing[]
        const safeListings: SafeListing[] = listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))

        return safeListings
    } catch (error: any) {
        throw new Error(error)
    }
}