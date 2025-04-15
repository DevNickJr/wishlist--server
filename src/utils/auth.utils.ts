import { Request } from "express";

export const extractTokenFromHeader = (
    request: Request,
  ): string | undefined => {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
};
  
export const extractFromCookie = (req: Request): string | null => {
    let token: string | null = null;
    if (req && req.cookies) {
        token = req.cookies['Authentication'];
    }
    return token;
};