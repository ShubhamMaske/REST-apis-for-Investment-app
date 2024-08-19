import Investment from '../models/investment.js'
import Transaction from '../models/transactions.js'
import User from '../models/users.js'

export const getBankDetails = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await User.findById(id).select(
      'accountHolderName accountNumber ifscCode'
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res
      .status(200)
      .json({
        accountHolderName: user.accountHolderName,
        accountNumber: user.accountNumber,
        ifscCode: user.ifscCode
      })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addBankDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const { accountHolderName, accountNumber, ifscCode } = req.body
    // Update bank details
    user.accountHolderName = accountHolderName
    user.accountNumber = accountNumber
    user.ifscCode = ifscCode

    await user.save()

    res.status(200).json({ message: 'Bank details updated successfully', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getInvestmentDetails = async (req, res, next) => {
  try {
    const userInvestments = await Transaction.find({
      user: req.user.id,
      type: 'investment'
    })
    res.status(200).json(userInvestments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
    res.status(200).json(transactions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const investMoney = async (req, res, next) => {
    try {
        const amount = +req.body.amount;
        const userId = req.user.id;
    
        if (!amount || amount <= 0) {
          return res.status(400).json({ message: 'Invalid investment amount' });
        }
    
        await Transaction.create({user: userId, type: 'investment', amount });
    
        let investment = await Investment.findOne({ user: userId });
        if (!investment) {
          investment = await Investment.create({ user: userId, totalInvested: amount });
        } else {
            investment.totalInvested += amount;
            await investment.save();
        }
    
        return res.status(200).json({ message: 'Investment successful', investment });
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
  }
