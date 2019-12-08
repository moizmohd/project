const mongoose=require('mongoose');
const eventSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:{type:String,required:true},
    eventName:{type:String,required:true},
    eventLocation:{type:String,required:true},
    eventType:{type:String},
    Salary:{type:Number,required:true},
    Status:{type:String,required:true},
    Contact:{type:Number,required:true}
})
module.exports=mongoose.model('event',eventSchema);