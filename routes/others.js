const express=require('express');
const router =express.Router();

router.get('/:username',function(req,res){
      
   // res.json(anythin).status(200);
    res.render('OTHERS',{username:req.params.username}).status(200);
})
module.exports=router
