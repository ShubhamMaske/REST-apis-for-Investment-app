import express from 'express';

import { register, generateOtp, verifyOtp } from '../controllers/authController.js';
import { addNominee, addEkyc } from '../controllers/userUpdateController.js'
import { getBankDetails, addBankDetails, getInvestmentDetails, getTransactions, investMoney } from '../controllers/transactionController.js'

import auth from '../middleware/auth.js';

const router = express.Router();

// auth routes
router.post('/register',register)
router.post('/generate-otp', generateOtp)
router.post('/verify-otp', verifyOtp)

// users route
router.post('/add-nominee', auth, addNominee)
router.post('/ekyc', auth, addEkyc)

// transactions routes
router.get('/bank', auth, getBankDetails)
router.post('/bank', auth,  addBankDetails)
router.get('/investments', auth, getInvestmentDetails)
router.get('/transactions', auth, getTransactions)
// router.post('/withdraw', auth, withdrawMoney)

router.post('/invest', auth, investMoney)

export default router;