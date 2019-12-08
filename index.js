const express  = require('express');
const morgan =require('morgan');
const port=3020;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const app=express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const eventModel=require('./models/eventModel');


app.set('view engine','ejs');
app.set('views', __dirname + '/views');
var mongoose=require('mongoose');
const parser =require('body-parser');
const user=require('./routes/users'); 
const guitar=require('./routes/guitar');
const drum=require('./routes/drum');
const keyboard=require('./routes/keyboard');
const vocals=require('./routes/vocals');
const bass=require('./routes/bass'); 
const profile=require('./routes/profile');
const others=require('./routes/others')
const main=require('./routes/main')
const event=require('./routes/event')
const eventOrg=require('./routes/eventOrgs'); 
const eventprof=require('./routes/eventprof'); 
const newEvent=require('./routes/newEvent')
var db = mongoose.connection;







app.use('*',function(req,res,next){
      res.set('Access-Control-Allow-Origin','*');
      res.set('Access-Control-Allow-Headers','content-type');
       next();
     });


mongoose.connect("mongodb+srv://moiz66:moiz66@mycluster-jbqhd.mongodb.net/test?retryWrites=true",function(err){
    if(err){
        console.log(err);
    
      }
      else{
        console.log("Atlas conected");
      }
    
    });


    app.get('/',function(req,res){
    
      res.render('login_registration').status(200);
  });


  var chatSchema=mongoose.Schema({
    username:String,
    event:String,
    msg:String,
    created:{type:Date,default:Date.now}
});
var chat=mongoose.model('Message',chatSchema);





io.sockets.on('connection', function(socket) {


  socket.on('username', function(username) {
      socket.username = username;
      




   });
  socket.on('event', function(event) {
      socket.event = event;

    //   productModel.find()
    //   .exec()
    //   .then(array=>{
    //      // res.json(array).status(200);
    //      res.render('saamaan',{products:array});
  
    //   })

    //   function(err,docs){
    //     if (err) throw err;
        
    //     //console.log(docs);
    //     socket.emit('load old msgs',docs);
    // });
      
   eventModel.find({eventName:event})
   .exec()
      .then(arr=>{
        if(arr.length>0){

          chat.find({event:event},function(err,docs){
            if(err) throw err;
             
            socket.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
            socket.emit('load old msgs',docs);
          })
        }

      
      else{
        var errmsg="Event does not exists"
        socket.emit('event-error',errmsg);
      }
      
      });



  });

  socket.on('disconnect', function(username) {

      //io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', function(message) {
      var newMsg=new chat({username:socket.username,event:socket.event,msg:message});
      newMsg.save(function(err){
          if(err)
          console.log(err);

      io.emit('chat_message', {username:socket.username,event:socket.event,msg:message});

      });
  });

});



  app.get('/chat/:username',function(req,res)
  {
    //var loguser=req.body.loguser;
  // console.log(username);
   var username=req.params.username;
   //var chater=req.params.chater;

    res.render('chat',{username:username});
  });

  app.get('/regUser',function(req,res){
    res.render('regUser')
  });
  app.get('/loginUser',function(req,res){
  
    res.render('loginUser');
    });
    app.get('/regEvent',function(req,res){
  
      res.render('regEvent');
      });
      app.get('/loginEvent',function(req,res){
  
        res.render('loginEvent');
        });


    app.use(session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: db
      })
    }));


    app.use(morgan('dev'));
    app.use(parser.json());
    app.use(parser.urlencoded({extende:true})); 
    app.use('/users',user);

app.use('/guitar',guitar);
app.use('/drum',drum);
app.use('/keyboard',keyboard);
app.use('/vocals',vocals);
app.use('/bass',bass);
app.use('/profile',profile);
app.use('/others',others);
app.use('/main',main)
app.use('/event',event)
app.use('/newEvent',newEvent);
app.use('/eventOrgs',eventOrg);
app.use('/eventprof',eventprof);


    http.listen(port,function(){
        console.log(`Server listening on ${port}`);
    });