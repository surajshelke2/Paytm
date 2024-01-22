const express = require('express');
const { getBalance, transfer } = require('../controller/account');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();


router.get('/balance',authMiddleware,getBalance);
router.post('/transfer',authMiddleware,transfer)




module.exports=router