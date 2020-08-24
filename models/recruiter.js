const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    username: { type: String, unique: true },
    password: {
        type: String,
        required: true
    },
    contact: {
        tel: { type: Number },
        mail: { type: String },
        adress: {
            street: { type: String },
            city: { type: String },
            country: { type: String }
        }
    },
    company: {
        name: { type: String },
        contact: {
            mail: String,
            tel: Number,
            web: String,
            address: {
                street: { type: String },
                city: { type: String },
                country: String
            },
        }
    }


})

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;