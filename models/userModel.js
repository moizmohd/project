const mongoose=require('mongoose');
var bcryptjs = require('bcryptjs');

const userSchema=mongoose.Schema({
    _id :mongoose.Schema.Types.ObjectId,
    userName : {type:String,required:true,unique:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    phoneNumber : {type:Number,required:true},
    city: {type:String,required:true},
    instrument : {type:String,required:true},
    genre: {type:String,required:true},
    level : {type:String,required:true},
    
});




userSchema.statics.authenticate =function(userName,password,callback){
    User.findOne({userName:userName})
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcryptjs.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

userSchema.pre('save',function(next){
    var user=this;
    bcryptjs.hash(user.password, 10, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      })
    });

var User =mongoose.model('User',userSchema);
module.exports=User;