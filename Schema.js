var SchemaObject = require('node-schema-object');
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var index = require('./routes/index');
var router = express.Router();
var fs = require("fs");
var config = require('./routes/Schema1');
var url = require('url');
//var nodemon = require('nodemon');

var app = express();

var jwt = require('jsonwebtoken');
//var Expressjwt = require('express-jwt');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');
//var crypto = require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(nodemon());
//app.use(Expressjwt({secret:  'shhhhh'}).unless({path: ['/Cile','Micko/inf']}));

//app.set('superSecret', config.secret);
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//var token1 = jwt.sign({ foo: 'micko' }, {nesto : 'shhhhh'}, {expirationInMinutes: 60 * 5});
//var token = jwt.sign({ foo: 'micko' },'shhhhh', {expiresInMinutes: 1440 });
//var token1 = jwt.sign({ foo: 'micko' }, process.env.API_SECRETE);

 // var cert = fs.readFileSync('private.key'); 

/*console.log(token);
console.log(token1);*/

/*var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
console.log(older_token);*/
 
// Create User schema 
var User = new SchemaObject({
  firstName: String,
  lastName: String,
  birthDate: Date
});

var user = new User({firstName: 'Miroslav', lastName: 'Beronja', birthDate: 'August 11, 1992'});

var imePrezime = "M";
var ispisiToken = "u";
var brojac = 0,brojacOPTIONS = 0;

var passwordProba = 'Micko92';
//var hash1 = crypto.createHash('sha256').update(passwordProba).digest('base64');
//var hash = bcrypt.hashSync("bacon");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var salt = crypto.randomBytes(32).toString('base64'); 
var passwordPP = 'Micko1234';
var MojSalt = MojSalt;
//var hashProba = bcrypt.hashSync(bcrypt.genSaltSync(MojSalt));
//var hashProba = bcrypt.hashSync(passwordPP, bcrypt.genSaltSync(9));
var hashProba = bcrypt.hashSync(passwordPP, bcrypt.genSaltSync(8));
var hashBezSalt = bcrypt.hashSync(passwordPP);
//var saltPRoba =  bcrypt.genSaltSync(9);
var PrediSifre = bcrypt.compareSync(hashBezSalt, hashProba);
var PrediSifre1 = bcrypt.compareSync(passwordPP, hashProba);


//Access-Control-Allow-Origin
app.use(function (req, res, next) {

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

        if ( req.method === 'OPTIONS' ) {
            brojacOPTIONS++;
            console.log('OPTIONS SUCCESS',brojacOPTIONS);
            res.end();
            return;
        }
        else {
               
                brojac++;
                console.log("Usaooo",brojac);//other requests
        }

        next();
    } catch (e) {
        //console.log(e);
    }
});

/*
app.get('/Micko/zadati', function(req, resp) { //inf?ime=nesto
  
   
    
    connection.query("SELECT * FROM test_table ",function(error,rows,field) {
        
          if(error)
          {
            console.log('Error',error);
            resp.json('Error',error);
          }
          var rest = [];
            for(var ii in rows)
            {
              var empobj = rows[ii];
              rest.push(empobj);
            }
            resp.json(rest);
       
        });  

});

app.post('/Micko/zadati',function (req, resp) {
    
        var reqObj = req.body;

            var insertSQl = "INSERT INTO test_table SET ?";
            var insertValues = {
                 "ime" :  reqObj.ime,
                 "prezime" : reqObj.prezime
            };
            var query = connection.query(insertSQl,insertValues,function(error,result){

            if (error) {
                  console.log('Error',error.message);
                  
                  resp.status(500).send('Something broke!');


            }else {
                  console.log('Post uspesan');
                  resp.send('Post uspesan');
            }
        });
})*/

/*
app.get('/Micko/zadatii', function(req, resp) { //inf?ime=nesto
  
    var query = url.parse(req.url,true).query;
    var ime1 = query.ime;
   // console.log(ime1);

    var upit = "SELECT * FROM test_table as a where a.ime = ?";

        connection.query(upit,[ime1],function(error,rows,field) {
        //connection.query("SELECT * FROM test_table as a WHERE a.prezime = '" + prezime1 + "' or a.ime = '" + ime1 + "' ",function(error,rows,field) {
        if(error)
        {
            console.log('Error',error);
        }
        var rest = [];
        for(var ii in rows)
        {
           var empobj = rows[ii];
           rest.push(empobj);
        }
        resp.json(rest);
       
    });  

});
*/



function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','base64')
  crypted += cipher.final('base64');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var person = 0;
var pocetakNiz = 0;
var pocetakNiz1 = 0;
 var person2 = 0;
var pocetakNiz2 = 0;
var pocetakNiz12 = 0;
var PorediGlobalono = 0;

app.get('/Sifra1',function(req,res,next){
      
      res.send('Bravooo Cile');
     
})


//PROVERA TOKEN-A I SIFRE
app.get('/korisnici-transakciju/inf',function(req,resp){  

        var query = url.parse(req.url,true).query;
        var imePrijava = query.ime;
        var sifraPrijava = query.sifra;
       


  connection.beginTransaction(function(error) {

        var upit1 = "SELECT sifra FROM ProbaLogin as a where a.ime = ? or a.sifra = ?";
        
        connection.query(upit1,[imePrijava,sifraPrijava],function(error,rows,field) {
        //connection.query("SELECT * FROM test_table as a WHERE a.prezime = '" + prezime1 + "' or a.ime = '" + ime1 + "' ",function(error,rows,field) {
        if (error) { 
             connection.rollback(function() {
             throw error;
             });
        }
                connection.commit(function(error) {
                   if (error) { 
                          connection.rollback(function() {
                          throw error;
                      });
                  }
                  //console.log('Transaction Complete');
                      //connection.end();
             });
        // });
        if(error)
        {
            console.log('Error',error);
        }
        var rest = [];
        for(var ii in rows)
        {
           var empobj = rows[ii];
           rest.push(empobj);
        }
        //resp.send(rest);
                  //var person = 0;
                  //var pocetakNiz = 0;
                  //var pocetakNiz1 = 0;

                  person = JSON.stringify(rest);
                  
                  //var pocetak = str.substr(8)
                  pocetakNiz = person.substr(11);
                  //var pocetak1 = str.substr(8,pocetak.length - 2);
                  pocetakNiz1 = person.substr(11,pocetakNiz.length - 3);
                  //resp.send(pocetakNiz1);
                  //String
                   //console.log(pocetakNiz1);

         var PrediSifre12 = bcrypt.compareSync(String(sifraPrijava),String(pocetakNiz1)); 
         console.log(PrediSifre12);
         PorediGlobalono =  PrediSifre12;

        });
        var upit2 = "SELECT ime FROM ProbaLogin as a where a.ime = ? or a.sifra = ?";

        connection.query(upit2,[imePrijava,sifraPrijava],function(error,rows){
          
          if (error) { 
             connection.rollback(function() {
             throw error;
             });
          }
                  connection.commit(function(error) {
                   //console.log('3');
                   if (error) { 
                          connection.rollback(function() {
                          throw error;
                      });
                  }
                  //console.log('Transaction Complete');
                      //connection.end();
                  });
        
                 
                      if(error)
                      {
                           console.log('Error',error);
                      }
                         var rest = [];
                      for(var ii in rows)
                      {
                          var empobj = rows[ii];
                          rest.push(empobj);
                       }
                       
                             // var person2 = 0;
                             // var pocetakNiz2 = 0;
                             // var pocetakNiz12 = 0;

                              person2 = JSON.stringify(rest);
                  //var pocetak = str.substr(8)
                              pocetakNiz2 = person2.substr(9);
                  //var pocetak1 = str.substr(8,pocetak.length - 2);
                              pocetakNiz12 = person2.substr(9,pocetakNiz2.length - 3);
                              //resp.send(pocetakNiz1);
                   if(imePrijava == pocetakNiz12)
                    {
                        
                        if(PorediGlobalono)
                        {
                        console.log('Dobra je sve');
                        var token = jwt.sign({ime:pocetakNiz12, sifra:pocetakNiz1 }, 'shhhhh', {
                     //expiresInMinutes: 1440
                                expiresIn : 60*60*24//VReme isteka tokena
                                //expiresIn : 60
                                });
                 
                                resp.json({

                                    message: 'Napravio Token',
                                    Token: token

                                });
                         }
                         else{
                              
                              resp.send("Nije dobra Sifra");

                         }                                                                   
                  
                    }
                    else{

                                resp.send("Nije dobro Ime");

                    }
             });
        });
});

//Ne koristim i ne treba da se koristi
app.get('/PodaciKorisnika',function(req,resp,next){
   
    var query = url.parse(req.url,true).query;
    var imePrijava = query.ime;
    var sifraPrijava = query.sifra;
    //var PrediSifre1 = bcrypt.compareSync(passwordPP, hashProba);
    console.log(sifraPrijava);

    var upit = "SELECT sifra FROM ProbaLogin as a where a.ime = ? or a.sifra = ?";

        connection.query(upit,[imePrijava,sifraPrijava],function(error,rows,field) {
        //connection.query("SELECT * FROM test_table as a WHERE a.prezime = '" + prezime1 + "' or a.ime = '" + ime1 + "' ",function(error,rows,field) {
        if(error)
        {
            console.log('Error',error);
        }
        var rest = [];
        for(var ii in rows)
        {
           var empobj = rows[ii];
           rest.push(empobj);
        }
        //resp.send(rest);
                  var person = 0;
                  var pocetakNiz = 0;
                  var pocetakNiz1 = 0;

                  person = JSON.stringify(rest);
                  
                  //var pocetak = str.substr(8)
                  pocetakNiz = person.substr(11);
                  //var pocetak1 = str.substr(8,pocetak.length - 2);
                  pocetakNiz1 = person.substr(11,pocetakNiz.length - 3);
                  resp.send(pocetakNiz1);
                  //String

         var PrediSifre12 = bcrypt.compareSync(String(sifraPrijava),String(pocetakNiz1)); 
         console.log(PrediSifre12);
         if(PrediSifre12)
         {

         }
         else
         {

         }
         
    });  
})

app.post('/PrijavaKorisnika',function(req,res,next){
     
          var reqObj = req.body;

          //var insertSQl = "INSERT INTO ProbaLogin SET ?";
          var insertValues = {

                 "ime" :  reqObj.ime,
                 "sifra" : reqObj.sifra
          };

          var sifra1 = insertValues.sifra;
          
          var hashSifra1 = bcrypt.hashSync(sifra1, bcrypt.genSaltSync(8));
          //console.log(hashSifra1);  

         // var query = connection.query('call PrijavaLogin('+insertValues.ime+','+insertValues.sifra+')',function(error,result){
            var query = connection.query(  "call PrijavaLogin('"+insertValues.ime+"','"+hashSifra1+"')",function(error,result){
            if (error) {
                  console.log('Error',error.message);
                  
                  res.status(500).send('Something broke!');


            }else {

                  //console.log('USPESNA PRIJAVA NA SERVER');
                  res.send('USPESNA PRIJAVA NA SERVER');
                  
            }
        });
})
 
var KoristiToken1 = Proba = function(req, res, next) {
    try {
        

        var bb = req.headers.authorization.split(' ')[0] === 'Bearer';
        

        if (req.headers.authorization && bb) {
            var token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            jwt.verify(token,'shhhhh', function(err, decoded) {			
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });		
                } else {
                    req.decoded = decoded;	
                    ispisiToken = req.decoded;
                    //console.log(ispisiToken);
                    next();
                    }
                });
        } else {
            res.send('Nije dobroo breee');
        }
    } catch (e) {
        console.log("ex:", e);
    }
}

app.use(KoristiToken1);

app.get('/Sifra',function(req,res,next){
      
      res.send('Bravooo Micko');
      //if(hashProba == MojSalt)
     // {
     //   console.log('Usaooooo');
     // }
      //res.send(passwordPP + '    '+ hashProba + '    ' + '   '+hashBezSalt + '    ' + VratiPravuSifru);
       //res.send(saltPRoba + '   ' +  VratiPravuSifru1);
       // res.send(passwordPP + '  ' + hashProba + '   ' + PrediSifre1);

      //res.send(encrypt('Micko1992') + 'dekodiranje' + decrypt(encrypt('Micko1992')));
      

      //res.send('SALT'+'  '+salt);


      //console.log(decrypt('2987d79b2e'));
     // var hash = bcrypt.hashSync("bacon");
     // console.log(hash);
      //res.send(hash1);
      //if(hash1 = passwordProba)
      //{
      //        console.log('Usaooo');
      //}

     // console.log(crypto.compare('Micko92', hash1 ));
})

app.get('/Micko/zadati', function(req, resp) { //inf?ime=nesto
  
     resp.json("Zadati");
   

});

app.get('/Micko/Ispisi-test_table', function(req, resp) { //inf?ime=nesto
  
    connection.query("SELECT * FROM test_table ",function(error,rows,field) {
        
          if(error)
          {
            console.log('Error',error);
            resp.json('Error',error);
          }
          var rest = [];
              for(var ii in rows)
              {
                  var empobj = rows[ii];
                  rest.push(empobj);
              }
              resp.json(rest);
        });  
});

app.get('/Cile', function(req, res, next) {
  
      var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
      res.json(token);

});

var Proba = function(req, res, next) {

    console.log('Micko');
    //imePrezime = 'Juhu';
    //var dodati = 'Juhu1';
    var dodati = 0;
    
    //var token = req.body.token || req.param('token') || req.headers['x-access-token'] ||  req.headers['authorization'] || req.headers.authorization.split(' ')[0] === 'Bearer';
    var bb = req.headers.authorization.split(' ')[0] === 'Bearer';
    //console.log(bb);
    //var token = req.headers.authorization; //&& req.headers.authorization.split(' ')[0] === 'Bearer';
     //var token = req.headers.authorization && bb; 
     if(req.headers.authorization && bb)
     {
         //console.log(req.headers.authorization.split(' ')[1]);
         var token = req.headers.authorization.split(' ')[1];
     }

    if(token){


    jwt.verify(token,'shhhhh', function(err, decoded) {			
			 if (err) {
				 return res.json({ success: false, message: 'Failed to authenticate token.' });		
			 } else {
				
				 req.decoded = decoded;	
         ispisiToken = req.decoded;
         //console.log(ispisiToken);
				 next();

			 }
		 });
   }else{

      res.send('Nije dobroo breee');

   }

};

app.use(Proba);

app.get('/Micko/inf', function(req, res) { //inf?ime=nesto

  res.json(ispisiToken);

});






/*var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});*/


/*app.get('/M/:ime2', function(req, res, next) {
  //var err = new Error();
  //err.status = 404;
  //next(err);
  ime1 = req.params.ime2;
  console.log(ime1);
 // var ime = 'Micko';
 //next(ime);
  next(ime1);
});*/

/*app.post('/Ma', function(req, res, next) {
  
    var reqObj = req.body;

    var insertValues = {

                 "ime" :  reqObj.ime
   };

  var ime1 = insertValues.ime
    //next(ime1);
});*/


//module.exports = router;



/*
app.post('/Schema',function(req,resp){

     var token = jwt.sign({ foo: 'micko' },'shhhhh', {expiresIn : 60*60*24});
     //var token = req.app.get('jwtTokenSecret');
     //var token = jwt.sign({ime: 'micko',password: '1234'}, app.get('superSecret')  , {expiresIn : 60*60*24});
     jwt.verify(token, app.get('superSecret')  , function(err, decoded) {
         console.log(''+decoded.ime+','+decoded.password); // bar
     });
     
     resp.send(''+token);

})

app.get ('/Izbaze',function(req,resp){

    connection.query("SELECT * FROM test_table ",function(error,rows,field) {
        
          if(error)
          {
            console.log('Error',error);
            resp.json('Error',error);
          }
          var rest = [];
            for(var ii in rows)
            {
              var empobj = rows[ii];
              rest.push(empobj);
            }
            resp.json(rest);
       
        });  

})
*/
/*
function Ispis(){
   console.log(user); 
   
}

function Ispis1(){
    var user1 = new User({firstName: 'Miroslav', lastName: 'Beronja', birthDate: 'August 11, 1992'});
   // console.log(user1.firstName); 
  
    return user1.firstName + user1.lastName + user1.birthDate;
}

function Sabiranje(a, b){
    var c = 0;
    c = a + b;
    return c;
}
*/
var connection = mysql.createConnection({
    //connectionLimit: 50,
    host     : 'localhost',
    user     : 'Micko1992',
    password : 'chelsea1234',
    database : 'test_schema',
    micko : console.log('ConekcijaBaza')
});

var server = app.listen(3030, function () {

  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port);

})