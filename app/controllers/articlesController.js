var Article = require('../models/Article');

function create(request, response) {
  console.log(request.body);
  var article = new Article(request.body);

  article.save(function(error) {
    if (error) console.error('Could not create b/c:', error);

    response.json({message: 'Article successfully created'});
  });
}

function index(request, response) {
  Article.find(function(error, articles) {
    if (error) console.error('could not get articles b/c:', error);

    response.json(articles);
  })
}

function show(request, response) {
  var id = request.params.article_id;

  Article.findById(id, function(error, article) {
    if (error) console.error('could not get the article');

    response.json(article);
  })
}

function update(request, response) {
  var id = request.params.article_id;
  var data = request.body;

  Article.findById(id, function(error, article) {
    if (error) console.error('could not update article');

    Object.keys(data).forEach(function(key) {
      article.set(key, data[key]); // set replaces the value of a field with the specified value
    });

    article.save(function(error) {
      if (error) console.error('could not patch');

      response.json({message: 'article successfully updated'});
    });
  })
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update
}