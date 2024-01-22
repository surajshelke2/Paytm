const express = require('express');
const { register, login, getUsers, updateUser } = require('../controller/user');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/signup',register);
router.post('/signin',login);

router.put("/",authMiddleware,updateUser);
router.get("/bulk", authMiddleware,getUsers);


module.exports =router