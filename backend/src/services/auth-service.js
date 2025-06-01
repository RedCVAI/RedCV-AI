const { hashPassword, comparePassword } = require("../helpers/encrypt");
const { generateToken } = require("../helpers/jwt");
const User = require("../models/user-model");

const registerUser = async ({ name, email, password }) => {
  console.log("RegisterUser called with:", { name, email });
  const hashedPassword = await hashPassword(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return { userId: user.id, name, email };
};

const loginUser = async ({ email, password }) => {
  console.log("loginUser called with:", { email });
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("Email tidak ditemukan");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Password anda salah, silahkan mencoba lagi");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { token };
};

const getUserById = async (userId) => {
  console.log("getUserById called with:", { userId });
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email"],
  });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = { registerUser, loginUser, getUserById };
