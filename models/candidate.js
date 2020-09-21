const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: { type: String, required: true },
    lastname: String,
    job_title: String,
    current_position: String,
    current_company: String,
    expected_position: String,
    contact: {
        address: {
            street: { type: String },
            city: { type: String },
            country: { type: String }
        },
        mail: String, tel: String
    },
    skills: {
        tech: [{ name: { type: String }, xp: Number }],
        tools: [{ name: { type: String }, xp: Number }]
    },
    experience: Number,
    availability: Date,
    expected_salary: {
        from: Number, to: Number,
        per: { type: String, enum: ['year', 'month'] },
        currency: { type: String, default: '€' }
    }
})

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;