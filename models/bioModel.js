const mongoose=require('mongoose');

const bioSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName : {type:String,required:true},
    bio : {type:String,required:true}
    
})

var userbio =mongoose.model('userbio',bioSchema);
module.exports=userbio;