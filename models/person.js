const mongoose = require("mongoose")
const Schema = mongoose.Schema

let Person = new Schema({
    created_at: {
        type: Date, default: Date.now
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
},
{collection: 'person'})

module.exports = mongoose.model('person', Person)