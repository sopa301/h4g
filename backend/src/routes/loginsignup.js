import express from "express";
import {
  signupUser,
  loginUser,
  validateUser,
} from "../controllers/userSignupLoginController";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/validate", validateUser);

export default router;
