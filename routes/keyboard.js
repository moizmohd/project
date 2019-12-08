const express=require('express');

const router=express.Router();

const userModel=require('../models/userModel');
router.get('/',function(req,res){
  
    userModel.find({instrument:"keyboard"})
    .exec()
    .then(anythin=>{
   // res.json(anythin).status(200);
    res.send(anythin);
})});



module.exports=router;