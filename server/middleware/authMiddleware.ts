import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { AuthRequest, IDecodedUser } from "../types";

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
    // @ts-ignore
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_SECRET as string,
        (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
            if (err) {
                 res.status(403).json({ message: 'Forbidden' });
                 return;
            }
            
            (req as unknown as AuthRequest).user = decoded as IDecodedUser;
            next();
        }
    );
};
