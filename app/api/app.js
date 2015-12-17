var express        = require("express"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    morgan         = require("morgan"),
    cookieParser   = require("cookie-parser"),
    bodyParser     = require("body-parser"),
    session        = require("express-session"),
    methodOverride = require("method-override"),
    jwt            = require("jsonwebtoken"),
    expressJWT     = require("express-jwt"),
    path           = require("path"),
    cors           = require("cors"),
    app            = express();


var http           = require("http"),   
    server         = http.createServer(app),
    port           = process.env.PORT || 3000;


var config  = require("./config/config"),
    secret  = require("./config/config").secret,
    User    = require("./models/user"),
    Chat    = require("./models/chat"),
    Message = require("./models/message");

mongoose.connect(config.database);
require("./config/passport")(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  })
);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

var routes = require('./config/routes');
app.use("/api", routes);

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
})

server.listen(port);
console.log('Server started on ' + port);

var io = require('socket.io')(server);

io.on('connect', function(socket){
  console.log("socket connected");
  socket.on('chat message', function(msg){
    console.log(msg);
    socket.emit('chat message', msg);
  });
});
