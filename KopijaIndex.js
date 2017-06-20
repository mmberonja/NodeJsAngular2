var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var config = require('./Schema1');
var app = express();

/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Tech Geek KD' });
});*/
var connection = mysql.createConnection({
    //connectionLimit: 50,
    host     : 'localhost',
    user     : 'Micko1992',
    password : 'chelsea1234',
    database : 'test_schema',
    micko : console.log('ConekcijaBaza')
});


app.set('superSecret', config.secret);

router.get('/a',  (req,resp) => {
     resp.send('Micko');

});

//app.router('/korisnici')
router.get('/korisnici',(req,resp) => {
        
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

router.post('/korisnici',function (req, resp) {
    
        var reqObj = req.body;

            var insertSQl = "INSERT INTO test_table SET ?";
            var insertValues = {
                 "ime" :  reqObj.ime,
                 "prezime" : reqObj.prezime
            };
            var query = connection.query(insertSQl,insertValues,function(error,result){

            if (error) {
                  console.log('Error',error.message);
                  
                  res.status(500).send('Something broke!');


            }else {
                  console.log('Post uspesan');
            }
        });
})

router.get('/korisnici/zadati',function (req, resp){//http://localhost:8080/korisnici/inf?prezime=bb&ime=micko

    var query = url.parse(req.url,true).query;
    var ime1 = query.ime;
    var prezime1 = query.prezime;

    var upit = "SELECT * FROM test_table as a where a.ime = ? or a.prezime = ?";

        connection.query(upit,[ime1,prezime1],function(error,rows,field) {
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
        resp.send(rest);
       
    });  
})    

router.get('/korisnici/:imena',function (req, resp){

      ime1 = req.params.imena;
      prezime1 = req.params.imena;
      
        connection.query("SELECT * FROM test_table as a WHERE a.ime = '" + ime1 +"'" + "or a.prezime = '" +prezime1+ "'" ,[ime1],function(error,rows,field) {
          //console.log(ime1);
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
          resp.send(rest);
       
    });  
})

router.put('/korisnici/:imena',function (req, resp){

          var reqObj = req.body;
          ime1 = req.params.imena;
         //console.log(ime1);

         var insertSQl = 'UPDATE test_table SET ime = ? where ime = ?';
         var insertValues = {
           "ime" :  reqObj.ime,
           "prezime" : reqObj.prezime
         };
            // console.log(insertValues.ime);

          //var query = connection.query('UPDATE test_table SET ? where ime = '+ime1+'',insertValues,function(error,result){
          var query = connection.query(insertSQl,[insertValues.ime,ime1],function(error,result){
          //var query = connection.query("UPDATE test_table SET ime = '"+insertValues.ime+"' where ime = '" +ime1+"'",function(error,result){
          //console.log(ime1);
             if (error) {
                   console.log('Error',error.message);
             }else {
                   console.log('PUT uspesan');
             }
       });
})

router.delete('/korisnici/:imena',function (req, resp){

       ime1 = req.params.imena;
         
      var insertSQl = "DELETE FROM test_table WHERE ime = ?";
      var query = connection.query(insertSQl,ime1,function(error,result){

         if (error) {
            console.log('Error',error.message);
         }else {
            console.log('DELETE uspesno');
         }
      });
});

router.get('/korisnici-dodati-kolonu/:kolona',function (req, resp){
        kolonA = req.params.kolona;
   
             var query = connection.query('ALTER '+' table test_table '+' ADD ( '+ kolonA +' VARCHAR(255))',function(error,result){

             if(error){
                      console.log("ERROR:"+error.message);
             }
             else{
                  console.log("Dodata nova kolona");
             }

         });
});

router.delete('/korisnici-brisati-kolonu/:kolona',function (req, resp){

   kolonA = req.params.kolona;

        var query = connection.query('alter table test_table drop column '+kolonA+' ',function(error,result){
    //var Stavlja1 = result.insertid;
    //resp.json({"sasa":result});
        if(error){
             console.log("ERROR:"+error.message);
        }
        else{
             console.log("Obrisana Kolona");
        }

  });
});

router.get('/korisnici-transakciju/inventar-sve',function(req,resp){
    
      
      connection.query('select* from inventar',function(error,result){

      var rest = [];
            for(var ii in result)
            {
              var empobj = result[ii];
              rest.push(empobj);
            }
            resp.json(rest);
      });
});

router.get('/korisnici-transakciju/:inventar',function(req,resp){
    
      broj = req.params.inventar;
      
     upit = 'SELECT * FROM inventar where opis = ?';

      connection.query(upit,broj,function(error,result){

      var rest = [];
            for(var ii in result)
            {
              var empobj = result[ii];
              rest.push(empobj);
            }
            resp.json(rest);
      });
});

router.get('/korisnici-transakciju/:inventar/:br',function(req,resp){
       
    connection.beginTransaction(function(error) {
     if (error) { 
       throw error; 
    }
        var reqObj = req.body;
        ime = req.params.inventar;
        broj = req.params.br;

        var upit1 = 'UPDATE inventar SET kolicina = kolicina - ? WHERE opis = ?';

        var insertValues = {
              "id": reqObj.id,
              "opis": reqObj.opis,
              "kolicina": reqObj.kolicina
         };

        connection.query(upit1,[broj,ime],function(error,result){
         //connection.query('UPDATE inventar SET kolicina = kolicina - 5 WHERE id = 3',function(error,result){
          if (error) { 
             connection.rollback(function() {
             throw error;
             });
          }
           connection.commit(function(error) {
                   console.log('3');
                   if (error) { 
                          connection.rollback(function() {
                          throw error;
                      });
                  }
                  console.log('Transaction Complete');
                      //connection.end();
             });
         });
        connection.query('UPDATE inventar SET kolicina = kolicina + 5 WHERE id = 2',function(error,result){
        if (error) { 
             connection.rollback(function() {
             throw error;
             
             });
        }
                  connection.commit(function(error) {
                   console.log('3');
                   if (error) { 
                          connection.rollback(function() {
                          throw error;
                      });
                  }
                  console.log('Transaction Complete');
                      //connection.end();
             });
         });

    });
});

//Treba testirati i jos nesto dodati
router.put('/korisnici-transakciju/:inventar/:br',function(req,resp){
       
    connection.beginTransaction(function(error) {
     if (error) { 
       throw error; 
    }
        var reqObj = req.body;
        ime = req.params.inventar;
        broj = req.params.br;

        var upit1 = 'UPDATE inventar SET kolicina = kolicina - ? WHERE opis = ?';
        var nesto =  insertValues.kolicina;


        var insertValues = {
              "id": reqObj.id,
              "opis": reqObj.opis,
              "kolicina": reqObj.kolicina
         };

        connection.query(upit1,[insertValues.kolicina,ime],function(error,result){
         //connection.query('UPDATE inventar SET kolicina = kolicina - 5 WHERE id = 3',function(error,result){
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
                  console.log('Transaction Complete');
                      //connection.end();
             });
         });
        connection.query('UPDATE inventar SET kolicina = kolicina + 5 WHERE id = 2',function(error,result){
        if (error) { 
             connection.rollback(function() {
             throw error;
             });
        }
                  connection.commit(function(error) {
                   console.log('3');
                   if (error) { 
                          connection.rollback(function() {
                          throw error;
                      });
                  }
                  console.log('Transaction Complete');
                      //connection.end();
             });
         });

    });
});

//ODAVDE POCINJE ZA PROJEKAT IZNAD JE VEZBANJE
router.post('/ProbaTOKEN',function(req,resp){
          
          var reqObj = req.body;
          
          var insertSQl = "SELECT ime FROM tabela_korisnici";
          var insertValues = {
                 "ime" :  reqObj.ime,
                 "prezime" : reqObj.prezime
          };
            
          //console.log(insertValues.ime);

          connection.query(insertSQl,function(error,rows,field) {

          if(error){

                   console.log('Error',error);
                   resp.json('Error',error);

          }
          var rest = [];
          var brojac = 0;
          for(var ii in rows)
          {
              var empobj = rows[ii];
              rest.push(empobj);
              brojac++;
          }

                  var person = [];
                  var pocetakNiz = [];
                  var pocetakNiz1 = [];

              //resp.json(rest);
              //console.log(rest.length);
              for(var z = 0; z < rest.length ; z++)
              {
                  
                  //var str = JSON.stringify(rest[2])
                  person[z] = JSON.stringify(rest[z]);
                  //var pocetak = str.substr(8)
                  pocetakNiz[z] = person[z].substr(8)
                  //var pocetak1 = str.substr(8,pocetak.length - 2);
                  pocetakNiz1[z] = person[z].substr(8,pocetakNiz[z].length - 2);
                 
                 
              }
                       
          for(var i = 0;i<brojac;i++)
          {
              if(insertValues.ime == pocetakNiz1[i])
              {
                  console.log('Ima u bazi');
                  //resp.send('Korisnik postoji');
              }
              else{

                  // console.log('Nema u bazi');
                 // resp.send('Nemaaaaaa');
              }
          }
          
         // if(insertValues.ime == imeKorisnika1){
            if(insertValues.ime){

               console.log('Usaooo');

               //if(insertValues.prezime == prezimeKorisnika1){
               if(insertValues.ime){

                   console.log('Usaooo');

                // var token = jwt.sign({ime:insertValues.ime, prezime:insertValues.prezime }, app.get('superSecret'), {
                var token = jwt.sign({ime:insertValues.ime, prezime:insertValues.prezime }, 'shhhhh', {
                     //expiresInMinutes: 1440
                     expiresIn : 60*60*24
                });
                 
                 resp.json({

                     message: 'Napravio Token',
                     Token: token

                 });

               }
               else{
                          
                      resp.send('Nije dobro prezime');   

               }
          }
          else{

               console.log('Nijeeeee');
               resp.send('Nesto nije dobro bree');
          }
          
        });  
});

var KoristiToken = function(req, res, next) {

     var bb = req.headers.authorization.split(' ')[0] === 'Bearer';

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
}

router.use(KoristiToken);

router.get('/ProbaTOKEN/ispisTOKENA', function(req, res) { //inf?ime=nesto

       res.json(ispisiToken);

});

router.get('/micko/tabelaKorisnici',function(req,resp){

          connection.query("SELECT * FROM Tabela_Korisnici ",function(error,rows,field) {
        
          if(error){
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

router.get('/micko/tabelaKorisnici/:imeKorisnika',function(req,resp){
          
            imeKorisnika1 = req.params.imeKorisnika;
            console.log(imeKorisnika1);
            upit = "SELECT * FROM Tabela_Korisnici where ime = ?"
         
          connection.query(upit,imeKorisnika1,function(error,rows,field) {
        
          if(error){
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

router.post('/micko/tabelaKorisnici/:imeKorisnika/:prezimeKorisnika',function(req,resp){
          
          imeKorisnika1 = req.params.imeKorisnika;
          prezimeKorisnika1 = req.params.prezimeKorisnika;
          console.log(imeKorisnika1);
          //upit = "SELECT * FROM Tabela_Korisnici where ime = ?"
          var reqObj = req.body;

          var insertSQl = "SELECT ime FROM Tabela_Korisnici";
          var insertValues = {
                 "ime" :  reqObj.ime,
                 "prezime" : reqObj.prezime
          };
            
          console.log(insertValues.ime);
          connection.query(insertSQl,function(error,rows,field) {
          
          if(error){
                   console.log('Error',error);
                   resp.json('Error',error);
          }
          var rest = [];
          var brojac = 0;
          for(var ii in rows)
          {
              var empobj = rows[ii];
              rest.push(empobj);
              brojac++;
          }
              resp.json(rest);
              console.log(rest[0]);
              var str = JSON.stringify(rest[0])
              console.log(str.slice(8,13));
              //resp.send('Unix: '+ str.slice(21,32));
                       
          for(var i = 0;i<brojac;i++)
          {
              if(imeKorisnika1 == str.slice(8,13))
              {
                  console.log('Ima u bazi');
              }
              else{

                   console.log('Nema u bazi');
              }
          }
          
          /*if(insertValues.ime == imeKorisnika1){
               
               console.log('Usaooo');

               if(insertValues.prezime == prezimeKorisnika1){
               
                 console.log('Usaooo');

                // var token = jwt.sign({ime:insertValues.ime, prezime:insertValues.prezime }, app.get('superSecret'), {
                var token = jwt.sign({ime:insertValues.ime, prezime:insertValues.prezime }, app.get('superSecret'), {
                     //expiresInMinutes: 1440
                     expiresIn : 60*60*24
                });
                 
                 resp.json({

                     message: 'Napravio Token',
                     Token: token

                 });

               }
               else{
                          
                      resp.send('Nije dobro prezime');   

               }
          }
          else{

               console.log('Nijeeeee');
               resp.send('Nesto nije dobro bree');
          }*/
          
        });  
});

/*
router.post('/ProbaMicko',function(req,resp){
          
          var reqObj = req.body;
          
          var insertSQl = "SELECT ime FROM tabela_korisnici";
          var insertValues = {
                 "ime" :  reqObj.ime,
                 "prezime" : reqObj.prezime
          };
            
          //console.log(insertValues.ime);

          connection.query(insertSQl,function(error,rows,field) {

          if(error){

                   console.log('Error',error);
                   resp.json('Error',error);

          }
          var rest = [];
          var brojac = 0;
          for(var ii in rows)
          {
              var empobj = rows[ii];
              rest.push(empobj);
              brojac++;
          }

              var person = [];
                  var pocetakNiz = [];
                   var pocetakNiz1 = [];
              //resp.json(rest);
              //console.log(rest.length);
              for(var z = 0; z < rest.length ; z++)
              {
                  
                  //var str = JSON.stringify(rest[2])
                  person[z] = JSON.stringify(rest[z]);
                  //var pocetak = str.substr(8)
                  pocetakNiz[z] = person[z].substr(8)
                  //var pocetak1 = str.substr(8,pocetak.length - 2);
                  pocetakNiz1[z] = person[z].substr(8,pocetakNiz[z].length - 2);
                 
                 
              }
                       
          for(var i = 0;i<brojac;i++)
          {
              if(insertValues.ime == pocetakNiz1[i])
              {
                  console.log('Ima u bazi');
                  //resp.send('Korisnik postoji');
              }
              else{

                  // console.log('Nema u bazi');
                 // resp.send('Nemaaaaaa');
              }
          }
          
         // if(insertValues.ime == imeKorisnika1){
            if(insertValues.ime){

               console.log('Usaooo');

               //if(insertValues.prezime == prezimeKorisnika1){
               if(insertValues.ime){

                   console.log('Usaooo');

                // var token = jwt.sign({ime:insertValues.ime, prezime:insertValues.prezime }, app.get('superSecret'), {
                var token = jwt.sign({ime:insertValues.ime, prezime:insertValues.prezime }, app.get('superSecret'), {
                     //expiresInMinutes: 1440
                     expiresIn : 60*60*24
                });
                 
                 resp.json({

                     message: 'Napravio Token',
                     Token: token

                 });

               }
               else{
                          
                      resp.send('Nije dobro prezime');   

               }
          }
          else{

               console.log('Nijeeeee');
               resp.send('Nesto nije dobro bree');
          }
          
        });  
});
*/

/*router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});*/
//router.get()

router.post('/micko/tabelaKorisnici',function(req,resp){

           var reqObj = req.body;

            var insertSQl = "INSERT INTO Tabela_Korisnici SET ?";

            var insertValues = {
                 "ime" :  reqObj.ime,
                 "prezime" : reqObj.prezime,
                 "email" : reqObj.email,
            };
            var query = connection.query(insertSQl,insertValues,function(error,result){

            if (error) {
                  console.log('Error',error.message);
                  
                  resp.status(500).send('Something broke!');


            }else {

                  console.log('Post uspesan - tabelaKorisnici');
                  resp.send('Post uspesan - tabelaKorisnici');
            }
        });
});

router.get('/micko/projekat',function(req,resp){

           connection.query("SELECT * FROM Projekti ",function(error,rows,field) {
        
          if(error){
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

router.post('/micko/projekat',function(req,resp){

            var reqObj = req.body;

            var insertSQl = "INSERT INTO Projekti SET ?";

            var insertValues = {
                 //"id_pr" :  reqObj.id_pr,
                 "ime_projekta" : reqObj.ime_projekta,

            };
            var query = connection.query(insertSQl,insertValues,function(error,result){

            if (error) {
                  console.log('Error',error.message);
                  
                  resp.status(500).send('Something broke!');


            }else {

                  console.log('Post uspesan - Projekti');
                  resp.send('Post uspesan - Projekti');
            }
        });
});

router.post('/micko/projekat/:projekat',function(req,resp){

            var reqObj = req.body;

            var insertSQl = "INSERT INTO Projekti SET ?";

            var insertValues = {
                 //"id_pr" :  reqObj.id_pr,
                 "ime_projekta" : reqObj.ime_projekta,

            };
            var query = connection.query(insertSQl,insertValues,function(error,result){

            if (error) {
                  console.log('Error',error.message);
                  
                  resp.status(500).send('Something broke!');


            }else {

                  console.log('Post uspesan - Projekti');
                  resp.send('Post uspesan - Projekti');
            }
        });
});

router.delete('/micko/projekat/:projekat',function(req,resp){
     
       projekat1 = req.params.projekat;
         
      var insertSQl = "DELETE FROM Projekti WHERE ime_projekta = ?";
      var query = connection.query(insertSQl,projekat1,function(error,result){

         if (error) {
            console.log('Error',error.message);
         }else {
            console.log('DELETE uspesno');
            resp.send('DELETE uspesno');
         }
      });

});

router.put('/micko/projekat/:projekat',function(req,resp){

         var reqObj = req.body;
         ime1 = req.params.imena;
         //console.log(ime1);

         var insertSQl = 'UPDATE test_table SET ime = ? where ime = ?';
         var insertValues = {
           "ime_projekta" :  reqObj.ime_projekta,
           //"prezime" : reqObj.prezime
         };
            // console.log(insertValues.ime);

          //var query = connection.query('UPDATE test_table SET ? where ime = '+ime1+'',insertValues,function(error,result){
          var query = connection.query(insertSQl,[insertValues.ime_projekta,ime1],function(error,result){
          //var query = connection.query("UPDATE test_table SET ime = '"+insertValues.ime+"' where ime = '" +ime1+"'",function(error,result){
          //console.log(ime1);
             if (error) {
                   console.log('Error',error.message);
             }else {
                   console.log('PUT uspesan');
             }
       });
});

router.get('/micko/Projekat-Korisnici',function(req,resp){

           connection.query("SELECT * FROM Korisnik_Projekat ",function(error,rows,field) {
        
          if(error){
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

router.post('/micko/Projekat-Korisnici',function(req,resp){
      

       var reqObj = req.body;

            //var insertSQl = "INSERT INTO test_table SET ?";
            var insertSQl = "insert into Korisnik_Projekat(id_korisnik,id_projekat) values ?";

            var insertValues = {
                 "id_korisnik" :  reqObj.id_korisnik,
                 "id_projekat" : reqObj.id_projekat
            };

            //var query = connection.query(insertSQl,insertValues,function(error,result){'" + ime1 +"'"  , '+kolonA+'
            var query = connection.query('insert into Korisnik_Projekat(id_korisnik,id_projekat) values ('+insertValues.id_korisnik+','+insertValues.id_projekat+')',function(error,result){
            if (error) {
                  console.log('Error',error.message);
                  
                  resp.status(500).send('Greska,pokusajte ponovo');


            }else {
                  console.log('Post uspesan');
            }
        });
       
});

router.get('/micko/vremeUnix',function(req,resp){

          // connection.query(" SELECT UNIX_TIMESTAMP(dt) FROM t1 ",function(error,rows,field) {
          connection.query(" SELECT UNIX_TIMESTAMP(t) FROM t1 ",function(error,rows,field) {
          if(error){
                   console.log('Error',error);
                   resp.json('Error',error);
          }
          var rest = [];
          for(var ii in rows)
          {
              var empobj = rows[ii];
              rest.push(empobj);
          }
              //resp.json(rest); 
              //resp.send('Unix'+ JSON.stringify(rest));
              var str = JSON.stringify(rest)
              console.log(str.slice(21,31));
              resp.send('Unix: '+ str.slice(21,32));
              //str.slice
       
        });  
});

//Procedure
router.get('/micko/Stanje-Procedure',function(req,resp){

          // connection.query(" SELECT UNIX_TIMESTAMP(dt) FROM t1 ",function(error,rows,field) {
         // connection.query("call Stanje_Ispisi ",function(error,rows,field) {
            connection.query("Select * from stanje ",function(error,rows,field) { 
          if(error){
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

router.post('/micko/Stanje-Procedure',function(req,resp){

          // connection.query(" SELECT UNIX_TIMESTAMP(dt) FROM t1 ",function(error,rows,field) {
           var reqObj = req.body;

            var insertValues = {
                 "id_korisnik_stanje" :  reqObj.id_korisnik_stanje,
                 "id_projekat_stanje" : reqObj.id_projekat_stanje,
                 "mesec": reqObj.mesec,
                 "broj_sati":reqObj.broj_sati
            };

          connection.query('call Stanje('+insertValues.id_korisnik_stanje+','+insertValues.id_projekat_stanje+','+insertValues.mesec+','+insertValues.broj_sati+')',function(error,rows,field) {
          if(error){
                   console.log('Error',error);
                   resp.json('Error',error);
          }
          else{
              resp.send('Uspesan Insert');
          }
            
        });  
});

router.get('/micko/Stanje-Procedure/id_projekt',function(req,resp){

          // connection.query(" SELECT UNIX_TIMESTAMP(dt) FROM t1 ",function(error,rows,field) {
         var reqObj = req.body;
         //ime1 = req.params.izmeni-sate;
         //console.log(ime1);

        var insertSQl = "call StanjeUdate(3,1,1,'September')"
        var insertValues = {
                 "id_korisnik_stanje" : reqObj.id_korisnik_stanje,
                 "id_projekat_stanje" : reqObj.id_projekat_stanje,
                 "mesec": reqObj.mesec,
                 "broj_sati":reqObj.broj_sati
        };
            // console.log(insertValues.ime);

          //var query = connection.query('UPDATE test_table SET ? where ime = '+ime1+'',insertValues,function(error,result){
          var query = connection.query(insertSQl,function(error,result){
          //var query = connection.query("UPDATE test_table SET ime = '"+insertValues.ime+"' where ime = '" +ime1+"'",function(error,result){
          //console.log(ime1);
             if (error) {
                   console.log('Error',error.message);
             }else {
                   console.log('PUT uspesan');
             }
       });
});

router.get('/micko/Stanje-Procedure/:id_korisnik/:id_projekt/:mesec',function (req, resp){

      id_korisnik1 = req.params.id_korisnik;
      id_projekt1 = req.params.id_projekt;
      mesec1 = req.params.mesec;
      console.log(id_korisnik1);
      console.log(id_projekt1);
      console.log(mesec1);
      
        connection.query("SELECT * FROM stanje as a WHERE a.id_korisnik_stanje = '" + id_korisnik1 +"'" + "and a.id_projekat_stanje = '" +id_projekt1+ "'" + "and a.mesec = '" +mesec1+ "'",function(error,rows,field) {
          //console.log(ime1);
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
          resp.send(rest);
       
    });  
})

router.put('/micko/Stanje-Procedure/:id_korisnik/:id_projekt/:mesec',function(req,resp){

          // connection.query(" SELECT UNIX_TIMESTAMP(dt) FROM t1 ",function(error,rows,field) {
         var reqObj = req.body;
         //ime1 = req.params.izmeni-sate;
          id_korisnik1 = req.params.id_korisnik;
         id_projekt1 = req.params.id_projekt;
         mesec1 = req.params.mesec;
         //console.log(ime1);
         console.log(id_korisnik1);
         console.log(id_projekt1);
        // console.log(mesec1);

        //var insertSQl = "call StanjeUdate(1,1,1,'September')"
        var insertValues = {
                 "id_korisnik_stanje" :  reqObj.id_korisnik_stanje,
                 "id_projekat_stanje" : reqObj.id_projekat_stanje,
                 "mesec": reqObj.mesec,
                 "broj_sati":reqObj.broj_sati
        };
            // console.log(insertValues.ime);

         // var query = connection.query(insertSQl,function(error,result){
          var query = connection.query("call StanjeUdate('"+insertValues.broj_sati+"','"+id_korisnik1+"','"+id_projekt1+"','"+mesec1+"')",function(error,result){
          //var query = connection.query("UPDATE test_table SET ime = '"+insertValues.ime+"' where ime = '" +ime1+"'",function(error,result){
          console.log(insertValues.broj_sati);
             if (error) {
                   console.log('Error',error.message);
             }else {
                   console.log('PUT uspesan');
                  resp.send('PUT uspesan');
             }
       });
});

module.exports = router;