
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
let middleware=(req, res, next)=>{
console.log(req.method+" "+req.path+" - "+req.ip);
}
app.use(middleware);


// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello world");

/** 2) A first working Express Server */
/*
app.get('/',(req,res)=>{
        res.send('Hello Express');
        }); */

/** 3) Serve an HTML file */
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
        /* Commented out for next exercise to work
app.get('/json', (req, res)=>{
res.json({"message": "Hello json"});
});  */

/** 6) Use the .env file to configure the app */
let newJSONMessage = "Hello json";
 // const messageStyle = process.env.MESSAGE_STYLE; MESSAGE_STYLE declared as global variable to remain constant  
app.get('/json', (req, res)=>{
  const messageStyle = process.env.MESSAGE_STYLE;  // For purposes of this exercise, MESSAGE_STYLE was declared inside get request to pass the freeCodeCamp tests
  if (messageStyle=='uppercase'){
  newJSONMessage = newJSONMessage.toUpperCase(); 
 res.json({"message": newJSONMessage});
    //console.log(req);
} else {
res.json({"message": "Hello json"});
}
});
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', (req,res,next)=>{
  req.time=new Date().toString();
  next();
}, (req,res)=>{
res.json({time: req.time});  // router handler
});


/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res)=>{
res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/*
app.route('/name').get((req,res)=>{
  res.json({name: req.query.first + " "+req.query.last});
}); */
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
// app.use(bodyParser.urlencoded({extended:false}));  Working middleware is above

/** 12) Get data form POST  */
app.route('/name').get((req,res)=>{
  res.json({name: req.query.first + " "+req.query.last});
}).post((req, res)=>{
//  console.log(req.body.first);
  res.json({name: req.body.first + " "+req.body.last});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
