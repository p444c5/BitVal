import mongoose, { Schema, set} from 'mongoose';
import type { IParticipant } from '../types';

const ParticipantSchema: Schema = new Schema({
  name: { type: String, required: true , unique: true },
  deposit: {type: Number, required: true, default: 0, set: (v: number) => Number(v.toFixed(8))}, 
  walletAddress: { type: String, required: true , unique: true },
  amountAllocated: { type: Number, default: 0 , set: (v: number) => Number(v.toFixed(8))}, 
  pairedWith: { type: Schema.Types.ObjectId, ref: 'Participant', default: null },
  isPaired: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'matched', 'allocated', 'completed'], default: 'active' }
}, { timestamps: true });

export default mongoose.model<IParticipant>('Participant', ParticipantSchema);