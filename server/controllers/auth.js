import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exstinguser = await users.findOne({ email });
    if (exstinguser) {
      console.log(exstinguser);
      return res.status(404).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exstinguser = await users.findOne({ email });
    if (!exstinguser) {
      return res.status(404).json({ message: "User don't exists." });
    }
    const isPassowrdCrt = await bcrypt.compare(password, exstinguser.password);
    if (!isPassowrdCrt) {
      return res.status(404).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { email: exstinguser.email, id: exstinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: exstinguser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
