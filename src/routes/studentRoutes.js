const express=require('express')
const router=express.Router()
const auth = require('../models/middleware/auth');
const studentController=require('../controllers/studentController')

router.post('/addStudent', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.get('/profile', auth, studentController.getProfile);


module.exports=router