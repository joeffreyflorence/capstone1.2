const mongoose = require('mongoose')

const crimeSchema = mongoose.Schema({
    type_crime: {
        type: String,
        required: [true, 'Please add a Value']
    },
    name_crime: {
        type: String,
        required: [true, 'Please add a Value']
    },
    location: {
        type: String,
        required: [true, 'Please add a Value']
    },
    incident_date: {
        type: String,
        required: [true, 'Please add a Value']
    },
    isSolved: {
        type: Boolean,
        default: null,
    },
    date_of_report: {
        type: Date,
        default: Date.now
    },
    assigned_officer: {
        type: String,
    },
    action_status: {
        type: String,
        enum: ["InProgress", "Solved", "Resolved", "Closed Case"],
        default: "InProgress",
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Crime Report', crimeSchema)