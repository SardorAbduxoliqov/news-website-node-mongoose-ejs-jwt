const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.get("/", articleController.getArticles);
router.get("/admin", verifyTokenAndAdmin, articleController.getPostArticles);
router.post("/", articleController.postAddArticle);
router.get("/:articleId", articleController.getOneArticle);

module.exports = router;    
