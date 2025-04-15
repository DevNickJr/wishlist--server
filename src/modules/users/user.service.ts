import prisma from "@/lib/prisma"
import ApiError from "@/utils/ApiError"
import { IRegister } from "../auth/auth.schema"

export const createUser = async ({
    data,
    // session = null
}: {
    data: IRegister
    // session?: ClientSession | null,
}) => {
    const user = await prisma.user.create({ data })
    return user
}

export const validateCreateUser = async ({
    data,
}: {
    data: IRegister
}) => {
    const user = await prisma.user.findUnique({
       where: {
           email: data.email,
       } 
    })

    if (!!user) {
        throw new ApiError('email already exists')
    }
}

export const getUser = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })
    if (!user) {
        throw new ApiError('User not found')
    }

    const { ...data } = user

    return data
}