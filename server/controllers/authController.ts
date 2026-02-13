import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import Admin from "../models/Admin";
import { IAdmin,IDecodedToken } from "../types";



class AuthController {
    
    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body as IAdmin;

            if (!username || !password) {
                res.status(400).json({ message: "Username and password are required" });
                return;
            }

            const admin = await Admin.findOne({ username });
            if (!admin) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const accessTokenSecret = process.env.ACCESS_SECRET as string;
            const refreshTokenSecret = process.env.REFRESH_SECRET as string;

            if (!accessTokenSecret || !refreshTokenSecret) {
                throw new Error("JWT Secrets not defined in environment");
            }

            const accessToken = jwt.sign(
                { id: admin._id.toString(), username: admin.username, role: 'admin' },
                accessTokenSecret,
                { expiresIn: '5m' } 
            );

            const refreshToken = jwt.sign(
                { id: admin._id.toString(), username: admin.username },
                refreshTokenSecret,
                { expiresIn: '1d' }
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.status(200).json({
                message: "Login successful",
                accessToken, 
                admin: { id: admin._id, username: admin.username }
            });

        } catch (error: unknown) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Server error during login" });
        }
    };


    public refreshToken = async (req: Request, res: Response): Promise<void> => {
        const cookies = req.cookies as { jwt?: string };

        if (!cookies?.jwt) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const refreshToken = cookies.jwt;
        const refreshTokenSecret = process.env.REFRESH_SECRET as string;
        
        if (!refreshTokenSecret) {
             res.status(500).json({ message: "Server configuration error" });
             return;
        }

        try {
            jwt.verify(
                refreshToken, 
                refreshTokenSecret, 
                async (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
                    
                    if (err) {
                         res.status(403).json({ message: 'Forbidden: Invalid token' });
                         return;
                    }
                    const tokenData = decoded as IDecodedToken;

                    if (!tokenData || !tokenData.id) {
                        res.status(403).json({ message: 'Forbidden: Invalid token structure' });
                        return;
                    }

                    const admin = await Admin.findById(tokenData.id);
                    
                    if (!admin) {
                        res.status(401).json({ message: 'Unauthorized: Admin not found' });
                        return;
                    }

                    const accessTokenSecret = process.env.ACCESS_SECRET as string;
                    
                    const accessToken = jwt.sign(
                        { id: admin._id.toString(), username: admin.username, role: 'admin' },
                        accessTokenSecret,
                        { expiresIn: '5m' }
                    );

                    res.json({ accessToken });
                }
            );
        } catch (error: unknown) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    public logout = (req: Request, res: Response): void => {
        const cookies = req.cookies as { jwt?: string };
        if (!cookies?.jwt) {
             res.sendStatus(204); 
             return;
        }
        
        res.clearCookie('jwt', { 
            httpOnly: true, 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
            secure: process.env.NODE_ENV === 'production' 
        });
        res.json({ message: 'Cookie cleared' });
    }

   
    public createAdmin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body as IAdmin;

            if (!username || !password) {
                 res.status(400).json({ message: "Username and password required" });
                 return;
            }
            
            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin) {
                 res.status(400).json({ message: "Admin already exists" });
                 return;
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            
            const newAdmin : IAdmin = new Admin({ 
                username, 
                password: passwordHash 
            });
            
            await newAdmin.save();

            res.status(201).json({ message: "Admin created successfully" });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            res.status(500).json({ message: "Error creating admin", error: errorMessage });
        }
    }
}

export default AuthController;
