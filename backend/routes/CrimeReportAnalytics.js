const express  = require('express')
const { 
    updateOngoingCrime,
    getUnsolvedCrime,
    getSolvedCrime
} = require('../controllers/CrimeReportController')
const router = express.Router()

router.route('/solved-crime').get(getSolvedCrime)

router.route('/unsolved-crime').get(getUnsolvedCrime)

router.route('/solve-crime-report/:id').put(updateOngoingCrime)

module.exports = router