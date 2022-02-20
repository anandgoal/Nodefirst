let mongoose = require('mongoose');

let PrepaidSchema = new mongoose.Schema({
    cardNo:{
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required:true
    },
    amount:{
        type: Number,
        default:0
    },
    merchant: {type: String}
});
 
module.exports = mongoose.model('Prepaid', PrepaidSchema);


