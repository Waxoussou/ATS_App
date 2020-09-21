const mongoose = require('mongoose');
const Schema = mongoose.schema();

const applicationSchema = new Schema({
    candidate_id: { type: Schema.Types.ObjectId, ref: 'Candidate' },
    date_of_application: { type: Date },
    status: { type: String, enum: ['saved', 'called', 'interviewed', 'assessment', 'proposal', 'hired'] },
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;