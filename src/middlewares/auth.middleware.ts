import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import env from '../config/env.config';
import { extractFromCookie, extractTokenFromHeader } from '../utils/auth.utils';

export const isAuthenticated = async  (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = extractFromCookie(req) || extractTokenFromHeader(req)

        if (!token) throw new ApiError("You are Not Authenticated", 401)

        const decoded = jwt.verify(token, env.JWT_SEC) as any

        // const user = await User.findById(decoded.id).lean()

        // if (!user) throw new ApiError('Unauthorized access: User does not exist', 401)

        // req.user = user
        // req.token = decoded

        next()

    } catch (error) {
        next(error)
    }
}

export const isCurrentUser = async  (req: Request, res: Response, next: NextFunction) => {
    try {
        // if (req.user?._id?.toString() === req.params.userId) {
        //     next()
        // } else {
        //     throw new ApiError('Unauthorized access: You are not allowed to perform this action', 403)
        // }
    } catch (error) {
        next(error)
    }
}

// export const Guard = (allowedRoles: RolesEnum[]) => async  (req: Request, res: Response, next: NextFunction) => {
//     try {
//         if (!req.user) {
//             throw new ApiError('Unauthorized access: You are not authenticated', 401)
//         }
//         if (!req.user.role) {
//             throw new ApiError('Unauthorized access: Your permissions have not been set', 403)
//         }
//         if (allowedRoles.includes(req.user.role)) {
//             next()
//         } else {
//             throw new ApiError('Unauthorized access: You are not allowed to perform this action', 403)
//         }
//     } catch (error) {
//         next(error)
//     }
// }