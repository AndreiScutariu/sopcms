/**
* GET     /webistes              ->  index
* POST    /webistes              ->  create
* GET     /webistes/:id          ->  show
* PUT     /webistes/:id          ->  update
* DELETE  /webistes/:id          ->  destroy
*/

'use strict';

var _ = require('lodash');
var Website = require('./model');

exports.index = function(req, res) {
    Website.find(function (err, things) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(things);
    });
};

exports.show = function(req, res) {
    Website.findById(req.params.id, function (err, thing) {
        if(err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        return res.json(thing);
    });
};

exports.create = function(req, res) {
    Website.create(req.body, function(err, thing) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(thing);
    });
};

exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Website.findById(req.params.id, function (err, thing) {
        if (err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(thing);
        });
    });
};

exports.destroy = function(req, res) {
    Website.findById(req.params.id, function (err, thing) {
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
