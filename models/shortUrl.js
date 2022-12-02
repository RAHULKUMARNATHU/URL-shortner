const mongoose = require('mongoose');
const shortid = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:shortid.generate

    },clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;

