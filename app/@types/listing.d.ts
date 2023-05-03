import type { Listing } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string
}

interface ISafeListingWithSafeUser extends SafeListing {
    user: SafeUser
}