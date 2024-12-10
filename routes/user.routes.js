import express from "express";
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome traveller!!");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  //registering a user
  const user = await User.findOne({ name });
  if (user) {
    res.send("User already Exists!!!");
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "user registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  //check whether user with this mail exists or not
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ message: "User does not exist!!, Create an Account first" });
    return;
  }

  //compare hashed and passwords entered by the user
  const flag = await bcrypt.compare(password, user.password);
  if (flag) {
    //create a jwt token
    const token = jwt.sign({ id: user._id }, "secrets");
    res.json({ token });
  } else {
    res.send("Passwords don't match!!");
  }
});
export { router as userRouter };
