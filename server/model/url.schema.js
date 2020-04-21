// We are using the Schema Class here
// This allows us to declare specifically what is IN the
// document and what is not
const Schema = require('mongoose').Schema;


exports.UrlSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    originalUrl: String,
    shortenUrl: String,
// this explicitly declares what collection we're using
}, { collection : 'urls' });