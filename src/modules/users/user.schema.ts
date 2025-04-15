import { Types } from 'mongoose';
import { object, string, TypeOf, z } from 'zod';

export const userSchema = object({
    name: string({
      required_error: 'Username is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    phone: string({
      required_error: 'phone is required',
    }).optional(),
    password: string({
        required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    // role: nativeEnum(RolesEnum, {
    //     required_error: 'role is required',
    //     invalid_type_error: `role must be of type role must be of type in ${Object.values(RolesEnum)}`
    // }).optional(),
});

export type IUser = TypeOf<typeof userSchema> & {
  _id?: Types.ObjectId
}