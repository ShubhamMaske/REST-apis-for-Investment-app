import Joi from 'joi'
import User from '../models/users.js'
import jwt from 'jsonwebtoken';
import Twilio from 'twilio';
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res, next) => {
  // validate the request body
  const resgisterSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .regex(/^\d{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
      .required()
  })

  const { error } = resgisterSchema.validate(req.body)

  if (error) {
    return res.status(401).json({ message: error.message })
  }
  const { name, email, phone } = req.body
  // check user is already exist or not
  try {
    let user = await User.exists({ email: email })

    if (user) {
      return res.status(401).json({ message: error.message })
    }

    user = await User.create({ name, email, phone })
    console.log('user -> ', user)
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const generateOtp = async (req, res, next) => {
  // validate the request body
  const generateOtpSchema = Joi.object({
    phone: Joi.string()
      .regex(/^\d{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
      .required()
  })

  const { error } = generateOtpSchema.validate(req.body)

  if (error) {
    return res.status(401).json({ message: error.message })
  }
  try {
    const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const OTP_EXPIRATION_TIME = 300; 
  const otp = createOtp();
  console.log(otp)
  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME * 1000); // OTP expires in 5 minutes
  await user.save();

  await sendOtp(phone, otp);

  res.status(200).json({ message: 'OTP sent to your mobile number' });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone, otp });
  
    if (!user || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1D' });
  
    // Clear OTP
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
  
    res.status(200).json({ message: 'OTP verified', token });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function createOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendOtp(phone, otp) {
  try {
    const message = await twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });
    console.log('OTP sent successfully:', message.sid);
  } catch (error) {
    console.error('Failed to send OTP:', error);
  }
}

