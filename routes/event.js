const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const eventModel=require('../models/eventModel');
router.get('/',(req,res)=>{
eventModel.find()
.exec()
.then(anythin=>{
    res.send(anythin);
})
})


router.post('/',function(req,res,next){

    
    const newEvent= new eventModel({
        _id: new mongoose.Types.ObjectId(),
        userName:req.body.userName,
        eventName:req.body.eventName,
        eventLocation:req.body.eventLocation,
        eventType:req.body.eventType,
        Salary:req.body.Salary,
        Status:req.body. Status,
        Contact:req.body. Contact,


 });


 eventModel.find({eventName:req.body.eventName})
 .exec()
 .then(user=>{
     if(user.length>0){
        wrong="Account Already Exists";

        res.render('eventForm',{messages:wrong }); 
        }
     else{
         newEvent.save();
         wrong=false;
         var logusername=req.body.loguserName


        res.render('event',{messages:wrong,logusername:logusername} );
     }
 });




});



module.exports=router;


// const userModel=require('../models/userModel');
// router.get('/',function(req,res){
  
//     userModel.find({instrument:"guitar"})
//     .exec()
//     .then(anythin=>{
//    // res.json(anythin).status(200);
//     res.send(anythin);
// })});