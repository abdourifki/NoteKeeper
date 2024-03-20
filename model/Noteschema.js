const mongoose = require('mongoose');

const Noteschema= mongoose.Schema({

    Title : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    }
})

const Notes = mongoose.model('Notes', Noteschema);

module.exports = Notes;