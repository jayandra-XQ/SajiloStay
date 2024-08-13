import {generateTokenAndSetCookie} from "../lib/utils/generateToken.js";
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if user already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) return res.status(400).json({ message: 'Email already exists' })

    // hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(200).json({ message: 'Registered successfully', user })

  } catch (error) {
    res.status(500).json({ message: 'Error registering', error })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({ message: 'User not found' });

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    //generate token
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error in Login', error });
  }
}

