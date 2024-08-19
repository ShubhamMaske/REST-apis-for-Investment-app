import express from 'express';

import { registerController, loginController, userController, productController } from '../controllers/index.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
const router = express.Router();

// auth routes
router.post('/register', registerController.register)
router.post('/generate-otp', loginController.generateOtp)
router.post('/verify-otp', loginController.verifyOtp)

// users route
router.post('/add-nominee', userController.addNominee)
router.get('/manager', userController.getManager)
router.post('/ekyc', userController.addEkyc)

// transactions routes
router.post('/bank', moneyController.addBank)
router.get('/investments', moneyController.getInvestmentDetails)
router.get('/transactions',moneyController.getTransactions)
router.update('/withdraw', moneyController.withdrawMoney)

export default router;