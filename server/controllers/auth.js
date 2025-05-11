const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { handle, email, password, category } = req.body;
  try {
    const defaultLink = {
      url: "codeforces.com/profile/tourist?locale=en",
      title: "Tourist",
      icon: "https://news.itmo.ru/images/news/big/917925.jpg",
    };
    const user = await User.create({
      handle,
      email,
      password,
      role: category,
      links: [defaultLink],
    });
    const token = jwt.sign({ email: email }, process.env.SECRET_JWT);

    return res.json({
      message: "user created",
      status: "success",
      token: token,
      id: user._id,
    });
  } catch (err) {
    if (err.code === "11000") {
      return res.json({
        message: "Try a different handle or email",
        status: "error",
      });
    }
    return res.json({ message: err.message, status: "error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ status: "error" });
    }
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.json({ status: "error", error: "Invalid Credentials" });
    }
    const token = jwt.sign({ email: email }, process.env.SECRET_JWT);
    return res.json({
      message: "user found",
      status: "success",
      token: token,
      id: user._id,
    });
  } catch (err) {
    return res.json({ message: err.message, status: "error" });
  }
};

module.exports = { registerUser, loginUser };
