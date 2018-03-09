var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    array: {type: Object}
});

module.exports = mongoose.model('array', schema);