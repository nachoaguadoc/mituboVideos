
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
// var db = require('./mdb/dataBase').db;
// var videosRegistry = require('./mdb/videosRegistry');
var config = require("./mitubo_config");


var partials = require('express-partials');
// var sessionController = require('./routes/session_controller.js');
// var postController = require('./routes/post_controller');
// var userController = require('./routes/user_controller.js');

var app = express();

var bodyParser = require('body-parser')
var videoController = require('./routes/video_controller.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('--Core Blog 2014--'));
app.use(express.session());
app.use(partials());

app.use(require('express-flash')());


// Helper dinamico:
app.use(function(req, res, next) {

   // Hacer visible req.session en las vistas
   res.locals.session = req.session;

   next();
});

app.use(app.router);
app.use(express.static(path.join('/mnt/nas')));
app.use(express.static(path.join(__dirname, 'public/videos')));



// Helper estatico:
app.locals.escapeText =  function(text) {
   return String(text)
          .replace(/&(?!\w+;)/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/\n/g, '<br>');
};




//-- Rutas -----------------

app.get('/getList', videoController.getList);


// Fichero o ruta no existente:
app.use(function(req,res,next) {
    next(new Error('Recurso '+req.url+' no encontrado'));
});

// Gestion de errores

if ('development' == app.get('env')) {
  // development
  app.use(function(err,req,res,next) {
    res.render('error', { message: err.message,
                          stack:   err.stack 
              });
  });
} else { 
  // produccion
  app.use(function(err,req,res,next) {
    res.render('error', { message: err.message,
                          stack:   null 
              });
  });
}


http.createServer(app).listen(config.mitubo.port, function(){
  console.log('Express server listening on port ' + config.mitubo.port);
});
