const express=require('express')
const router=express.Router();
const eventModel=require('../models/eventModel');
router.get('/',(req,res)=>{
    eventModel.find()
    .exec()
    .then(anythin=>{
        res.send(anythin).status(200);
    })
    })

 router.get('/eventForm',(req,res)=>{
        res.render('eventForm').status(200);
        })
module.exports=router;