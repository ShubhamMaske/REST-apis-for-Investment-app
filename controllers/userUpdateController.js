import Joi from 'joi'
import User from '../models/users.js'
import Nominee from '../models/nominees.js';
import EKYC from '../models/ekyc.js';

export const addNominee = async (req, res, next) => {
  // validate the request body
  const resgisterSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    relation: Joi.string().required(),
    phone: Joi.string()
      .regex(/^\d{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
      .required(),
    email: Joi.string().email().required(),
    aadharNumber: Joi.string().required()
    
  })

  const { error } = resgisterSchema.validate(req.body)

  if (error) {
    return res.status(401).json({ message: error.message })
  }
  const { name, relation, phone, email, aadharNumber } = req.body;
  try {
    const user = await User.findOne({ _id: req.user.id });

    let nominee = await Nominee.create({ user: req.user.id, name, relation, phone, email, aadharNumber })
    console.log('user -> ', nominee)
    user.nominee = nominee._id

    await user.save()
    res.status(201).json({ message: 'Nominee added successfully', nominee })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addEkyc = async (req, res, next) => {
  // validate the request body
  const resgisterSchema = Joi.object({
    aadharNumber: Joi.string().length(12).required(),
    panNumber: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    address: Joi.string().required(),
    profession: Joi.string().required()
  })

  const { error } = resgisterSchema.validate(req.body)

  if (error) {
    return res.status(401).json({ message: error.message })
  }
  const { aadharNumber, panNumber, dob, gender, address, profession } = req.body;
  try {
    let ekycDetails = await EKYC.create({ user: req.user.id, aadharNumber, panNumber, dob, gender, address, profession })
    console.log('ekycDetails -> ', ekycDetails)
    res.status(201).json({ message: 'Ekyc added successfully', ekycDetails })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
