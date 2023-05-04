/**
 * A module containing route handlers for unit related
 * API calls
 *
 */

const express = require('express')
const router = express.Router()
const { // import controller functions for route handlers
    getAllUnits,
    getUnit,
    deleteUnit,
    updateUnit
} = require('../controllers/unitController');

// get all units for a user
router.get('/', getAllUnits)

// get a specific unit for a user TODO
router.get('/:unitId', getUnit)

// add a new unit for the user FIXME
router.post('/', (req, res) => {
    console.log("GET all units");
})

// delete a specific unit for a user
router.delete('/:unitId', deleteUnit);

// update a specific unit for a user
router.patch('/:unitId', updateUnit);

// export this router for external use
module.exports = router