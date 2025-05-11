const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { registerUser, loginUser } = require("./controllers/auth");
const {getUserData,getUserSocials} = require("./controllers/getUserdata");
const {dashBoardData} = require("./controllers/dashboard");
const {saveSocials,saveProfile,saveLinks} = require('./controllers/saveItems')
const {loadSocials,loadLinks} = require("./controllers/loadPrevious")
require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err.message));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

app.post("/data/dashboard", dashBoardData);

app.get("/get/:handle",getUserData);
// app.get("/get/socials/:handle",getUserSocials)

app.post('/save/socials',saveSocials)
app.post('/load/socials',loadSocials);
app.post('/save/profile',saveProfile)
app.post('/save/links',saveLinks)
app.post('/load/links',loadLinks);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
