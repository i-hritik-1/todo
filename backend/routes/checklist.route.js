const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checkList.controller');
const authenticationToken = require('../middleware/auth.middleware');

router.post('/createCheckList', authenticationToken, checklistController.createCheckList);
router.get('/getCheckList', authenticationToken, checklistController.getCheckList);
router.put('/updateCheckList', authenticationToken, checklistController.updateCheckList);
router.delete('/deleteCheckList', authenticationToken, checklistController.deleteCheckList);

module.exports = router;