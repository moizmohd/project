const express=require('express');
const router =express.Router();
const mongoose=require('mongoose');
//const bcryptjs=require('bcryptjs');
const eventOrgModel=require('../models/eventOrgModel');



router.post('/',function(req,res,next){

    if( req.body.userName &&
        req.body.email &&
        req.body.password &&
        req.body.phoneNumber &&
        req.body.city 
       
        ){
    const neweventOrg= new eventOrgModel({
        _id: new mongoose.Types.ObjectId(),
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        city:req.body.city,
       
 });
 



 eventOrgModel.find({email:req.body.email})
 .exec()
 .then(users=>{
     if(users.length>0){
        wrong="Account Already Exists";

        res.render('regEvent',{messages:wrong });         }
     else{
         
 eventOrgModel.find({userName:req.body.userName})
 .exec()
 .then(user=>{
     if(user.length>0){
        wrong="Account Already Exists";

        res.render('regEvent',{messages:wrong });         }
     else{
         neweventOrg.save();
         wrong=false;

         res.render('loginEvent',{messages:wrong} );
     }
 });
     }
 });
}

else if (req.body.loguserName && req.body.logpassword){
    eventOrgModel.authenticate(req.body.loguserName, req.body.logpassword,function(error,eventOrgModel){
        if(error ||!eventOrgModel){
              
            var wrong="Wrong Username or Password ";
            return res.render('loginEvent',{messages:wrong});
         }
        else{
             wrong=false;
            logusername=req.body.loguserName;
             res.render('event',{message:wrong,logusername:logusername });
    
         }

});

}
else if(req.body.loguserName ||req.body.logpassword){
    wrong="Please fill all the fields";

    res.render('loginEvent',{messages:wrong });
}
else {
   wrong="Please fill all the fields";

    res.render('regEvent',{messages:wrong });

}


});
// router.get('/profile', function (req, res, next) {
//     userModel.findById(req.session.userId)
//       .exec(function (error, user) {
//         if (error) {
//           return next(error);
//         } else {
//           if (user === null) {
//             var err = new Error('Not authorized! Go back!');
//             err.status = 400;
//             return next(err);
//           } else {
//             return res.render('login');
//           }
//         }
//       });
//   });
// userModel.find()
//                 .exec()
//                 .then(array=>
//                     {let citi = userModel.city;
//                    // res.json(array).status(200);
//                    res.render('login',{cities:citi});}
            
//                 )
//                 //var logusername=req.body.loguserName;

//                 //req.session.userId = userModel._id;
//                 //return res.send("login");
                
//              }

// });


module.exports =router;