
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');


//mongodb stuff
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
var local_database_name = 'milestone';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;

console.log(database_uri);
// local database
// mongoose.connect(database_uri);
// production database
mongoose.connect(database_uri);
//mongoose.connect('mongodb://heroku_app22389483:olvu5pv1ll0r0i5s6nkn7kfmma@ds033629.mongolab.com:33629/heroku_app22389483');


// Routes
var login = require('./routes/login');
var homescreen = require('./routes/homescreen');
var signUp = require('./routes/signup');
var addGoal = require('./routes/add-goal');
var addMilestone = require('./routes/add-milestone');
var help = require('./routes/help');
var settings = require('./routes/settings');
var data = require('./routes/data');
var menu = require('./routes/menu');
var chooseGoal = require('./routes/chooseGoal');


// all environments
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.loginView);
//app.get('/login/:success', login.loginView);
app.post('/',login.loginPost);
// Example route
// app.get('/users', user.list);
app.get('/signup' , login.signUpView);
app.post('/signup', login.signUpPost);

app.post('/logout', login.logOutPost);

app.get('/add-goal' , addGoal.view);
app.get('/add-milestone' , addMilestone.view);
app.get('/add-milestone/:goalname', addMilestone.view);
app.get('/help' , help.view);
app.get('/settings', settings.view);
app.get('/data' , data.getData)
app.get('/menu', menu.view);
app.get('/choose-goal', chooseGoal.view);
app.get('/homescreen' , homescreen.view);
app.get('/homescreen/:goalname',homescreen.view);
app.get('/home', homescreen.altView);
app.get('/home/:goalname', homescreen.altView);

app.post('/getms', data.getUserData);
app.post('/addgoal', data.addGoal);
app.post('/addmilestonepost', data.addMilestone);
app.post('/delgoal', data.deleteGoal);
app.post('/milestoneupdate', data.toggleMilestone);
app.post('/deletemilestonepost', data.deleteMilestone);

//experimental
app.post('/setTime', addMilestone.timePost);
app.post('/addEvent', data.addEvent);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
