const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//GET REGISTER
exports.getRegister = (req, res, next) => {
  res.render("auth/signup");
};

//GET LOGIN
exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};

//REGISTER
exports.postRegister = async (req, res, next) => {
  try {
    const newUser = await new User({
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).render("auth/login");
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    !user && res.status(401).json("Email or Password is Wrong");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.render("admin/postArticle", {
      accessToken,
      pageTitle: "All articles",
    });
    // res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
