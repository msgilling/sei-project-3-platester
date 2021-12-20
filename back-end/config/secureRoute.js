import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from './environment.js'


export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error()
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, secret)
    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error()
    req.currentUser = userToVerify
    next()
  } catch (err) {
    return res.status(401).json({ 'message': 'Unauthorized' })
  }
}