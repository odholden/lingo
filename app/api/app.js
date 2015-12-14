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
    cors           = require("cors");

var port   = process.env.PORT || 3000,
    router = express.Router(),
    app    = express();

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
app.use(passport.session()); 

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  })
);

app.use(function(req, res, next){
  global.currentUser = req.user;
  next();
})

app.use("/", router);

var routes = require("./config/routes");
app.use("/api", routes);

app.listen(3000);
console.log("hearing ya loud");
 