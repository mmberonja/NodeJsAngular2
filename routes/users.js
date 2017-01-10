var express = require('express');
var router1 = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var url = require('url');
//var datetime = require('node-datetime');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');

/*router1.use(function (req, res, next) {

    try {
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'Accept,\
			  Content-Type,\
			  Content-Length,\
			  Accept-Encoding,\
			  X-CSRF-Token,\
			  Authorization');
                                                    
        res.setHeader('Access-Control-Allow-Credentials', true);

       

        next();
    } catch (e) {
        //console.log(e);
    }

});*/
/* GET users listing. */
router1.get('/hu', function(req, resp, next) {
  //res.send('respond with a resource');
  resp.json("Micko")
});

router1.get('/Sifra1234',function(req,resp,next){
      
        //resp.json((new Date).getFullYear());
        resp.json("Micko");
        return next();
})

module.exports = router1;
