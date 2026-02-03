import mongoose, { Schema, Document } from 'mongoose';
import type { IDistributionPlan } from '../types';


const DistributionPlanSchema: Schema = new Schema({
  giverName: { type: String, required: true },
  giverAddress: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  amount: { type: Number, required: true, set: (v: number) => Number(v.toFixed(8)) }
  
}, { timestamps: true });

export default mongoose.model<IDistributionPlan>('DistributionPlan', DistributionPlanSchema);