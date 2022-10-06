const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    reg_id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    class : {
        type : String,
        required : true
    },
    guardian : {
        type : String,
        required : true
    },
    guardian_contact : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('StudentsModel',studentSchema)