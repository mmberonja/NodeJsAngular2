var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var url = require('url');
//var datetime = require('node-datetime');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');
var nodemailer = require('nodemailer');

var person = 0;
var pocetakNiz = 0;
var pocetakNiz1 = 0;
var person2 = 0;
var pocetakNiz2 = 0;
var pocetakNiz12 = 0;
var PorediGlobalono = 0;
var brojac = 0,brojacOPTIONS = 0;
var podaciSalji = "0";
var imena_Projekata = "0";
var tokenSalji = "0";
var poslati_sati = 0;
var tabela = "0";
var adminK = "admin BRE";
var ispisADdmnK = "";
var ispisADdmnK1 = "";
var ispisiAd = "";
var sifre_promena = "";
var Aktivan = "";
var aktivasalji = "";
var pamtiAktivan = "";
var newdate = "";
var dateObj = "";
var month = "";
var day = "";
var year = "";
var seci = 0,seci1 = 0,seci2 = 0;
var seciNedelja = 0;
var CuvajGodinu = 0;
   




router.use(function (req, res, next) {

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
               // console.log("Usaooo",brojac);//other requests
        }

        next();
    } catch (e) {
        //console.log(e);
    }

});

router.get('/Greske',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var ProjekatA = query.projekat;//projekat se pise u zaglavlju
    var godina = query.godina;
    

    //console.log(ProjekatA.charAt(0));
    //console.log(isNaN(ProjekatA.charAt(0)));
    //if(ProjekatA.charAt(0))
    //getlength(godina);
    console.log(getlength(godina));
    //console.log(CuvajGodinu);
    if(getlength(godina) < 4 || godina == "")
    {
          resp.status(404).send({ text: 'Nije dobra godina' ,error: '404'});
          return;
    }


    /*if(godina == "")
    {
        resp.status(404).send({ text: 'Nije dobra godina' ,error: '404'});
        //resp.json('Nije dobra godina', 404);
        return;
    }*/

    connection.query("select A.Ime_Prezime,\
        M.Januar,M.Februar,M.Mart,M.April,M.Maj,M.Jun,M.Jul,M.Avgust,M.Septembar,M.Oktobar,M.Novembar,M.Decembar\
        from micko_registracija as A LEFT JOIN micko_meseci_tabela as M on A.id = M.id_nadimak_M\
        where M.id_projekat_M = Micko_Zapamti1('"+ProjekatA+"') and godina = '"+godina+"'",function(error,rows,field) { 

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

router.get('/Sifra123',function(req,resp,next){
      
        resp.json((new Date).getFullYear());
})

router.post('/PrijavaKorisnika',function(req,res,next){
     
          var reqObj = req.body;

          var insertValues = {

                 "ime" :  reqObj.ime,
                 "nadimak" : reqObj.nadimak,
                 "prezime" : reqObj.prezime,
                 "email" : reqObj.email,
                 "sifra" : reqObj.sifra,
                
                
          };

          var sifra1 = insertValues.sifra;
          
          var hashSifra1 = bcrypt.hashSync(sifra1, bcrypt.genSaltSync(8));
        
            var query = connection.query("call Micko_Registrcija_Sifra('"+insertValues.ime+"','"+insertValues.nadimak+"','"+insertValues.prezime+"','"+insertValues.email+"','"+hashSifra1+"')",function(error,result){
            if (error) {
               
                  res.status(500).send('Takav Nadimak,Mejl ili Sifra vec postoje');

            }else {

                  console.log('USPESNA PRIJAVA NA SERVER');
                  
                        var token = jwt.sign({ime:pocetakNiz12, sifra:pocetakNiz1 }, 'shhhhh', {
                        /*expiresInMinutes: 1440*/ expiresIn : 60*60*24//VReme isteka tokena
                                //expiresIn : 60
                        });
                                res.json({

                                    message: 'Napravio Token',
                                    Token: token

                                });
            }
                 //res.send('USPESNA PRIJAVA NA SERVER');
        });
})

router.get('/korisnici-transakciju/inf',function(req,resp){  

        var query = url.parse(req.url,true).query;
        var imePrijava = query.ime;
        var sifraPrijava = query.sifra;
        dateObj = new Date();
		month = dateObj.getUTCMonth() + 1; //months from 1-12
		day = dateObj.getUTCDate();
		year = dateObj.getUTCFullYear();

		newdate = year + "-" + month + "-" + day;

  connection.beginTransaction(function(error) {

         var upit4 = "select Projekti from micko_projekti where id_pr in \
             (select id_projekat from micko_pr_nadimak where id_korisnik = \
             (select id from micko_registracija where Nadimak_Klijent = '"+imePrijava+"'))";
             
             
              connection.query(upit4,function(error,rows){
                    
            

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
                        });

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

                            imena_Projekata = rest;    
                   
             });

         var upit5 = "SELECT * FROM micko_meseci_tabela where id_nadimak_M = Micko_Zapamti('"+imePrijava+"')";
              

                           
                 connection.query(upit5,function(error,rows){
                    
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
                        });


                     if(error)
                     {
                            resp.json('Error',error);
                     }
                            var rest = [];
                            for(var ii in rows)
                            {
                                var empobj = rows[ii];
                                rest.push(empobj);
                            }

                            tabela = rest;    
                      
                   
            });

        var upitAktivan = "SELECT aktivan FROM micko_registracija where Nadimak_Klijent = '"+imePrijava+"'";
             
          

            connection.query(upitAktivan,imePrijava,function(error,rows){
                    
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
                        });

                     
                     if(error)
                     {
                           // console.log('Error',error);
                            resp.json('Error',error);
                     }
                            var rest = [];
                            for(var ii in rows)
                            {
                                var empobj = rows[ii];
                                rest.push(empobj);
                            }
                    
                       if(rest =="")
                       {
                           rest = "nije";
                         
                       }
                            aktivasalji = rest; 
                              
                            pamtiAktivan = rest[0].aktivan;
                   
            });


        var Trenutna_Nedelja = "select Nedelja_Trenutna('"+newdate+"') as Vreme";

             connection.query(Trenutna_Nedelja,function(error,rows){
                    
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
                        });

                     
                     if(error)
                     {
                           // console.log('Error',error);
                            resp.json('Error',error);
                     }
                            var rest = [];
                            for(var ii in rows)
                            {
                                var empobj = rows[ii];
                                rest.push(empobj);
                            }
                       
                            seciNedelja = rest[0].Vreme;
                            console.log("Nedeljaaaaa"+seciNedelja);
                   
            });
        


         var upit3 = "SELECT Ime_Klijenta,Nadimak_Klijent,Prezime_Klijenta,Ime_Prezime FROM micko_registracija where Nadimak_Klijent = '"+imePrijava+"' ";

             connection.query(upit3,imePrijava,function(error,rows){
                    
                    if (error) { 
                            console.log("Micko Majmuneee");
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
                        });


                     if(error)
                     {
                           // console.log('Error',error);
                            resp.json('Error',error);
                     }
                            var rest = [];
                            for(var ii in rows)
                            {
                                var empobj = rows[ii];
                                rest.push(empobj);
                            }

                            podaciSalji = rest;    
                           
            });

        var upitAdmin = "SELECT admin FROM micko_registracija where Nadimak_Klijent = '"+imePrijava+"' ";

             connection.query(upitAdmin,function(error,rows){
                    
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
                        });


                     if(error)
                     {
                           // console.log('Error',error);
                            resp.json('Error',error);
                     }
                            var rest = [];
                            for(var ii in rows)
                            {
                                var empobj = rows[ii];
                                rest.push(empobj);
                            }

                                adminK = rest; 
                                
                                adminK = JSON.stringify(rest);
                                ispisADdmnK = adminK.substr(11);
                                ispisADdmnK1 = adminK.substr(11,ispisADdmnK.length - 3);
                            
            });
            

        var upit1 = "SELECT Sifra_Klijent FROM micko_ime_sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";
        
        connection.query(upit1,[imePrijava,sifraPrijava],function(error,rows,field){

           
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
                  
                  });
        
                    if(error)
                    {
                         resp.json('Error',error);
                       // console.log('Error',error);
                    }
                        var rest = [];
                        for(var ii in rows)
                        {
                             var empobj = rows[ii];
                            rest.push(empobj);
                        }
        
                  if(rest == "")
                  {
                     
                     rest = "0.0.0";
                  }
                  
                    var PrediSifre12 = bcrypt.compareSync(String(sifraPrijava),String(rest[0].Sifra_Klijent)); 
                    
                    PorediGlobalono =  PrediSifre12;

        });

        var upit2 = "SELECT Nadimak_Klijent FROM micko_ime_sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";

        connection.query(upit2,[imePrijava,sifraPrijava],function(error,rows){
          
        
            if (error) { 
                console.log("usaooo1");
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
                  });

                      if(error)
                      {
                           resp.json('Error',error);
                           console.log('Error',error);
                      }
                         var rest = [];
                        for(var ii in rows)
                        {
                            var empobj = rows[ii];
                            rest.push(empobj);
                        }
                            
                              if(rest == "")
                              {
                        
                                    rest = "0.0.0"
                              }
                              
                                pocetakNiz12 = (rest[0].Nadimak_Klijent); 
                               
                        if(imePrijava == pocetakNiz12)
                        {
                           
                            if(PorediGlobalono)
                            {
                                 ;
                                if(pamtiAktivan === 'aktivan')
                                {
                                  
                                    tokenSalji = jwt.sign({ime:pocetakNiz12, sifra:pocetakNiz1,admin:ispisADdmnK1 }, 'shhhhh', {
                                    //expiresInMinutes: 1440
                                    expiresIn : 60*60*24//VReme isteka tokena
                                    //expiresIn : 60
                                    });
                    
                                        resp.json({
                                            message: 'Napravio Token',
                                            Token: tokenSalji,
                                            Podaci: podaciSalji,
                                            imena_Projekata: imena_Projekata,
                                            Tabela: tabela,
                                            AktivanK: aktivasalji,
                                            seciNedelja: seciNedelja
                                        });
                                }
                                else{
                                     resp.send("Neaktivni ste!!!");
                                }
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

router.use(KoristiToken1);

router.get('/Sifra-Micko',function(req,resp,next){
      
     resp.send('Bravooo Micko');
     
})

router.post('/micko/Stanje-Procedure',function(req,resp){

         
           var reqObj = req.body;

            var insertValues = {

                 "Nadimak_Klijent" :  reqObj.Nadimak_Klijent,
                 "Projekti" : reqObj.Projekti,
                 "nedelja": reqObj.nedelja,
                 "mesec":   reqObj.mesec,
                 "broj_sati": reqObj.broj_sati,
                 "godina": reqObj.godina
            };

          


          connection.query("call Procedura_Null('"+insertValues.Nadimak_Klijent+"','"+insertValues.Projekti+"','"+insertValues.nedelja+"','"+insertValues.mesec+"','"+insertValues.broj_sati+"','"+insertValues.godina+"')",function(error,rows,field) {
          if(error){

                    resp.status(500).send('Nije dobro upisanooooo');
    
          }
          else{

                    resp.send('Uspesan Insert');
          }
            
        });  
});

router.get('/FunkcijeProba/micko',function(req,resp,next){
    
      var query = url.parse(req.url,true).query;
      var NadimakI = query.nadimak;
      var ProjekatI = query.projekat;
      var MesecI = query.mesec;
      var NedeljaI = query.nedelja;
      var Godina = query.godina; 
      console.log("Godina"+Godina)  
    
        connection.query("select broj_sati from micko_nedelja_mesec_sati where id_nadimak_N = Micko_S('"+NadimakI+"') and id_projekat_N = Micko_S_Projekat('"+ProjekatI+"') and mesec = '"+MesecI+"' and nedelja ='"+NedeljaI+"' and godina = '"+Godina+"'",function(error,rows,field) {
        
            if(error)
            {
            // console.log('Error',error);
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

/*router.get('/FunkcijeProba/micko',function(req,resp,next){
    
      var query = url.parse(req.url,true).query;
      var NadimakI = query.nadimak;
      var ProjekatI = query.projekat;
      var MesecI = query.mesec;
      var NedeljaI = query.nedelja;
      // var NedeljaI = query.nedelja;   
     
     console.log("NadimakI",NadimakI);
     console.log("ProjekatI",ProjekatI);
     console.log("MesecI",MesecI);
     console.log("NedeljaI",NedeljaI);
    
    connection.query("select broj_sati from micko_nedelja_mesec_sati where id_nadimak_N = Micko_S('"+NadimakI+"') and id_projekat_N = Micko_S_Projekat('"+ProjekatI+"') and mesec = '"+MesecI+"' and nedelja ='"+NedeljaI+"'",function(error,rows,field) {
        
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
     
})*/

router.get('/FunkcijeProba/Izvestaj',function(req,resp,next){
   
      var query = url.parse(req.url,true).query;
      var NadimakI = query.nadimak;
      var ProjekatI = query.projekat;
      var MesecI = query.mesec;
    
      connection.query("select sum(broj_sati) from micko_nedelja_mesec_sati where id_nadimak_N = Micko_S('"+NadimakI+"') and id_projekat_N = Micko_S_Projekat('"+ProjekatI+"') and mesec = '"+MesecI+"'",function(error,rows,field) {
        
          if(error)
          {
          //  console.log('Error',error);
            resp.json('Error',error);
          }
          var rest = [];
          
            for(var ii in rows)
            {
                var empobj = rows[ii];
                rest.push(empobj);
            }

                prvi = JSON.stringify(rest);
                drugi = prvi.substr(19);
                treci = prvi.substr(19,drugi.length - 2);

                resp.json(treci);

        });  
     
})

router.get('/InformacijeSatnica/informacije',function(req,resp,next){
      
      var query = url.parse(req.url,true).query;
      var NadimakI = query.nadimak;
      var ProjekatI = query.projekat;
      var MesecI = query.mesec;
      var NedeljaI = query.nedelja;

      connection.query("call Micko_Izvestaj_Nedeljni('"+NadimakI+"','"+ProjekatI+"','"+MesecI+"','"+NedeljaI+"')",function(error,rows,field) {
        
          if(error)
          {
           // console.log('Error',error);
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

router.get('/Spojeno-u-nadimak',function(req,resp,next){
      
    
     var query = url.parse(req.url,true).query;
     var imePrijava1 = query.ime;
     var godina = query.godina;
    
     connection.query("select *,(Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti(Micko_Spajanje_U_Nadimak('"+imePrijava1+"')) and godina = '"+godina+"' UNION ALL\
         select 'id','id_nadimak_M','id_projekat_M','SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
         sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),'godina',sum('Sum')\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti(Micko_Spajanje_U_Nadimak('"+imePrijava1+"')) and godina = '"+godina+"'",function(error,rows,field) {


          if(error)
          {
            //console.log('Error',error);
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

router.get('/ListaProjekata-meseci',function(req,resp,next){
      
    
     var query = url.parse(req.url,true).query;
     var imePrijava1 = query.ime;
     var godina = query.godina;
    
      connection.query("SELECT * FROM micko_meseci_tabela where id_nadimak_M = Micko_Zapamti('"+imePrijava1+"') and godina = '"+godina+"'" ,function(error,rows,field) {
        
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

//Aktivan nije aktivan
router.get('/Korisnici-Nadimci',function(req,resp,next){
      
        connection.query("SELECT Nadimak_Klijent,Ime_Prezime FROM micko_registracija",function(error,rows,field) {
        
          if(error)
          {
                //console.log('Error',error);
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

router.get('/Korisnici-Nadimci-aktivni',function(req,resp,next){
      
    
      connection.query("SELECT Nadimak_Klijent,Ime_Prezime FROM micko_registracija where aktivan = 'aktivan'",function(error,rows,field) {
        
          if(error)
          {
            //console.log('Error',error);
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

router.get('/Korisnici-Nadimci-neaktivni',function(req,resp,next){
      
    
      connection.query("SELECT Nadimak_Klijent,Ime_Prezime FROM micko_registracija where aktivan = 'nije'",function(error,rows,field) {
      
          if(error)
          {
                //console.log('Error',error);
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

router.get('/Korisnici-Projekti-Na-kojima-nerade',function(req,resp,next){
      
     var query = url.parse(req.url,true).query;
     var imePrijava12 = query.ime;    

     connection.query("select Projekti from micko_projekti where id_pr not in \
     (select id_projekat from micko_pr_nadimak where id_korisnik = \
     (select id from micko_registracija where Nadimak_Klijent = Micko_Spajanje_U_Nadimak('"+imePrijava12+"')))",function(error,rows,field) {
     
          if(error)
          {
                //console.log('Error',error);
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

router.post('/Upis-Projekta-koji-nepostoji',function(req,resp,next){

     var reqObj = req.body;

            var insertValues = {

                 "Nadimak" :  reqObj.Nadimak,
                 "Projekat" : reqObj.Projekat,
                 "godina": reqObj.godina
            };

    //U connection.query je dodata funkcija "Micko_Spajanje_U_Nadimak" koja ime i prezime pretvori u nadimak->
    //->jer nam je to potrebno da bi mogli da snimimo projekat
     connection.query("call Micko_Admin_Projekat_Korisnik(Micko_Spajanje_U_Nadimak('"+insertValues.Nadimak+"'),'"+insertValues.Projekat+"','"+insertValues.godina+"')",function(error,rows,field) {
        
          if(error)
          {
            //console.log('Error',error);
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

router.post('/Dodavanje-Novog-Projekta',function(req,resp,next){

     var reqObj = req.body;

            var insertValues = {

                 "Projekat" :  reqObj.Projekat,
                
            };


     connection.query("insert into micko_projekti(Projekti) value('"+insertValues.Projekat+"');",function(error,rows,field) {
        
          if(error)
          {
                //console.log('Error',error);
                resp.status(500).send('Nije dobro upisanooooo');
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

router.delete('/Uklanjanje-korisnika-sa-odredjenog-projekta',function(req,resp,next){
        
        var query = url.parse(req.url,true).query;
        var NadimakBrisanje = query.NadimakBrisanje;
        var ProjekatBRisanje = query.ProjekatBRisanje;
      
        connection.query("call Micko_Admin_Brisanje(Micko_Spajanje_U_Nadimak('"+NadimakBrisanje+"'),'"+ProjekatBRisanje+"')",function(error,rows,field) {
        
          if(error)
          {
                //console.log('Error',error);
                resp.status(500).send('Nije dobro upisanooooo');
          }
          else{

                resp.send('Uspesao Brisanje');
          }
          
       
        });  
})

router.get('/Lista-projekata-na-kojim-korisnik-radi',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var imePrijavaUklanjanje = query.ime;
    
    connection.query("select Projekti from micko_projekti where id_pr in \
        (select id_projekat from micko_pr_nadimak where id_korisnik = (select id from micko_registracija where Nadimak_Klijent = Micko_Spajanje_U_Nadimak('"+imePrijavaUklanjanje+"')))",function(error,rows,field) {   

          if(error)
          {
                //console.log('Error',error);
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

router.delete('/Uklanjanje-korisnika/sve-projekte',function(req,resp,next){

        var query = url.parse(req.url,true).query;
        var NadimakBrisanje1 = query.NadimakBrisanje;
       
     connection.query("call Micko_Brisanje_Korisnika(Micko_Spajanje_U_Nadimak('"+NadimakBrisanje1+"'))",function(error,rows,field) {
        
            if(error)
            {
                    //console.log('Error',error);             
                    resp.status(500).send('Nije dobro upisanooooo');
            }
            else{

                resp.send('Uspesao Brisanje');
            }
          
      });  
})

router.get('/Za-dati-projekat-korisnici-koji-rade-na-njemu',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var ProjekatA = query.projekat;//projekat se pise u zaglavlju
    var godina = query.godina;

      connection.query("select A.Ime_Prezime,\
        M.Januar,M.Februar,M.Mart,M.April,M.Maj,M.Jun,M.Jul,M.Avgust,M.Septembar,M.Oktobar,M.Novembar,M.Decembar,\
        (Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
        from micko_registracija as A LEFT JOIN micko_meseci_tabela as M on A.id = M.id_nadimak_M\
        where M.id_projekat_M = Micko_Zapamti1('"+ProjekatA+"') and godina = '"+godina+"'\
        UNION ALL select 'SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
        sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),sum('Sum') from micko_meseci_tabela\
        where id_projekat_M = Micko_Zapamti1('"+ProjekatA+"') and godina = '"+godina+"'",function(error,rows,field) { 


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

router.get('/Svi-projekti',function(req,resp,next){
      
      connection.query("SELECT Projekti FROM micko_projekti",function(error,rows,field) {
        
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

router.post('/Dva-upita-promena-sifre',function(req,resp,next){

   connection.beginTransaction(function(error) {

        var query = url.parse(req.url,true).query;
        var NadimakSifra = query.imeSifra;
        var sifraPrijava1 = query.sifra;

        var reqObj = req.body;

        var insertValues = {
                 "sifra" : reqObj.sifra     
        };

        var upitSifra = "select Sifra_Klijent from micko_ime_sifra where Nadimak_Klijent = '" + NadimakSifra + "'";

         connection.query(upitSifra,function(error,rows){
                    
            

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
                        });

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

                            sifre_promena = rest;  

                                var sifra_niz = JSON.stringify(rest);
                                var sifra_niz1 = sifra_niz.substr(19);
                                var sifra_niz2 = sifra_niz.substr(19,sifra_niz1.length - 3);
                                
                                var PrediSifre123 = bcrypt.compareSync(String(sifraPrijava1),String(sifra_niz2)); 
                                var PorediGlobalono1 =  PrediSifre123; 

                         

                        if(PorediGlobalono1)
                        {
                             
                              var sifraPromena = insertValues.sifra;
                              var hashSifraPromena = bcrypt.hashSync(sifraPromena, bcrypt.genSaltSync(8));

                              var upitProvera = "call Micko_Promena_Sifre('"+NadimakSifra+"','"+hashSifraPromena+"')";

                              connection.query(upitProvera,function(error,rows){

                                     if(error){
                                                    //resp.json('Error',error);
                                                    resp.status(500).send('Nije dobra sifra');
                                    
                                      }
                                      else{
                                                    resp.send('Uspesano promenjena sifra');
                                      }

                              });

                        }
                        else{

                             resp.json("Nijeeeeeeee dobra sifraaa");

                        }    
                           
             });
       });
})

router.get('/Djuture-upis',function(req,resp,next){
      
    var query = url.parse(req.url,true).query;
    var NadimakI = query.nadimak;

    connection.query("select Projekti,id_pr from micko_projekti where id_pr in \
    (select id_projekat from micko_pr_nadimak where id_korisnik = Micko_Zapamti('"+NadimakI+"'))",function(error,rows,field) {
        
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

router.put('/deaktivacija-korisnik',function(req,resp){

    var query = url.parse(req.url,true).query;
    var Ime_Prezime = query.Ime_Prezime;

    var query = connection.query("UPDATE micko_registracija SET aktivan = 'nije' where Ime_Prezime = '"+Ime_Prezime+"'",function(error,result){

             if (error) {

                    resp.json('Error',error);

             }
             else{
                  // console.log('PUT uspesan');
                   resp.send("Uspesno deaktiviran");
             }
    });

});

router.put('/aktivacija-korisnik',function(req,resp){

    var query = url.parse(req.url,true).query;
    var Ime_Prezime = query.Ime_Prezime;

    var query = connection.query("UPDATE micko_registracija SET aktivan = 'aktivan' where Ime_Prezime = '"+Ime_Prezime+"'",function(error,result){

             if (error) {
                   //console.log('Error',error.message);
                    resp.json('Error',error);

             }
             else {
                   //console.log('PUT uspesan');
                   resp.send("Uspesno deaktiviran");
             }
       });
});

router.get('/nedelja_razliciti_projekti',function(req,resp,next){
     
    var query = url.parse(req.url,true).query;
    var NadimakI = query.nadimak;
    var NedeljaI = query.nedelja;
    var MesecI = query.mesec;
    var GodinaL = query.godina;

   
 
    connection.query("call Micko_Izvestaj_Nedelja_Razliciti_Projekti('"+NadimakI+"','"+NedeljaI+"',\
    '"+MesecI+"','"+GodinaL+"')",function(error,rows,field) {
        
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
              
                    resp.json(rest[0][0].values1);

     }); 
});

router.get('/trenutna-nedelja-baza',function(req,resp,next){
     
    var query = url.parse(req.url,true).query;
    var dateObj1 = new Date();
	var	month1 = dateObj1.getUTCMonth() + 1; //months from 1-12
	var	day1= dateObj1.getUTCDate();
	var	year1 = dateObj1.getUTCFullYear();
	var	newdate1 = year1 + "-" + month1 + "-" + day1;

    
    connection.query("select Nedelja_Trenutna('"+newdate1+"') as Vreme",function(error,rows,field) {
     
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
              
        
          
            resp.json(rest[0].Vreme);
        
     }); 

});

/*router.get('/trenutna-nedelja-baza',function(req,resp,next){
     
    var query = url.parse(req.url,true).query;
    var datum = query.datum;

 
    //connection.query("select( WEEK('"+Datum+"') - WEEK(DATE_SUB('"+Datum+"', INTERVAL DAYOFMONTH('"+Datum+"')-1 DAY)) + 1)",function(error,rows,field) {
    connection.query("select Nedelja_Trenutna('"+datum+"')",function(error,rows,field) {
     
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
              
            //console.log();    
            //resp.json(rest);
           var seci  = JSON.stringify(rest);
            // var seci =   rest;  
                  //var pocetak = str.substr(8)
           var seci1 = seci.substr(34);
           var seci2 = seci.substr(34,seci1.length - 2);
           resp.json(seci2);
     }); 

});*/

/*router.get('/nedelja_razliciti_projekti',function(req,resp,next){
     
     var query = url.parse(req.url,true).query;
    var NadimakI = query.nadimak;
    var NedeljaI = query.nedelja;
    var MesecI = query.mesec;
    var GodinaL = query.godina;

    console.log(NadimakI);
 
    connection.query("call Micko_Izvestaj_Nedelja_Razliciti_Projekti('"+NadimakI+"','"+NedeljaI+"',\
    '"+MesecI+"','"+GodinaL+"')"
    ,function(error,rows,field) {
        
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



});*/

function getlength(number) {
    //CuvajGodinu = godina_unesi.toString().length;
    return number.toString().length;
} 

function Saberi(a,b,callBack){

     var numberS = (a + b) * b;
   //console.log("Saberi",numberS);
     callBack(numberS); 
}

function Oduzmi(a,b,callBack){
    Saberi(2,2,function(num){
        var numberS1 = (a-b) * 4;
        //console.log("Odizmi",numberS1);
        console.log(num);
        callBack("Minus="+numberS1 + "  Saberi=" + num);
    });
}

function printList(callback) {
  // do your printList work
  console.log('printList is done');
  callback();
}

function updateDB(callback) {
  // do your updateDB work
  console.log('updateDB is done');
  callback()
}

function getDistanceWithLatLong(callback) {
  // do your getDistanceWithLatLong work
  console.log('getDistanceWithLatLong is done');
  callback();
}

function runSearchInOrder(callback) {
    getDistanceWithLatLong(function() {
        updateDB(function() {
            printList(callback);
        });
    });
}

var nizNekio = [[

    {ime : "Micko"}
    ]
];

/*router.get('/Djuture-upis123',function(req,resp,next){
      
   // var query = url.parse(req.url,true).query;
   //  var NadimakI = query.nadimak;
    var query = url.parse(req.url,true).query;
    var imePrijava = query.ime;
    var sifraPrijava = query.sifra;
    //console.log(NadimakI);
 
    //connection.query("select Projekti,id_pr from micko_projekti where id_pr in \
    //(select id_projekat from micko_pr_nadimak where id_korisnik = Micko_Zapamti('"+NadimakI+"'))",function(error,rows,field) {

    var upit_proba = "SELECT Nadimak_Klijent FROM Micko_Ime_Sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";

     connection.query(upit_proba,[imePrijava,sifraPrijava],function(error,rows,field){

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

                //resp.json(rest);
                //resp.json(rest[0].Sifra_Klijent);
                resp.json(rest[0].Nadimak_Klijent);
                //console.log(rest[0].Projekti);
                //var PrediSifre12 = bcrypt.compareSync(String(sifraPrijava),String(rest[0].Sifra_Klijent)); 
                //console.log(PrediSifre12);
                //resp.json(PrediSifre12);

        }); 
   
     
})*/

/*router.get('/Nedelja-trenutna',function(req,resp,next){
      
    var query = url.parse(req.url,true).query;
    var NadimakI = query.nadimak;
    var NedeljaI = query.nedelja;
    var MesecI = query.mesec;
    var GodinaL = query.godina;
 
    connection.query("select M.Projekti,A.broj_sati from micko_nedelja_mesec_sati as A INNER JOIN \
    micko_projekti as M on A.id_projekat_N = M.id_pr where id_nadimak_N = Micko_Zapamti('"+NadimakI+"') \
    and nedelja = '"+NedeljaI+"' and mesec = '"+MesecI+"' and godina = '"+GodinaL+"' order by id_pr"
    ,function(error,rows,field) {
        
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
   
     
})*/

var connection = mysql.createConnection({
   
        host     : 'localhost',
        user     : 'Micko1992',
        password : 'chelsea1234',
        database : 'test_schema',
        micko : console.log('ConekcijaBaza')
    });




module.exports = router;
