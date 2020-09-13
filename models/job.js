const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    localisation: {
        city: String,
        cp: Number,
        country: String
    },
    status: { type: String, enum: ['created', 'short-list', 'done'], default: 'created' },
    recruiterId: { type: Schema.Types.ObjectId, ref: 'Recruiter' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    applications: [{
        id: {
            type: mongoose.ObjectId,
            default: new mongoose.Types.ObjectId()
        },
        candidate_id: { type: Schema.Types.ObjectId, ref: 'Candidate' },
        date_of_application: { type: Date },
        status: { type: String, enum: ['saved', 'called', 'interviewed', 'assessment', 'proposal', 'hired'] },
    }],
    isActive: { type: Boolean, default: true },
    required_skills: {
        tech: [{ name: { type: String }, xp: Number }],
        tools: [{ name: { type: String }, xp: Number }]
    },
    experience: Number,
    salary: {
        from: Number, to: Number,
        per: { type: String, enum: ['year', 'month'] },
        currency: String
    },
    expected_starting_date: { Month: String, year: Number },
    created_at: { type: Date, default: Date.now },
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;