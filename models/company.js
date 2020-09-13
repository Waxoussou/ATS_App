const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    logo: String,
    address: {
        street: String,
        city: String,
        cp: Number,
        country: String
    },
    contact: {
        phone: Number,
        email: String,
        website: String,
        social_media: [{ name: String, link: String }],
    },
    peoples: [{
        name: String, latname: String, position: String,
        contact: {
            phone: Number,
            email: String,
        }
    }],

})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;