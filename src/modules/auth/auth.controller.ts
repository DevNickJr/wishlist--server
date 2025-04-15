import { NextFunction, Request, Response } from "express";
import { loginUserSchema, registerSchema } from "./auth.schema";
import { login, logout, registerUserHandler } from "./auth.service";

export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = registerSchema.parse(req.body)
    const user = await registerUserHandler({ data: body });
    
    res.status(201).json(user);
  } catch (e: any) {
    return next(e)
  }
}

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = loginUserSchema.parse(req.body)
    const user = await login({
      userData: body,
    //   response: res
    });
    
    res.status(200).json(user);
  } catch (e: any) {
    console.error(e);
    return next(e)
  }
}

export async function logoutHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await logout({
      response: res
    });
    
    res.json(response);
  } catch (e: any) {
    console.error(e);
    return next(e)
  }
}

// export async function checkAuthHandler(
//   req: RequestWithUser,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const user = req.user

//     if (!user) {
//       console.log({ lll: req })
//       throw new CustomError('User not found')
//     }
    
//     res.json(user);
//   } catch (e: any) {
//     console.error(e);
//     return next(e)
//   }
// }