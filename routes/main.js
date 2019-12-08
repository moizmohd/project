const express=require('express');
const router =express.Router();

router.get('/:username',function(req,res){
   var logusername=req.params.username
   // res.json(anythin).status(200);
   console.log(" i am RENDERING THE LOGIN PAGE AGAIN FOR"+logusername)
   res.render('login',{logusername:logusername}).status(200);
    // res.render('OTHERS',{username:req.params.username}).status(200);
})
router.get('/event/:username',function(req,res){
    var logusername=req.params.username
    // res.json(anythin).status(200);
    console.log(" i am RENDERING THE LOGIN PAGE AGAIN FOR"+logusername)
    res.render('event',{logusername:logusername })
     // res.render('OTHERS',{username:req.params.username}).status(200);
 })

module.exports=router
