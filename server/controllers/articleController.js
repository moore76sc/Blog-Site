const models = require('../models/articleSchemas.js');

const articleController = {};

articleController.createArticle = async (req, res, next) => {
  try{
  console.log('try ding')
    let newArticle = await models.Article.create(req.body);
    console.log('create ding')
    console.log('stringify ding')
    return res.status(201).json({new_article: newArticle});
  } catch{
    return res.status(400).send('Create article failed!')
  }
};

articleController.getRecentArticles = async (req, res, next) => {
  try {
    console.log('get recent ding')
    let recentArticles = await models.Article.find().sort({_id:-1}).limit(5);//retrieve the five most recent articles sorted by newest
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
    res.locals.retrievedArticle = retrievedArticle;
    return next();
  } catch {
      return res.status(400).send('Failed to retrieve article!')
  }
};

articleController.updateArticle = async (req, res, next) => {
  try {
    let updatedArticle = await models.Article.updateOne({ _id: req.query.id}, req.query);
    res.locals.updatedArticle = updatedArticle;
    return next();
  } catch {
    return res.status(400).send('Failed to update article!')
  }
};

articleController.deleteArticle = async (req, res, next) => {
  try{
    console.log(req.params)
    await models.Article.findOneAndDelete({ _id: req.params.id});
    return res.status(201).send('Article deleted!')
  } catch {
    return res.status(400).send('Failed to delete article!')
  }
};

module.exports = articleController;