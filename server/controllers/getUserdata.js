const User = require("../models/user");

const getUserData = async function (req, res) {
  const handle = req.params.handle;
  try {
    const user = await User.findOne({ handle: handle });
    const userData = {
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      links: user.links,
    };
    const socials = user.socialMedia;
    return res.json({ message: "found", userData, socials, status: "success" });
  } catch (err) {
    console.error(err);
    return res.json({ status: "error", error: err.message });
  }
};

const getUserSocials = async (req, res) => {
  const handle = req.params.handle;

  try {
    const user = await User.findOne({ handle: handle });
    const socials = user.socialMedia;
    return res.json({ message: "found", socials, status: "success" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
};

module.exports = { getUserData, getUserSocials };
