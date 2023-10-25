const mongoose = require('mongoose')

const accidentSchema = mongoose.Schema({
    date: {
        type: String,
        required: [true, 'Please add a Value']
    },
    location: {
        type: String,
        required: [true, 'Please add a Value']
    },
    description: {
        type: String,
        required: [true, 'Please add a Value']
    },
    fatalities: {
        type: String,
        required: [true, 'Please add a Value']
    },
    injured: {
        type: String,
        required: [true, 'Please add a Value']
    },
    vehicle_type: {
        type: String,
        required: [true, 'Please add a Value']
    },
    assigned_officer: {
        type: String,
    },
    isSolved: {
        type: Boolean,
        default: null,
    },
    date_of_report: {
        type: Date,
        default: Date.now
    },
    action_status: {
        type: String,
        enum: ["InProgress", "Solved", "Resolved", "Closed Case"],
        default: "InProgress",
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Accident Report', accidentSchema)