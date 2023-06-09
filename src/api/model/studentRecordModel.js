const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    studentID: {
        required: true,
        type: String
    },
    // school term date and year
    secCode:{
        required: true,
        type: String,
    },
    gradeCode:{
        required: true,
        type: String
    },
    name:{
        require: true,
        type: String
    },
    schoolYear:{
        require: true,
        type: String
    },
    LRNNumber:{
        require: true,
        type: String
    }
})

module.exports = mongoose.model('studentRecord', dataSchema)      