const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');


console.log("Router initialised");
router.get('/',homeController.home);
//router.post('/sign-in',homeController.signIn);
//router.get('/sign-up',homeController.signUp);
router.post('/create-user',homeController.Create_user);

router.post('/vote',homeController.vote)

router.post('/voterId',homeController.voterId);
router.get('/data',homeController.Data);
module.exports=router;