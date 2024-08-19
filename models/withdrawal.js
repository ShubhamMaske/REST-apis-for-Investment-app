import mongoose from 'mongoose';

const withdrawalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dateOfWithdrawal: { type: Date, required: true, default: Date.now }
});

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);
export default Withdrawal;
