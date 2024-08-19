import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalInvested: { type: Number, required: true },
  dateOfInvestment: { type: Date, required: true, default: Date.now }
});

const Investment = mongoose.model('Investment', investmentSchema);
export default Investment;
