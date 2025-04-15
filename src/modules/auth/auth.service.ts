import { Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import env from "@/config/env.config";
import { createUser, validateCreateUser } from "../users/user.service";
import ApiError from "@/utils/ApiError";
import prisma from "@/lib/prisma";
import { IRegister } from "./auth.schema";

export const registerUserHandler = async ({
    data,
}: {
    data: IRegister;
}) => {
    await validateCreateUser({ data })

    const hashedPwd = await bcrypt.hash(data.password, 10);
    const baseData = {
        ...data,
        password: hashedPwd,
    };

    return await createUser({ data: baseData });
}

export const login = async ({
    userData,
}: {
    userData: any;
    // response: Response;
}) => {
    const user = await prisma.user.findUnique({
        where: {
            email: userData.email,
        }
    })

    if (!user) {
        throw new ApiError('User does not exist');
    }

    const { password, ...data } = user

    const match = await bcrypt.compare(userData.password, password || '');
    if (!match) throw new ApiError('Email or Password Incorrect')

    const token = jwt.sign({ id: user.id }, env.JWT_SEC, { expiresIn: Number(env.JWT_EXPIRATION) })

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + env.JWT_EXPIRATION);

    console.log('setting cookie, token', token)
    // response.cookie('Authentication', token, {
    //   httpOnly: true,
    //   expires,
    //   path: '/',
    // });


    return { user: data, token }
}

export const logout = async ({
    response
}: {
    response: Response;
}) => {
    response.clearCookie('Authentication');

    return { success: true }
}