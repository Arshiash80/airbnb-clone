namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string
        NEXTAUTH_SECRET: string

        GITHUB_CLIENT_ID: string
        GITHUB_CLIENT_SECRET: string

        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string

        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string
    }
}
