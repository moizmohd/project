const mongoose=require('mongoose');

const audioSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName : {type:String,required:true},
    audioLink : {type:String,required:true}
    
})

var Audio =mongoose.model('Audio',audioSchema);
module.exports=Audio;