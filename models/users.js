import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  nominee: { type: mongoose.Schema.Types.ObjectId, ref: 'Nominee' },
  accountHolderName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  ekyc: { type: mongoose.Schema.Types.ObjectId, ref: 'EKYC' },
  otp: { type: String},
  otpExpiresAt: { type: Date}
});

const User = mongoose.model('User', userSchema);
export default User;
