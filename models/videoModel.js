const mongoose=require('mongoose');

const videoSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName : {type:String,required:true},
    videoLink : {type:String,required:true}
    
})

var Video =mongoose.model('Video',videoSchema);
module.exports=Video;