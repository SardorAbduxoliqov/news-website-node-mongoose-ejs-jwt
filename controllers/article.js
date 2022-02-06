const mongoose = require("mongoose");
const News = require("../models/News");
const User = require("../models/User");

exports.postAddArticle = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const text = req.body.text;

  const newArticle = new News({
    title,
    imgUrl,
    text,
  });

  newArticle
    .save()
    .then((result) => {
      console.log("Created Article");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await News.find().sort({ createdAt: -1 }).limit(7);
    res.render("allArticles", {
      articles,
      pageTitle: "All articles",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPostArticles = async (req, res, next) => {
  try {
    res.render("admin/postArticle", {
      pageTitle: "Post article",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getOneArticle = async (req, res, next) => {
  const id = req.params.articleId;
  const allArticles = await News.find().sort({ createdAt: -1 }).limit(5);

  News.findById(id)
    .then((articles) => {
      res.render("oneArticle", {
        articles,
        allArticles,
        pageTitle: articles.title,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
