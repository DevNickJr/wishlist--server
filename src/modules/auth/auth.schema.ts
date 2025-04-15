import { object, string, TypeOf, z } from 'zod';
import { userSchema } from '@/modules/users/user.schema';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';


export const registerSchema = userSchema;

export const loginUserSchema = object({
    email: string({
        required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
        required_error: 'Password is required',
    }),
});


export interface IToken extends JwtPayload {
  id: Types.ObjectId;
};
export type IRegister = TypeOf<typeof registerSchema>
export type ILogin = TypeOf<typeof loginUserSchema>