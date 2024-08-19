import mongoose from 'mongoose';

const ekycSchema = new mongoose.Schema({
  aadharNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  profession: { type: String, required: true }
});

const EKYC = mongoose.model('EKYC', ekycSchema);
export default EKYC;
