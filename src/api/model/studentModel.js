const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    contact_no: {
        required: true,
        type: String
    },
    LRNNum: {
        required: true,
        type: String
    },
    role: {
        require: true,
        type: Number
    },
    password:{
        required: true,
        type: String
    },
    schoolEmail:{
        required: true,
        type: String
    },
    id:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('student', dataSchema)      