const mongoose = require('mongoose')

const MONGO_URI = 

mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
dbName: 'financial_advisor'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

  const Schema = mongoose.Schema;

  const articleSchema = new Schema({
    title: String,
    body: String
  });
  const Article = mongoose.model('article', articleSchema);

  module.exports = {
  Article
  };
