const jwt_decode = require("jwt-decode");
const User = require("../models/user");

const loadSocials = async (req, res) => {
  const { tokenMail } = req.body;
  try {
    const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
    const email = decodedTokenMail.email;
    const user = await User.findOne({ email: email });
    const socials = user.socialMedia;
    return res.json({ message: "found", socials, status: "success" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
};

const loadLinks = async (req, res) => {
  const { tokenMail } = req.body;
  try {
    const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
    const email = decodedTokenMail.email;
    const user = await User.findOne({ email: email });
    const links = user.links
    return res.json({ message: "found", links, status: "success" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
};

module.exports = {loadSocials,loadLinks}