
/**
 * Module dependencies.
 */

var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var privateKey  = fs.readFileSync('../certs/lettersafe.in.key', 'utf8');
var certificate = fs.readFileSync('../certs/lettersafe.in.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('lettersafe.secret'));
app.use(express.session({secret: "lettersafe.secret"}));
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

MongoClient.connect('mongodb://127.0.0.1:27017/lettersafe', function(err, db) {
	if(err) throw err;
  var routes = require('./routes')(db);
  var user = require('./routes/user')(db);
  var emails = require('./routes/emails')(db);

  //app.get('/', routes.index);
  app.get('/', function(req, res){res.sendfile(path.resolve(__dirname, 'app/index.html'))});
  
  app.get('/login', user.login);
  app.post('/login', user.postLogin);
  app.get('/register', user.register);
  app.post('/register', user.postRegister);
  app.get('/emails.json', emails.json);
  app.get('/testemail', routes.gettestemail);
  app.post('/testemail', routes.posttestemail)
  app.get('/send', routes.send)
  app.post('/send', routes.sendpost)
  app.get('/debug', function(req,res){
    res.json(req.session);
  })
  https.createServer(credentials, app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

});