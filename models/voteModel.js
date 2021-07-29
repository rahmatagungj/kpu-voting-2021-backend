var mongoose = require('mongoose');
// Setup schema

var voteSchema = mongoose.Schema({
    nim: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    vote_to: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Vote model
var Vote = module.exports = mongoose.model('vote', voteSchema);

module.exports.get = function (callback, limit) {
    Vote.find(callback).limit(limit);
}