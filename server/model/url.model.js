const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const UrlSchema = require('./url.schema').UrlSchema

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const UrlModel = mongoose.model("Url", UrlSchema);

function insertUrl(url) {
    return UrlModel.create(url);
}

function getAllUrl() {
    return UrlModel.find().exec();
}

// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function deleteUrlById(id) {
    return UrlModel.findById(id).remove().exec();
}

function findUrl(shortenUrl) {
    return UrlModel.find({shortenUrl: shortenUrl});
}

// Make sure to export a function after you create it!
module.exports = {
    insertUrl,
    getAllUrl,
    deleteUrlById,
    findUrl,
};