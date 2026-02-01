import { Document } from "mongodb";
import mongoose from "mongoose";

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

export interface CsvRow extends IParticipant{}