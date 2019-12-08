const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const eventOrgModel=require('../models/eventOrgModel');
router.get('/',(req,res)=>{
eventOrgModel.find()
.exec()
.then(anythin=>{
    res.send(anythin);
})
})


module.exports=router;