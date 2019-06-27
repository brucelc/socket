

var mongoose = require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({

    uid: String,
    nickname: String,
    headurl: String,
    content: String,
    type: Number,


});