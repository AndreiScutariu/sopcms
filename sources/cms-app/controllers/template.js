exports.index = function(req, res) {
  res.render('templates/create', {
    title: 'Template Management'
  });
};
