import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import dotenv from "dotenv"

dotenv.config()

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
})

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma
}
