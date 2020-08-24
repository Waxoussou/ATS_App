const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String },
    status: { type: String },
    recruiterId: { type: Schema.Types.ObjectId, ref: 'Recruiter' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    applications: [],
    isActive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;