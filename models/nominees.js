import mongoose from 'mongoose';

const nomineeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  relation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  aadharNumber: { type: String, required: true }
});

const Nominee = mongoose.model('Nominee', nomineeSchema);
export default Nominee;
