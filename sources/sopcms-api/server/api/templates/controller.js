/**
* Using Rails-like standard naming convention for endpoints.
* GET     /templates              ->  index
* POST    /templates              ->  create
* GET     /templates/:id          ->  show
* PUT     /templates/:id          ->  update
* DELETE  /templates/:id          ->  destroy
*/

'use strict';

var _ = require('lodash');
var Templates = require('./model');

// Get list of templates
exports.index = function(req, res) {
    Templates.find(function (err, things) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(things);
    });
};

// Get a single templates
exports.show = function(req, res) {
    Templates.findById(req.params.id, function (err, thing) {
        if(err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        return res.json(thing);
    });
};

// Creates a new templates in the DB.
exports.create = function(req, res) {
    Templates.create(req.body, function(err, thing) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(thing);
    });
};

// Updates an templates thing in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Templates.findById(req.params.id, function (err, thing) {
        if (err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(thing);
        });
    });
};

// Deletes a templates from the DB.
exports.destroy = function(req, res) {
    Templates.findById(req.params.id, function (err, thing) {
        if(err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        thing.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
