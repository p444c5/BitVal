import mongoose, { Schema, Document } from 'mongoose';
import type { IAdmin } from '../types';


const AdminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
