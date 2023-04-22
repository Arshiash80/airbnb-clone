import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

type RegisterBodyProps = {
    email: string
    name: string
    password: string
}
export async function POST(
    req: Request
) {
    const body: RegisterBodyProps = await req.json()
    // Extract fields from body
    const {
        email,
        name,
        password
    } = body

    // Hash the provided password.
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create the user
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword //? Store the hashed password in db
        }
    })

    return NextResponse.json(user)
}