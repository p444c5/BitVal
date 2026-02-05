import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongodb";
import mongoose from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
}

export interface IDecodedToken extends JwtPayload , IAdmin{
    role?: string;
}

export interface IDecodedUser extends JwtPayload {
    username: string;
    role?: string;
}
export interface AuthRequest extends Request {
    user: IDecodedUser | string; 
}


export interface IParticipant extends Document {
  name: string;
  deposit: number;
  walletAddress: string;
  amountAllocated: number; 
  pairedWith: mongoose.Types.ObjectId | null; 
  isPaired: boolean;
  status?: 'active' | 'matched' | 'completed' |'allocated';
}

export class Pairing {
  constructor(
    public participant1: IParticipant,
    public participant2: IParticipant
  ) {}
}
export interface IDistributionPlan extends Document {
  giverName: string;
  giverAddress: string;
  receiverName: string;
  receiverAddress: string;
  amount: number;
}

export interface CsvRow extends IParticipant{}