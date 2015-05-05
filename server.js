/**
* @description Module and archives used by the server
* @author Adrián Sánchez <sesamaua@gmail.com>
*/


var express = require('express'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
	nodemailer = require('nodemailer');
 
var app = express();

var transporter  = nodemailer.createTransport({
   service: 'Gmail',  // sets automatically host, port and connection security settings
   auth: {
       user: 'adriansanchez.logn@gmail.com',
       pass: 'Technergy14AMSS'
   },
   tls: {
       rejectUnauthorized: false
   }
});
 
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
app.use(express.static(__dirname + '/app'));

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports.logger = logger;

app.post('/email', function (req, res) {
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'sesamaua@gmail.com', // receiver
     subject: 'ImagineXYZ: Desde la pagina web - Fecha: ' + fecha, // subject
     text: 'Correo: ' + req.body['email'] + '. \n'+ 'Nombre: ' + req.body['name'] + '. \n' + 'Texto: ' + req.body['text'] // body
     };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      res.send(400);
    }else{
      res.send(200);
    }
  });
});

app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');
