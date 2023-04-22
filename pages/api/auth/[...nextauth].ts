import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/app/libs/prismadb"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    // Email or password is missing.
                    throw new Error("Invalid credentials")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) {
                    // Can't find user or cant find user hashed password.
                    throw new Error("Invalid credentials")
                }

                // Compare the entered password with user password.
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword) {
                    // Passwords don't match
                    throw new Error("Invalid credentials")
                }

                return user

            }
        })
    ],
    pages: {
        signIn: "/" // On error redirect to "/" page.
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)