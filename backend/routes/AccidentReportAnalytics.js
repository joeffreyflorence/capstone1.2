const express  = require('express')
const { 
    getSolvedAccidents,
    updateOngoingAccident,
    getUnsolvedAccidents
} = require('../controllers/AccidentReportController')
const router = express.Router()

router.route('/solved-accidents').get(getSolvedAccidents)

router.route('/unsolved-accidents').get(getUnsolvedAccidents)

router.route('/solve-accident-report/:id').put(updateOngoingAccident)

module.exports = router