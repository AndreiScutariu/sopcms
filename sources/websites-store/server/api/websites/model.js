'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WebsiteSchema = new Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Website', WebsiteSchema);
