const express = require('express');
const router = express.Router();

const{
    createCheckList
} = require('../controllers/checkList.controller');

router.post('/createCheckList', createCheckList);

module.exports = router;