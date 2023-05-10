const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller')

console.log('router is running');


router.get('/',homeController.home);
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));
//for any further routes
//router.use('/routerName','./routerFile')

module.exports=router;