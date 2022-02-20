let mongoose = require('mongoose');

let FileSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true,
        unique: true
    },
    user: {type: String, required: true}
});
 
module.exports = mongoose.model('File', FileSchema);