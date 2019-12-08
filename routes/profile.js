const express=require('express');
const mongoose=require('mongoose');


const router=express.Router();
const userModel=require('../models/userModel');
router.get('/',function(req,res){
  
    userModel.find()
    .exec()
    .then(anythin=>{
   // res.json(anythin).status(200);
    res.send(anythin).status(200);
})});

router.get('/audio',function(req,res){
    audioModel.find()
    .exec()
    .then(anythin=>{
        res.send(anythin).status(200);
    })
})
router.get('/video',function(req,res){
    videoModel.find()
    .exec()
    .then(anythin=>{
        res.send(anythin).status(200);
    })
})
router.get('/bio',function(req,res){
    bioModel.find()
    .exec()
    .then(anythin=>{
        res.send(anythin).status(200);
    })
})

const audioModel=require('../models/audioModel');
const videoModel=require('../models/videoModel');
const bioModel=require('../models/bioModel');
router.post('/',function(req,res,next){

    if( req.body.userName &&
        req.body.audioLink 
        
    ){
        const newAudio= new audioModel({
            _id:mongoose.Types.ObjectId(),
            userName:req.body.userName,
            audioLink:req.body.audioLink
            
    });
    newAudio.save();
    res.send('audio created').status(200);
    }
});


router.post('/video',function(req,res,next){

    if( req.body.userName &&
        req.body.videoLink 
        
    ){
        const newVideo= new videoModel({
            _id:mongoose.Types.ObjectId(),
            userName:req.body.userName,
            videoLink:req.body.videoLink
            
    });
    newVideo.save();
    res.send('video created').status(200);
    }
});

router.post('/bio',function(req,res,next){

    if( req.body.userName &&
        req.body.bio 
        
    ){
        const newbio= new bioModel({
            _id:mongoose.Types.ObjectId(),
            userName:req.body.userName,
            bio:req.body.bio
            
    });
    newbio.save();
    res.send('bio created').status(200);
    }
});





module.exports=router;