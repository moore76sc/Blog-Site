const models = require('../models/articleSchemas.js');

const articleController = {};

articleController.createArticle = async (req, res, next) => {
  try{
  console.log('try ding')
    let newArticle = await models.Article.create(req.query);
    console.log('create ding')
    newArticle = JSON.stringify(newArticle);
    console.log('stringify ding')
    return res.status(201).json({new_article: newArticle});
  } catch{
    return res.status(400).send('Create article failed!')
  }
};

articleController.getRecentArticles = async (req, res, next) => {
  try {
    let recentArticles = await models.Article.find().sort({_id:-1}).limit(5);//retrieve the five most recent articles sorted by newest
    recentArticles = JSON.stringify(recentArticles);
    res.locals.recentArticles = recentArticles
    return next();
  } catch {
    return res.status(400).send('Failed to get recent articles!')
  }
};

articleController.getOneArticle = async (req, res, next) => {
  try { 
    let retrievedArticle;
    if(req.query.id){
      retrievedArticle = await models.Article.find({ _id: req.query.id})//if an id is provided find article by id
    } else {
      retrievedArticle = await models.Article.find(req.query)//if no id then find article by text search
    };
    retrievedArticle = JSON.stringify(retrievedArticle)
    res.locals.retrievedArticle = retrievedArticle;
    return next();
  } catch {
      return res.status(400).send('Failed to retrieve article!')
  }
};

articleController.updateArticle = async (req, res, next) => {
  try {
    let updatedArticle = await models.Article.updateOne({ _id: req.query.id}, req.query);
    updatedArticle = JSON.stringify(updatedArticle);
    res.locals.updatedArticle = updatedArticle;
    return next();
  } catch {
    return res.status(400).send('Failed to update article!')
  }
};

articleController.deleteArticle = async (req, res, next) => {
  try{
    await models.Article.findOneAndDelete({ _id: req.query.id});
    return res.status(201).send('Article deleted!')
  } catch {
    return res.status(400).send('Failed to delete article!')
  }
};

module.exports = articleController;