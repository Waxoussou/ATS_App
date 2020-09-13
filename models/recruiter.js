const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    name: String,
    lastname: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        tel: Number,
        mail: String,
        adress: {
            street: { type: String },
            city: { type: String },
            country: { type: String }
        }
    },
    company: {
        type: mongoose.Types.ObjectId, ref: 'Company'
    }

})

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;