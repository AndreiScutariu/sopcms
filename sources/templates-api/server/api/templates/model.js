'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  name: String,
  category: String,
  template: String,
  model: String,
  active: Boolean
});

module.exports = mongoose.model('Template', TemplateSchema);
