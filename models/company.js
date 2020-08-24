const { Mongoose } = require("mongoose");
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
    }
})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;