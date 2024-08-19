import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['investment', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
