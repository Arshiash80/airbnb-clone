import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb"
import type { SafeUser } from "../@types/user";

export const getSession = async () => {
    return await getServerSession(authOptions)
}
/**
 * Get currentt signed in user using user session.
 * @returns Optional user object `<SafeUser | null>`
 */
export const getCurrentUser = async (): Promise<SafeUser | null> => {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            // User object not found.
            return null
        }

        // Find user by email
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            // User not exists in db
            return null
        }

        // Return the user as `<SafeUser>`
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }

    } catch (error: any) {
        return null
    }
}