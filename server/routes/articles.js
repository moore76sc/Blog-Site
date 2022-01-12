const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController.js')

router.get('/recent', articleController.getRecentArticles, (req, res) => {
  return res.status(201).json({recent_articles: res.locals.recentArticles});
});

router.get('/retrieve', articleController.getOneArticle, (req, res) => {
  return res.status(201).json({retrieved_article: res.locals.retrievedArticle})
});

router.post('/new', articleController.createArticle);

router.put('/', articleController.updateArticle, (req, res) => {
  return res.status(201).json({updated_article: res.locals.updatedArticle});
});

router.delete('/', articleController.deleteArticle);

module.exports = router