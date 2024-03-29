require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../db/schema/User");
const {
  getUserById,
  isExistingUserByName,
  getUserByName,
} = require("../util/db");
const { makeNewUser } = require("../db/util/user");

// constant declarations for encryption
const tokenDuration = process.env.TOKEN_DURATION;
const jwtSecret = process.env.SECRET;
const algorithm = "aes-256-cbc";
const initVector = Buffer.from("7d3039e7f8a32ff9d12d5802290532df", "hex");
const Securitykey = Buffer.from(
  "ac0aabe13d0856f66b0dde912faac79b8d3839b00ac28c43dd21127642f5a1d4",
  "hex"
);
// side note: Everytime encryption/decryption is run, a new cipher object needs to be created.

const signupUser = async (req, res, next) => {
  const { username, email, teleHandle, password, age } = req.body;
  try {
    if (!(username && email && password, age)) {
      return res.status(403).json({
        error: "Username, email, age and password is required for signing up",
      });
    }
    const encryptedPassword = encryptPassword(password);

    if (await isExistingUserByName(username)) {
      return res.status(403).json({ error: "username taken" });
    }
    await User.create(
      makeNewUser(username, email, teleHandle, encryptedPassword, age)
    );
    return res.status(201).json({ success: "success" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res
      .status(403)
      .json({ error: "Both username and password is required for logging in" });
  }
  const encryptedPassword = encryptPassword(password);
  try {
    const existingUser = await getUserByName(username);
    if (existingUser === null) {
      console.log("login failed: username not found");
      return res.status(404).json({ error: "username not found" });
    }
    if (existingUser.passwordHash !== encryptedPassword) {
      console.log("login failed: password incorrect");
      return res.status(403).json({ error: "password incorrect" });
    }
    console.log("success!");
    const userId = existingUser._id.toString();
    const token = createToken(userId);
    await updateUserToken(userId, token);
    return res.status(201).json({
      success: "login success!",
      token: token,
      userId: userId,
      isAdmin: existingUser.isAdmin,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

const validateUser = async (req, res, next) => {
  const { userId, token } = req.body;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const existingUser = await getUserById(userId);
    if (existingUser === null) {
      return res.status(404).json({ error: "User not found" });
    }
    const dbToken = existingUser.token;
    if (!dbToken) {
      return res.status(404).json({ error: "Timeout error" });
    }
    if (dbToken !== token) {
      throw new Error("Invalid token");
    }
    verifyToken(token);
    return res.status(201).json({ isAdmin: existingUser.isAdmin });
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token. Please log in again.");
  }
};
module.exports = { signupUser, loginUser, validateUser };

function createToken(id) {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: tokenDuration,
  });
}

function verifyToken(token) {
  jwt.verify(token, jwtSecret);
}

async function updateUserToken(userId, token) {
  await User.updateOne({ _id: userId }, { token: token });
}

function encryptPassword(password) {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  return cipher.update(password, "utf-8", "hex") + cipher.final("hex");
}
