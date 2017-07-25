var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var url = require('url');
//var datetime = require('node-datetime');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');
var nodemailer = require('nodemailer');
var email 	= require("emailjs/email");

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

var dateObjStorage = "";
var monthStorage = "";
var dayStorage = "";
var yearStorage = "";
var newdateStorage = "";
var imena_ProjekataStogare = "0";  
var tabelaStorage = "0"
var pamtiAktivanStorage = "0"
var seciNedeljaStorage = "0"
var podaciSaljiStorage = "0"
var adminKStorage = "admin BRE";
var ispisADdmnKStorage = "";
var ispisADdmnK1Storage = "";
var PorediGlobalonoStorage = 0;
var pocetakNiz12Storage = "0";
var pamtiAktivanStorageIf = "0"
var projekti_pamri_m = []
var pamti_rest_1 = []
var pamti_rest_2 = []

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


var transporter = nodemailer.createTransport({
    /*service: 'gmail',
    auth: {
        user: 'mickochelsea1234@gmail.com',
        pass: 'chelsea.1234'
    },*/
    auth: {
        user: 'miroslav.beronja@to-net.rs',
        pass: 'chelsea.1234'
    },
    host:'mail.to-net.rs',
    service:'rs'

});

/*var mailOptions = {
    //from: '"Miroslav Beronja" <miroslavmicko1964@gmail.com>', // sender address
    from: '<miroslav.beronja@to-net.rs>',
    //to: 'miroslav.beronja@to-net.rs', // list of receivers
    to: 'mickochelsea1234@gmail.com', // list of receivers
    subject: 'Zahtev za dodavanje novog projekta ✔', // Subject line
    text: 'Ime novog projekta!!', // plain text body
    html: '<b>Ime novog projekta!!</b>' // html body
};*/


function Email(textT,email){

    var mailOptions;

    return mailOptions = {
        //from: '"Miroslav Beronja" <miroslavmicko1964@gmail.com>', // sender address
        //from: '<miroslav.beronja@to-net.rs>',
        from: '<'+email+'>',
        //to: 'miroslav.beronja@to-net.rs', // list of receivers
        to: 'miroslav.beronja@to-net.rs,milos.tolic@to-net.rs,stevan.filipovic@to-net.rs', // list of receivers
        subject: 'Zahtev za dodavanje novog projekta ✔', // Subject line//milos.tolic@to-net.rs,stevan.filipovic@to-net.rs
        text: ''+textT+'', // plain text body
        html: '<b>'+textT+'</b>' // html body
    };  
}

/*var server 	= email.server.connect({
        service: 'gmail',
        user:     "miroslav.beronja@to-net.rs", 
        password: "chelsea.1234", 
       
    });*/

/*router.get('/email',function(req,resp,next){
      
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            resp.json(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        resp.json("Poslat mejl");
    });

})*/



/*
router.get('/projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;
    console.log("ImeInsert" + Ime);
    console.log("MesecInsert" + Mesec);
    console.log("NedeljaInsert" + Nedelja);
    console.log("GodinaInsert" + Godina);

    var rest = [];
    var rest12 = [];
    var brojac = 0;

    //Zastita!!
    if(Ime == "")
    {

    }
    if(Mesec == ""){


    }
    if(Nedelja == ""){

    }
    if(Godina == ""){

    }

    connection.beginTransaction(function(error) {    

        connection.query("select P.Projekti,S.razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.reziski_poslovi from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
            on P.id_pr = S.id_projekat where id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {

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
    


            if(error) {
                resp.json('Error',error);           
            }
            
          

            for(var ii in rows) {
                var empobj = rows[ii];
                rest.push(empobj);
            }    

        });

        connection.query("select P.id_pr,P.Projekti,R.Nadimak_Klijent from micko_projekti as P	INNER JOIN  micko_pr_nadimak as M on P.id_pr = M.id_projekat \
                INNER JOIN micko_registracija as R on M.id_korisnik = R.id where R.id = Micko_S('"+Ime+"')",function(error,rows,field) {

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
        

            if(error) {
                resp.json('Error',error);           
            }
            var rest_1 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_1.push(empobj);
            }    
            
            //resp.json(rest_1)
            if(rest.length == rest_1.length){

                console.log("Ne potreban insert");

            }
            else{


                if(rest == ""){
                    
                        for(var ii in rest_1)
                        {

                            console.log("prazam niz" + rest_1[ii].Projekti);

                            connection.query("insert into sve_jedna_tabela(id_nadimak_D,id_projekat,nedelja,mesec,godina,razvoj,odrzavanje,dokumentacija,implementacija,reziski_poslovi) value \
                                        (Micko_S('"+Ime+"'),'"+rest_1[ii].id_pr+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                                                
                            }); 
                        }
                }  
                else{

                    for(var ii in rest_1){

                        if(rest[brojac].Projekti == rest_1[ii].Projekti){

                            if(rest.length - 1 > brojac){

                            brojac = brojac + 1;

                            }
                            else{

                                //console.log("brojac" + brojac );

                            }
                        }
                        else{//Projekti koji nemaju satnicu

                            console.log("Projekti  " +rest_1[ii].id_pr)
                                
                            connection.query("insert into sve_jedna_tabela(id_nadimak_D,id_projekat,nedelja,mesec,godina,razvoj,odrzavanje,dokumentacija,implementacija,reziski_poslovi) value \
                                    (Micko_S('"+Ime+"'),'"+rest_1[ii].id_pr+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                                            
                            });    
                        }  
                    }
                }
            }   

            connection.query("select S.id_nadimak_D,S.id_projekat,S.nedelja,S.mesec,S.godina,P.Projekti,S.razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.reziski_poslovi from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
                on P.id_pr = S.id_projekat where id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"' ORDER BY id_projekat",function(error,rows,field) {

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

                if(error) {
                    resp.json('Error',error);           
                }
                
            

                for(var ii in rows) {
                    var empobj = rows[ii];
                    rest12.push(empobj);
                }   
                

                resp.json(rest12)

          });
    });
  });
});  */
/*
router.put('/projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Projekat = query.projekat;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;
    var Razvoj = query.razvoj;
    var Odrzavanje = query.odrzavanje;
    var Dokumentacija = query.dokumentacija;
    var Implementacija = query.implementacija;
    var Reziski_poslovi = query.reziskiposlovi;

    console.log("Ime" + Ime);
    console.log("Projekat" + Projekat);
    console.log("Mesec" + Mesec);
    console.log("Nedelja" + Nedelja);
    console.log("Godina" + Godina);
    console.log("Razvoj" + Razvoj);
    console.log("Odrzavanje" + Odrzavanje);
    console.log("Dokumentacija" + Dokumentacija);
    console.log("Implementacija" + Implementacija);
    console.log("Reziski_poslovi" + Reziski_poslovi);


    //resp.json("Uspesan update"); 
    
    connection.query("update sve_jedna_tabela set razvoj = '"+Razvoj+"',odrzavanje = '"+Odrzavanje+"',dokumentacija = '"+Dokumentacija+"',implementacija='"+Implementacija+"',reziski_poslovi='"+Reziski_poslovi+"' \
         where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+Projekat+"' and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {
             
   // var query = connection.query("update sve_jedna_tabela set razvoj = 5,odrzavanje = 5,dokumentacija = 5,implementacija=5,reziski_poslovi=5 where id_nadimak_D = 3 and id_projekat_D = 36 and nedelja = 4 and mesec = 'januar' and godina = 2017",function(error,rows,field) {
         


       if (error) {
                   //console.log('Error',error.message);
                    resp.json('Error',error);

             }
             else {
                   //console.log('PUT uspesan');
                   resp.json("Uspesno deaktiviran");
             }

    });

});  */

router.get('/Svi-projekti-proba',function(req,resp,next){

      var NizObject;
      var Micko;

      connection.query("select id_projekat_D,id_nadimak_D,(razvoj + odrzavanje + implementacija + dokumentacija + reziski_poslovi) as sum \
        from sve_jedna_tabela where mesec = 'Maj' and nedelja = 3  group by id_nadimak_D,id_projekat_D",function(error,rows,field) {
        
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

            console.log("length" + rest.length);

            resp.json(rest);
        });  
})

router.get('/odjava-prazan-token',function(req,resp,next){

    resp.json('Prazno');

})
/*
router.get('/trenutna-godina',function(req,resp,next){

    var d = new Date();
    var n = d.getFullYear();

    resp.json(n)
})

router.get('/odjava-prazan-token',function(req,resp,next){

    resp.json('Prazno');

})

router.get('/trenutna-nedelja',function(req,resp,nesxt){

    var dateObj_tr = new Date();
	var month_tr = dateObj_tr.getUTCMonth() + 1; //months from 1-12
    var day_tr = dateObj_tr.getUTCDate();
	var year_tr = dateObj_tr.getUTCFullYear();

	var trenutni_datum = year_tr + "-" + month_tr + "-" + day_tr;

    var Trenutna_Nedelja = "select Nedelja_Trenutna('"+trenutni_datum+"') as Vreme";

             connection.query(Trenutna_Nedelja,function(error,rows){
                    
                if(error){
                    resp.json('Error',error);
                }
                var rest = [];
                for(var ii in rows){
                    var empobj = rows[ii];
                    rest.push(empobj);
                }

                resp.json(rest[0].Vreme)           
    });

})

router.get('/trenutni-mesec',function(req,resp,next){

    var month = new Array();
		month[0] = "Januar";
		month[1] = "Februar";
		month[2] = "Mart";
		month[3] = "April";
		month[4] = "Maj";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Avgust";
		month[8] = "Septembar";
		month[9] = "Oktobar";
		month[10] = "Novembar";
		month[11] = "Decembar";

		var d = new Date();
		var n = month[d.getMonth()];
		//document.getElementById("demo").innerHTML = n;
		//alert(n);
		//return n;
        resp.json(n)
})*/

/*
router.get('/insert-u-tabelu-micko-nedelja-mesec-sati-1',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina
    console.log("Mesec" + Mesec)
    console.log("Nedelja" + Nedelja ) 
    console.log("Godina" + Godina)

    //connection.query("select broj_sati,id_projekat_N from micko_nedelja_mesec_sati \
     //         where id_nadimak_N = Micko_S('"+Ime+"') and mesec = '"+Mesec+"' and nedelja = '"+Nedelja+"' and godina = '"+Godina+"'",function(error,rows,field) {
       //connection.query("SELECT Projekti,id_pr FROM micko_projekti",function(error,rows,field) {

    connection.beginTransaction(function(error) {     

        connection.query("select Projekti,id_pr from micko_projekti where id_pr in \
             (select id_projekat from micko_pr_nadimak where id_korisnik = \
             (select id from micko_registracija where Nadimak_Klijent = '"+Ime+"')) ORDER BY id_pr",function(error,rows,field) {


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

            if(error) {
                resp.json('Error',error);           
            }
            var rest_1 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_1.push(empobj);
            }

            pamti_rest_1 = rest_1;
            // console.log(pamti_rest_1[0].Projekti)

    });
        
        connection.query("select broj_sati,id_projekat_N from micko_nedelja_mesec_sati where\
                id_nadimak_N = Micko_S('"+Ime+"')\
                and mesec = '"+Mesec+"' and nedelja ='"+Nedelja+"' and godina = '"+Godina+"' ORDER BY id_projekat_N",function(error,rows,field) {
                   // console.log("cuvaj_bre_majmune" + cuvaj_bre_majmune)
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

            if(error) {
                resp.json('Error',error);           
            }
            var rest_2 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_2.push(empobj);
            }
            var brojac = 0
           
            pamti_rest_2 = rest_2;
            if(pamti_rest_2.length == pamti_rest_1.length){

                resp.json("odicnoo")
                console.log("Nije potreban insert")
            }
            else{
                for(var z=0; pamti_rest_1.length > z ; z++){

                    if(pamti_rest_1.length)
                    {
                        
                        //if(pamti_rest_2 == '' || pamti_rest_2[brojac].id_projekat_N == pamti_rest_1[z].id_pr)
                        if(pamti_rest_2 == ''){
                            
                        }
                        else{
                            if(pamti_rest_2[brojac].id_projekat_N == pamti_rest_1[z].id_pr){   

                                    //console.log("Ima satnicu" + pamti_rest_1[z].id_pr) 
                                    //console.log("brojac" + brojac)
                                    if((pamti_rest_2.length - 1) == brojac){

                                    }
                                    else{
                                        brojac++; 
                                    }
                                    console.log("brojac++" + brojac)
                                    
                            }
                            else{
                                    
                            }
                        }       
                    }    
                }
                resp.json("odicnoo")  
            }  
        });
    }); 
});
*/



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

          console.log("ime" + insertValues.ime);
          console.log("nadimak" + insertValues.nadimak);
          console.log("prezime" + insertValues.prezime);
          console.log("email" + insertValues.email);
          //console.log("sifra" + insertValues.sifra);

          var sifra1 = insertValues.sifra;
          
          var hashSifra1 = bcrypt.hashSync(sifra1, bcrypt.genSaltSync(8));
          
          //res.json('USPESNA PRIJAVA NA SERVER');

            var query = connection.query("call Micko_Registrcija_Sifra('"+insertValues.ime+"','"+insertValues.nadimak+"','"+insertValues.prezime+"','"+insertValues.email+"','"+hashSifra1+"')",function(error,result){
            if (error) {
               
                  //res.status(500).send('Takav Nadimak,Mejl ili Sifra vec postoje');
                  res.json('postoji');

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
                 //res.json('USPESNA PRIJAVA NA SERVER');
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

         var upit4 = "select Projekti,id_pr from micko_projekti where id_pr in \
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
            
        //var upit1 = "SELECT Sifra_Klijent FROM micko_ime_sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";
        var upit1 = "SELECT Sifra_Klijent FROM micko_registracija as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";
        
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

        //var upit2 = "SELECT Nadimak_Klijent FROM micko_ime_sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";
        var upit2 = "SELECT Nadimak_Klijent FROM micko_registracija as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";

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
                            console.log("Usaooo1")
                            if(PorediGlobalono)
                            {
                                console.log("Usaooo2");
                                if(pamtiAktivan === 'aktivan')
                                {
                                    console.log("Usaooo 3");
                                    tokenSalji = jwt.sign({ime:pocetakNiz12, sifra:pocetakNiz1,admin:ispisADdmnK1 }, 'shhhhh', {
                                    //expiresInMinutes: 1440
                                    expiresIn : 60*60*24//VReme isteka tokena ceoo dan!!
                                     //   expiresIn : 20 
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
                                     resp.json("Neaktivni ste!!!");
                                }
                            }
                            else{                           
                              resp.json("Nije dobra Sifra");
                            }                                                                   
                  
                        }
                        else{

                            resp.json("Nije dobro Ime");

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
            res.json('Nije dobroo breee');
        }
    } catch (e) {
        console.log("ex:", e);
    }
}

router.use(KoristiToken1);

/*
router.get('/refresh/token',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Nadimak = query.ime;
    var Admin = query.admin;  

     tokenSalji = jwt.sign({ime:Nadimak,admin:Admin }, 'shhhhh', {
                                    //expiresInMinutes: 1440
                                    //expiresIn : 60*60*24//VReme isteka tokena ceoo dan!!
            expiresIn : 5000 
     });   


     resp.json({Token: tokenSalji});
     
})*/

router.get('/refresh/token',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Nadimak = query.ime;
    var Admin = query.admin;

    if(Admin == null || Admin == "" || Admin == NaN || Admin == undefined){
        resp.status(500).json("Neispravno je uneta vrednost za admin");
        return;
    }

    if(Admin != 'jeste')
    {   
        if(Admin != 'nije'){
            resp.status(500).json("Neispravno je uneta vrednost za admin");
            return;
        }
        else{
           
           console.log("Sve je ureduu!!");

        }      
         
    }

    if(Nadimak == "" || Nadimak == null || Nadimak == NaN || Nadimak == undefined){

        resp.status(500).json("Neispravno je uneto ime");
        return;

    }

    var tokenSaljiM = jwt.sign({ime:Nadimak,admin:Admin }, 'shhhhh', {
                                    //expiresInMinutes: 1440
            expiresIn : 60*60*24//VReme isteka tokena ceoo dan!!
        // expiresIn : 5000 
    });   

    console.log("Usaoooo");

    resp.json(tokenSaljiM);
    
     
})

router.get('/korisnik/email',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Nadimak = query.nadimak;

    connection.query("SELECT Email_Klijenta FROM micko_registracija where Nadimak_Klijent = '"+Nadimak+"'",function(error,rows,field) {
        
          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }

          resp.json(rest[0].Email_Klijenta);

    })   
})

router.get('/email',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Projekat = query.projekat;
    var sendMail = query.emailsend;

    console.log("Email" + sendMail);
    console.log("Projekat" + Projekat);

    //var cuvaj = Email('KC-Novi Sad - gas','miroslav.beronja@to-net.rs');
    var cuvaj = Email(''+Projekat+'',''+sendMail+'');
    //resp.json(cuvaj);

    transporter.sendMail(cuvaj, (error, info) => {
        if (error) {
            return console.log(error);
            resp.json(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            resp.json("Poslat mejl");
    });

})

router.get('/trenutna-godina',function(req,resp,next){

    console.log("Godinaaaaaa");
    var d = new Date();
    var n = d.getFullYear();

    resp.json(Number(n))
})

router.get('/token/provera',function(req,resp,next){
      
    // resp.send('Bravooo Micko');

     
})


router.get('/trenutna-nedelja',function(req,resp,nesxt){

    console.log("Nedeljaaaaa");
    var dateObj_tr = new Date();
	var month_tr = dateObj_tr.getUTCMonth() + 1; //months from 1-12
    var day_tr = dateObj_tr.getUTCDate();
	var year_tr = dateObj_tr.getUTCFullYear();

	var trenutni_datum = year_tr + "-" + month_tr + "-" + day_tr;

    var Trenutna_Nedelja = "select Nedelja_Trenutna('"+trenutni_datum+"') as Vreme";

             connection.query(Trenutna_Nedelja,function(error,rows){
                    
                if(error){
                    resp.json('Error',error);
                }
                var rest = [];
                for(var ii in rows){
                    var empobj = rows[ii];
                    rest.push(empobj);
                }

                resp.json(Number(rest[0].Vreme))           
    });

})

router.put('/tests-insert',function(req,resp,next){

    var reqObj = req.body;
    var query = url.parse(req.url,true).query;

    var Ime = query.ime;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;
 
    var insertValues = {

            "obj" :  reqObj.Objekti,
        
    };

    console.log("Ime" + Ime);
    console.log("Mesec" + Mesec);
    console.log("Nedelja" + Nedelja);
    console.log("Godina" + Godina);


    for(var ii in insertValues.obj){

        //console.log("Projekti " +insertValues.obj[ii].Projekti+ "Razovj " +insertValues.obj[ii].rezijski_poslovi);
         connection.query("update sve_jedna_tabela set Razvoj = '"+insertValues.obj[ii].Razvoj+"',odrzavanje = '"+insertValues.obj[ii].odrzavanje+"',\
            dokumentacija = '"+insertValues.obj[ii].dokumentacija+"',implementacija='"+insertValues.obj[ii].implementacija+"',rezijski_poslovi='"+insertValues.obj[ii].rezijski_poslovi+"' \
            where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+insertValues.obj[ii].id_pr+"' and nedelja = '"+Nedelja+"'\
            and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {

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

        });
    }

    resp.json("Insert bre");

})

/*
router.get('/trenutni-mesec',function(req,resp,next){

    console.log("Meseccccccc");
    var month = new Array();
		month[0] = "Januar";
		month[1] = "Februar";
		month[2] = "Mart";
		month[3] = "April";
		month[4] = "Maj";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Avgust";
		month[8] = "Septembar";
		month[9] = "Oktobar";
		month[10] = "Novembar";
		month[11] = "Decembar";

		var d = new Date();
		var n = month[d.getMonth()];
		//document.getElementById("demo").innerHTML = n;
		//alert(n);
		//return n;
        resp.json(n)
})*/

//Zastitaa
router.get('/opcije/satnica/nedelje',function(req,resp,next){//Prosledjuje se mesec i projekat,dobijamo koliko je koji korisnik radio na tom projektu
    //Koristi se na admin stranici!!
    var query = url.parse(req.url,true).query;
    var Projekat = query.projekat;
    var Godina = query.godina;  
    var Mesec = query.mesec;
    /*var Nedelja = query.nedelja;*/

    /*console.log("Nedelja" + Nedelja);
    console.log("Nedelja" + Mesec);*/
    varNizMesec = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar']
    var odabraniMesec,mesecUpit;
    var probaGodina;

    odabraniMesec = Mesec;

    if(odabraniMesec  == 'Januar'){mesecUpit = 0;}
    else if( odabraniMesec  == 'Februar'){mesecUpit = 1;}
    else if( odabraniMesec  == 'Mart'){mesecUpit = 2;}
    else if( odabraniMesec  == 'April'){mesecUpit = 3;}
    else if( odabraniMesec  == 'Maj'){mesecUpit = 4;}
    else if( odabraniMesec  == 'Jun'){mesecUpit = 5;}
    else if( odabraniMesec  == 'Jul'){mesecUpit = 6}
    else if( odabraniMesec  == 'Avgust'){mesecUpit = 7;}
    else if( odabraniMesec  == 'Septembar'){mesecUpit = 8;}
    else if( odabraniMesec  == 'Oktobar'){mesecUpit = 9;}
    else if( odabraniMesec  == 'Novembar'){mesecUpit = 10;}
    else if( odabraniMesec  == 'Decembar'){mesecUpit = 11;}
    else{ mesecUpit = 20;}



    if(Projekat == "" || Projekat == undefined || Projekat == NaN || Projekat == null){
        resp.status(500).json("Neispravno je unet projekat");
        return;
    }

    if(mesecUpit == 20){
        resp.status(500).json("Neispravno je unet mesec");
        return;
    }

    if(Mesec == "" || Mesec == undefined || Mesec == NaN || Mesec == null){
        resp.status(500).json("Neispravno je unet mesec");
        return;
    }

    if(Godina == "" || Godina == undefined || Godina == NaN || Godina == null){
        resp.status(500).json("Neispravno je uneta godina");
        return;
    }

    if(Godina.length > 4 || Godina.length <= 3){
        resp.status(500).json('Nije dobro uneta Godina');
        return;
    }

    for(var god in Godina){

        if(Godina[god] === " "){
            resp.status(500).json('Nije dobro uneta Godina');
            return;
        }

        probaGodina = Number(Godina[god]);
        //console.log("probaGodina" + probaGodina);
        var cuvajGodinu;
        cuvajGodinu = String(probaGodina);
        if(cuvajGodinu == 'NaN'){
            resp.status(500).json('Nije dobra godina');
            return;
        }
    }

    connection.query("select P.Projekti,S.id_projekat_D,M.Ime_Prezime,M.Nadimak_Klijent,S.id_nadimak_D,S.nedelja,S.mesec,S.Razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.rezijski_poslovi \
		from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
		on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id \
		where id_projekat_D = Micko_S_Projekat('"+Projekat+"') and mesec = '"+Mesec+"' and godina = '"+Godina+"' group by id_nadimak_D,id_projekat_D,nedelja,mesec order by mesec ",function(error,rows,field) {
            
            


          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }

          //resp.json(rest);
          resp.status(200).json(rest);
    })           

})

//Zastitaa
router.get('/projekti/satnica/nedelje',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;

    console.log("Nedelja" + Nedelja);
    console.log("Nedelja" + Mesec);

    varNizMesec = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar']
    var odabraniMesec,mesecUpit;
    var probaGodina;

    odabraniMesec = Mesec;

    if(odabraniMesec  == 'Januar'){mesecUpit = 0;}
    else if( odabraniMesec  == 'Februar'){mesecUpit = 1;}
    else if( odabraniMesec  == 'Mart'){mesecUpit = 2;}
    else if( odabraniMesec  == 'April'){mesecUpit = 3;}
    else if( odabraniMesec  == 'Maj'){mesecUpit = 4;}
    else if( odabraniMesec  == 'Jun'){mesecUpit = 5;}
    else if( odabraniMesec  == 'Jul'){mesecUpit = 6}
    else if( odabraniMesec  == 'Avgust'){mesecUpit = 7;}
    else if( odabraniMesec  == 'Septembar'){mesecUpit = 8;}
    else if( odabraniMesec  == 'Oktobar'){mesecUpit = 9;}
    else if( odabraniMesec  == 'Novembar'){mesecUpit = 10;}
    else if( odabraniMesec  == 'Decembar'){mesecUpit = 11;}
    else{ mesecUpit = 20;}

    if(mesecUpit == 20){
        resp.status(500).json("Neispravno je unet mesec");
    }

    if(Mesec == "" || Mesec == undefined || Mesec == NaN || Mesec == null){
        resp.status(500).json("Neispravno je unet mesec");
        return;
    }

    if(Godina == "" || Godina == undefined || Godina == NaN || Godina == null){
        resp.status(500).json("Neispravno je uneta godina");
        return;
    }

    if(Godina.length > 4 || Godina.length <= 3){
        resp.status(500).json('Nije dobro uneta Godina');
        return;
    }

    for(var god in Godina){

        if(Godina[god] === " "){
            resp.status(500).json('Nije dobro uneta Godina');
            return;
        }

        probaGodina = Number(Godina[god]);
        //console.log("probaGodina" + probaGodina);
        var cuvajGodinu;
        cuvajGodinu = String(probaGodina);
        if(cuvajGodinu == 'NaN'){
            resp.status(500).json('Nije dobra godina');
            return;
        }
    }

    connection.query("select P.Projekti,S.id_projekat_D,M.Ime_Prezime,M.Nadimak_Klijent,S.id_nadimak_D,S.nedelja,(S.Razvoj + S.odrzavanje + S.implementacija + S.dokumentacija + S.rezijski_poslovi) as sum \
            from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
            on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id where  mesec = '"+Mesec+"' and godina = '"+Godina+"' \
            group by id_nadimak_D,id_projekat_D,nedelja",function(error,rows,field) {
        
          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }

          resp.json(rest);

    })           

})

//Ovaj upit se ni ne koristii u aplikaciji Angular 2
router.get('/projekti/satnica',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;

    console.log("Nedelja" + Nedelja);
    console.log("Nedelja" + Mesec);

    connection.query("select P.Projekti,S.id_projekat_D,M.Ime_Prezime,M.Nadimak_Klijent,S.id_nadimak_D,S.nedelja,(S.Razvoj + S.odrzavanje + S.implementacija + S.dokumentacija + S.rezijski_poslovi) as sum \
            from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
            on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id where nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = 2017 \
            group by id_nadimak_D,id_projekat_D",function(error,rows,field) {
        
          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }

          resp.json(rest);

    })           

})

//Ne treba zastitaa
router.get('/lista/projekti',function(req,resp,next){//Nema potrebe za zastitama
      
      connection.query("SELECT * FROM micko_projekti",function(error,rows,field) {
        
          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }

          resp.json(rest);

      })           

})

//Ne treba zastitaa
router.get('/korisnici',function(req,resp,next){//Nema potrebe za zastitama
      
      connection.query("SELECT Ime_Prezime,Nadimak_Klijent FROM micko_registracija",function(error,rows,field) {
        
          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }

          resp.json(rest);

      })           

})

//Zastitaa
router.get('/korisnici/tabela',function(req,resp,next){

        var query = url.parse(req.url,true).query;
        var Mesec = query.mesec;
        var Nedelja = query.nedelja;
        var Nadimak = query.nadimak;
        var Godina = query.godina;

        var Godina = query.godina;

        console.log("Nedelja" + Nedelja);
        console.log("Nedelja" + Mesec);

        varNizMesec = ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar']
        var odabraniMesec,mesecUpit;
        var probaGodina;

        odabraniMesec = Mesec;

        if(odabraniMesec  == 'Januar'){mesecUpit = 0;}
            else if( odabraniMesec  == 'Februar'){mesecUpit = 1;}
            else if( odabraniMesec  == 'Mart'){mesecUpit = 2;}
            else if( odabraniMesec  == 'April'){mesecUpit = 3;}
            else if( odabraniMesec  == 'Maj'){mesecUpit = 4;}
            else if( odabraniMesec  == 'Jun'){mesecUpit = 5;}
            else if( odabraniMesec  == 'Jul'){mesecUpit = 6}
            else if( odabraniMesec  == 'Avgust'){mesecUpit = 7;}
            else if( odabraniMesec  == 'Septembar'){mesecUpit = 8;}
            else if( odabraniMesec  == 'Oktobar'){mesecUpit = 9;}
            else if( odabraniMesec  == 'Novembar'){mesecUpit = 10;}
            else if( odabraniMesec  == 'Decembar'){mesecUpit = 11;}
            else{ mesecUpit = 20;}

        if(mesecUpit == 20){
            resp.status(500).json("Neispravno je unet mesec");
        }

        if(Mesec == "" || Mesec == undefined || Mesec == NaN || Mesec == null){
            resp.status(500).json("Neispravno je unet mesec");
            return;
        }

        if(Nadimak == "" || Nadimak == undefined || Nadimak == NaN || Nadimak == null){
            resp.status(500).json("Neispravno je unet Nadimak");
            return;
        }   

        if(Godina == "" || Godina == undefined || Godina == NaN || Godina == null){
            resp.status(500).json("Neispravno je uneta godina");
            return;
        }

        for(var god in Godina){

            if(Godina[god] === " "){
                resp.status(500).json('Nije dobro uneta Godina');
                return;
            }

            probaGodina = Number(Godina[god]);
            //console.log("probaGodina" + probaGodina);
            var cuvajGodinu;
            cuvajGodinu = String(probaGodina);
            if(cuvajGodinu == 'NaN'){
                resp.status(500).json('Nije dobra godina');
                return;
            }
        }


        connection.query("select P.Projekti,S.id_projekat_D,M.Ime_Prezime,M.Nadimak_Klijent,S.id_nadimak_D,S.nedelja,S.mesec, \
            sum(S.razvoj + S.odrzavanje + S.dokumentacija + S.implementacija + S.rezijski_poslovi) as sum\
            from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
            on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id \
            where id_nadimak_D = Micko_S('"+Nadimak+"') and godina = '"+Godina+"' and mesec = '"+Mesec+"' group by id_nadimak_D,id_projekat_D,nedelja,mesec order by mesec ",function(error,rows,field) {
            
                if(error) {
                        resp.json('Error',error);           
                }
                var rest = [];

                for(var ii in rows) {
                    var empobj = rows[ii];
                    rest.push(empobj);
                }

                resp.status(200).json(rest);
      })           
})

//Dodato zbog Angulara 2,ne koristi se vise u aplikaciji!!
router.get('/insert-u-tabelu-micko-nedelja-mesec-sati',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina
    console.log("MesecInsert" + Mesec)
    console.log("NedeljaInsert" + Nedelja) 
    console.log("GodinaInsert" + Godina)

    //connection.query("select broj_sati,id_projekat_N from micko_nedelja_mesec_sati \
     //         where id_nadimak_N = Micko_S('"+Ime+"') and mesec = '"+Mesec+"' and nedelja = '"+Nedelja+"' and godina = '"+Godina+"'",function(error,rows,field) {
       //connection.query("SELECT Projekti,id_pr FROM micko_projekti",function(error,rows,field) {

    connection.beginTransaction(function(error) {     

        connection.query("select Projekti,id_pr from micko_projekti where id_pr in \
             (select id_projekat from micko_pr_nadimak where id_korisnik = \
             (select id from micko_registracija where Nadimak_Klijent = '"+Ime+"')) ORDER BY id_pr",function(error,rows,field) {


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

            if(error) {
                resp.json('Error',error);           
            }
            var rest_1 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_1.push(empobj);
            }

            pamti_rest_1 = rest_1;
            // console.log(pamti_rest_1[0].Projekti)

    });
        
        connection.query("select broj_sati,id_projekat_N from micko_nedelja_mesec_sati where\
                id_nadimak_N = Micko_S('"+Ime+"')\
                and mesec = '"+Mesec+"' and nedelja ='"+Nedelja+"' and godina = '"+Godina+"' ORDER BY id_projekat_N",function(error,rows,field) {
                   // console.log("cuvaj_bre_majmune" + cuvaj_bre_majmune)
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

            if(error) {
                resp.json('Error',error);           
            }
            var rest_2 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_2.push(empobj);
            }
            var brojac = 0
           
            pamti_rest_2 = rest_2;
            if(pamti_rest_2.length == pamti_rest_1.length){

                resp.json("odicnoo")
                console.log("Nije potreban insert")
            }
            else{
                for(var z=0; pamti_rest_1.length > z ; z++){
                    
                    if(pamti_rest_1.length)
                    {
                        
                        //if(pamti_rest_2 == '' || pamti_rest_2[brojac].id_projekat_N == pamti_rest_1[z].id_pr)
                        if(pamti_rest_2 == ''){
                            //console.log("pamti_rest_2 == ''" + pamti_rest_1[z].id_pr)
                            connection.query("insert into micko_nedelja_mesec_sati(id_nadimak_N,id_projekat_N,nedelja,mesec,broj_sati,godina)\
                                    value ( Micko_S('"+Ime+"'),Micko_S_Projekat('"+pamti_rest_1[z].Projekti+"'),'"+Nedelja+"','"+Mesec+"',0,'"+Godina+"')",function(error,rows,field) {
                                    
                            })
                            // console.log("Forrrr")
                             console.log("Praznooooooo!!")
                        }
                        else{
                            console.log("Nije skroz prazno!!")
                            if(pamti_rest_2[brojac].id_projekat_N == pamti_rest_1[z].id_pr){   

                                    //console.log("Ima satnicu" + pamti_rest_1[z].id_pr) 
                                    //console.log("brojac" + brojac)
                                    if((pamti_rest_2.length - 1) == brojac){

                                    }
                                    else{
                                        brojac++; 
                                    }
                                    console.log("brojac++" + brojac)
                                    
                            }
                            else{
                                    //console.log("Upisssssiiiiiiiiiiiiiiiiiiiiiiiii")
                                    //console.log("Nema satnicu" + pamti_rest_1[z].id_pr)
                                    connection.query("insert into micko_nedelja_mesec_sati(id_nadimak_N,id_projekat_N,nedelja,mesec,broj_sati,godina)\
                                    value ( Micko_S('"+Ime+"'),Micko_S_Projekat('"+pamti_rest_1[z].Projekti+"'),'"+Nedelja+"','"+Mesec+"',0,'"+Godina+"')",function(error,rows,field) {
                                    
                                    })
                                    console.log("ELSEEEE")
                            }
                        }       
                    }    
                }
                resp.json("odicnoo")  
            }  
        });
    }); 
});

//Dodato zbog Angulara 2,ne koristi se vise u aplikaciji!!
router.get('/Select-projekti-satnica-token',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina
    console.log("Ime" + Ime)
    console.log("Mesec" + Mesec)
    console.log("Nedelja" + Nedelja)
    console.log("Godina" + Godina)

    /*connection.query("select broj_sati,id_projekat_N from micko_nedelja_mesec_sati where\
                id_nadimak_N = Micko_S('"+Ime+"')\
                and mesec = '"+Mesec+"' and nedelja ='"+Nedelja+"' and godina = '"+Godina+"'",function(error,rows,field) {*/
    connection.query("SELECT M.Projekti,A.broj_sati FROM micko_nedelja_mesec_sati as A inner JOIN micko_projekti AS M ON \
                      A.id_projekat_N = M.id_pr where id_nadimak_N = Micko_S('"+Ime+"') and mesec = '"+Mesec+"' and  nedelja ='"+Nedelja+"' and godina = '"+Godina+"' order by id_pr",
                      function(error,rows,field) {                

            if(error) {
                resp.json('Error',error);           
            }
            var rest_4 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_4.push(empobj);
            }

            resp.json(rest_4)

        });

})

//Dodato zbog Angulara 2
router.get('/puni-ime-prezime',function(req,resp,next){
      
      var query = url.parse(req.url,true).query;
      var Ime = query.ime;

      connection.query("select Ime_Prezime from micko_registracija where Nadimak_Klijent = '"+Ime+"'",function(error,rows,field) {
        
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

//Zastitaa
router.get('/projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;
    
    var rest = [];
    var rest_33 = [];
    var rest_1 = [];
    var restPrKor = [];
    var rest12 = [];
    var brojac = 0;
    var brojac1 = 0;

    var odabraniMesec,mesecUpit;
    var prihvati;
    var probaNedelja;
    var godinaUpit = Godina;
    var probaGodina;


    //Zastita!!
    if(Ime == "" || Ime == null || Ime == NaN)
    {
        resp.status(500).json('Nije dobro uneto ime');
        return;
    }

    //Godinaa
    if(Godina == "" || Godina == null || Godina == NaN){
        resp.status(500).json('Nije dobro uneta godina');
        return;    
    }
    for(var god in Godina){

        if(Godina[god] === " "){
            resp.status(500).json('Nije dobro uneta Godina');
            return;
        }

        probaGodina = Number(Godina[god]);
        //console.log("probaGodina" + probaGodina);
        var cuvajGodinu;
        cuvajGodinu = String(probaGodina);
        if(cuvajGodinu == 'NaN'){
            resp.status(500).json('Nije dobra godina');
            return;
        }
    }

    //Mesec
    if(Mesec == "" || Mesec == null || Mesec == NaN){

        resp.status(500).json('Nije dobro unet mesec');
        return;
    }

    prihvati = Meseci(Mesec)
    if(prihvati == 20){
        resp.status(500).json('Nije dobro unet mesec');
        return;
    }

    //Nedelje
    var pamtiNedelje;
    pamtiNedelje = broj_nedelja( prihvati,godinaUpit);
    
    var listaBrojaNedelja;
    var objektiNedelje = [];

    for(var index = pamtiNedelje[0]; index<=pamtiNedelje[1]; index++){
        listaBrojaNedelja = index;
    }

    for(var i = 1; listaBrojaNedelja >= i ; i++){
        objektiNedelje[i-1] = i;  
    }

    if(Nedelja > objektiNedelje.length){

        resp.status(500).json('Ne postoji toliki broj nedelja');
        return;
    }

    if(Nedelja == "" || Nedelja == undefined || Nedelja == NaN){
        resp.status(500).json('Fali nedelja');
        return;
    }

    for(var ned in Nedelja){

        if(Nedelja[ned] === " "){
            resp.status(500).json('Nije dobro uneta Nedelja');
            return;
        }

        probaNedelja = Number(Nedelja[ned]);
        //console.log("probaGodina" + probaGodina);
        var cuvajNedelju;
        cuvajNedelju = String(probaNedelja);
        if(cuvajNedelju == 'NaN'){
            resp.status(500).json('Nije dobra nedelja');
            return;
        }
    }


    //console.log("Errorrrrrrrrrrrrrrrrrrrrrrr");
    //godina
    

    connection.beginTransaction(function(error) {    

        connection.query("select  P.id_pr,Projekti,R.Nadimak_Klijent from micko_projekti as P INNER JOIN  micko_pr_nadimak as M on P.id_pr = M.id_projekat \
                INNER JOIN micko_registracija as R on M.id_korisnik = R.id where R.id = Micko_S('"+Ime+"') order by id_pr",function(error,rows,field) {

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
            if(error) {
                console.log("Errorrrrrrrrrrrrrrrrrrrrrrr");
                resp.json('Error',error);           
            }
            for(var ii in rows) {
                var empobj = rows[ii];
                rest.push(empobj);
            }  

        });

        connection.query("select P.id_pr,P.Projekti,S.Razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.rezijski_poslovi from micko_projekti as P  LEFT JOIN sve_jedna_tabela as S \
            on P.id_pr = S.id_projekat_D where id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"' order by P.id_pr",function(error,rows,field) {

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
    

            if(error) {
                resp.json('Error',error);           
            }
            
            for(var ii in rows) {
                var empobj = rows[ii];
                restPrKor.push(empobj);
            }  

            console.log("rest.length" + rest.length);
            console.log("restPrKor.length"+ restPrKor.length);

            if(restPrKor.length == 0){
                 //console.log("restPrKor" + restPrKor);
                 for(var kk in rest){

                        console.log("rest" + rest[kk].Projekti);
                        connection.query("insert into sve_jedna_tabela(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,Razvoj,odrzavanje,dokumentacija,implementacija,rezijski_poslovi) value \
                                            (Micko_S('"+Ime+"'),'"+rest[kk].id_pr+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                        });
                 }
            }
            else{
                if(rest.length == restPrKor.length){

                    console.log("Jednako");

                }
                else if(rest.length < restPrKor.length)
                {
                    console.log("Manje");

                    for(var ii in restPrKor){

                        if(restPrKor[ii].Projekti == rest[brojac1].Projekti){
                            
                            if(rest.length - 1 > brojac1){

                                brojac1 = brojac1 + 1;

                            }
                               
                        }
                        else{

                            console.log("Mickoooo")
                            console.log("rest[ii].Projekti" + restPrKor[ii].Projekti + "-----" + restPrKor[ii].id_pr);
                            connection.query("delete from sve_jedna_tabela where id_nadimak_D =  Micko_S('"+Ime+"') and id_projekat_D = '"+restPrKor[ii].id_pr+"'",function(error,rows,field) {

                            });
                        }
                    }
                }
                else{

                    console.log("Nijeeee");
                    for(var ii in rest){
                        //console.log("rest[ii].Projekti" + rest[ii].Projekti);
                        console.log("brojac" + brojac);
                        console.log("ii" + ii);
                        if(rest[ii].Projekti == restPrKor[brojac].Projekti){
                            
                            if(restPrKor.length - 1 > brojac){

                                brojac = brojac + 1;

                            }
                               
                        }
                        else{

                            console.log("Mickoooo")
                            console.log("rest[ii].Projekti" + rest[ii].Projekti);
                            connection.query("insert into sve_jedna_tabela(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,Razvoj,odrzavanje,dokumentacija,implementacija,rezijski_poslovi) value \
                                            (Micko_S('"+Ime+"'),'"+rest[ii].id_pr+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                            }); 
                        }
                }
            }
        }

        connection.query("select P.id_pr,P.Projekti,S.Razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.rezijski_poslovi from micko_projekti as P  LEFT JOIN sve_jedna_tabela as S \
            on P.id_pr = S.id_projekat_D where id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"' order by P.id_pr",function(error,rows,field) {

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
        

            if(error) {
                resp.json('Error',error);           
            }
            

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_1.push(empobj);
            }

            console.log("Krajjjjjjjjjjjjjjjjjjjjjjjj");
            resp.json(rest_1);

        });
     });   

    /*connection.query("select P.id_pr,P.Projekti,R.Nadimak_Klijent from micko_projekti as P	INNER JOIN  micko_pr_nadimak as M on P.id_pr = M.id_projekat \
                INNER JOIN micko_registracija as R on M.id_korisnik = R.id where R.id = Micko_S('"+Ime+"')",function(error,rows,field) {

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
        

            if(error) {
                resp.json('Error',error);           
            }
            var rest_1 = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest_1.push(empobj);
            }    
            
            //resp.json(rest_1)
            if(rest.length == rest_1.length){

                console.log("Ne potreban insert");

            }
            else{


                if(rest == ""){
                    
                        for(var ii in rest_1)
                        {

                            console.log("prazam niz" + rest_1[ii].Projekti);

                            connection.query("insert into sve_jedna_tabela(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,Razvoj,odrzavanje,dokumentacija,implementacija,rezijski_poslovi) value \
                                        (Micko_S('"+Ime+"'),'"+rest_1[ii].id_pr+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                                                
                            }); 
                        }
                }  
                else{

                    for(var ii in rest_1){

                        if(rest[brojac].Projekti == rest_1[ii].Projekti){

                            if(rest.length - 1 > brojac){

                            brojac = brojac + 1;

                            }
                            else{

                                //console.log("brojac" + brojac );

                            }
                        }
                        else{//Projekti koji nemaju satnicu

                            console.log("Projekti  " +rest_1[ii].id_pr)
                                
                            //connection.query("insert into sve_jedna_tabela(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,Razvoj,odrzavanje,dokumentacija,implementacija,rezijski_poslovi) value \
                             //       (Micko_S('"+Ime+"'),'"+rest_1[ii].id_pr+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                                            
                            //});   
                        }  
                    }
                }
            }   

            connection.query("select S.id_nadimak_D,S.id_projekat_D,S.nedelja,S.mesec,S.godina,P.Projekti,S.Razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.rezijski_poslovi from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
                on P.id_pr = S.id_projekat_D where id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"' ORDER BY id_projekat_D",function(error,rows,field) {

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

                if(error) {
                    resp.json('Error',error);           
                }
                
            

                for(var ii in rows) {
                    var empobj = rows[ii];
                    rest12.push(empobj);
                }   
                

                resp.json(rest12)

          });
    });*/

  });
});
  
function broj_nedelja(month,year){
    
    var yearStart;
    var firstDayOfMonth;
    var lastDayOfMonth;
    var firstWeekNumber;
    var lastWeekNumber;
    var year = year || new Date().getFullYear();
	yearStart = new Date(year,0,1); // 1st Jan of the Year

    firstDayOfMonth = new Date(year, month , 1);
    firstWeekNumber = Math.ceil((((firstDayOfMonth - yearStart) / 86400000) +yearStart.getDay()+ 1)/7);//Prva nedelja u mesecu

	lastDayOfMonth = new Date(year, month+1, 0); // Last date of the Month
	lastWeekNumber = Math.ceil(( ( (lastDayOfMonth - yearStart) / 86400000) + yearStart.getDay()+ 1)/7);//Poslednja nedelja u mesecu

	var razlika = (lastWeekNumber - firstWeekNumber) + 1;//10-6 u Februaru
	var poslednja_nedelja = razlika;
	var prva_nedelja = 1;
 
		return  [prva_nedelja,poslednja_nedelja];

}

//Zastitaa
router.put('/projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Projekat = query.projekat;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;
    var Razvoj = query.razvoj;
    var Odrzavanje = query.odrzavanje;
    var Dokumentacija = query.dokumentacija;
    var Implementacija = query.implementacija;
    var Reziski_poslovi = query.reziskiposlovi;

    var probaj;
    var probaGodina;
    var probaNedelja;
    var probaRazvoj;
    var probaOdrzavanje;
    var probaDokumentacija;
    var probaImplementacija;
    var probaReziski_poslovi;
    var brojac = 0;
    
    //console.log("Ime" + Ime);
    //console.log("Projekat" + Projekat)
    console.log("Mesec" + Mesec)
    console.log("Nedelja" + Nedelja)
    console.log("Godina" + Godina)
    console.log("Razvoj" + Razvoj)
    console.log("Odrzavanje" + Odrzavanje)
    console.log("Dokumentacija" + Dokumentacija)
    console.log("Implementacija" + Implementacija)
    console.log("Reziski_poslovi" + Reziski_poslovi)
  
    var odabraniMesec = Mesec;
    var godinaUpit = Godina;
    var mesecUpit;

     //Meseciiiiii
    

    if(Mesec == "" || Mesec == undefined || Mesec == NaN){
        resp.status(500).json("Nije dobro uneta vrednost za mesec");
        return;
    }

    //Godinaaaaa
    if(Godina.length > 4 || Godina.length <= 3){
        resp.status(500).json('Nije dobro uneta Godina');
        return;
    }

    for(var god in Godina){

        if(Godina[god] === " "){
            resp.status(500).json('Nije dobro uneta Godina');
            return;
        }

        probaGodina = Number(Godina[god]);
        //console.log("probaGodina" + probaGodina);
        var cuvajGodinu;
        cuvajGodinu = String(probaGodina);
        if(cuvajGodinu == 'NaN'){
            resp.status(500).json('Nije dobra godina');
            return;
        }
    }
    if(Godina == "" || Godina == undefined || Godina == NaN){
        resp.status(500).json('Fali godina');
        return;
    }


    //Nedeljeeeee
    if(odabraniMesec  == 'Januar'){mesecUpit = 0;}
    else if( odabraniMesec  == 'Februar'){mesecUpit = 1;}
    else if( odabraniMesec  == 'Mart'){mesecUpit = 2;}
    else if( odabraniMesec  == 'April'){mesecUpit = 3;}
    else if( odabraniMesec  == 'Maj'){mesecUpit = 4;}
    else if( odabraniMesec  == 'Jun'){mesecUpit = 5;}
    else if( odabraniMesec  == 'Jul'){mesecUpit = 6}
    else if( odabraniMesec  == 'Avgust'){mesecUpit = 7;}
    else if( odabraniMesec  == 'Septembar'){mesecUpit = 8;}
    else if( odabraniMesec  == 'Oktobar'){mesecUpit = 9;}
    else if( odabraniMesec  == 'Novembar'){mesecUpit = 10;}
    else if( odabraniMesec  == 'Decembar'){mesecUpit = 11;}
    else{ mesecUpit = 20;}

    if(mesecUpit == 20){
       resp.status(500).json('Nije dobar mesec');    
        return;
    }

    var datum_sada_prijava = new Date();
    var pamtiNedelje;

    pamtiNedelje = broj_nedelja( mesecUpit,godinaUpit);
    
    var listaBrojaNedelja;
    var objektiNedelje = [];

    for(var index = pamtiNedelje[0]; index<=pamtiNedelje[1]; index++){
        listaBrojaNedelja = index;
    }

    for(var i = 1; listaBrojaNedelja >= i ; i++){

        objektiNedelje[i-1] = i; 
        brojac++;  
    }

    if(Nedelja > objektiNedelje.length){

        //console.log("Usaoooo");
        resp.status(500).json('Ne postoji toliki broj nedelja');
        return;
    }

    if(Nedelja == "" || Nedelja == undefined || Nedelja == NaN){
        resp.status(500).json('Fali nedelja');
        return;
    }

    for(var ned in Nedelja){

        if(Nedelja[ned] === " "){
            resp.status(500).json('Nije dobro uneta Nedelja');
            return;
        }

        probaNedelja = Number(Nedelja[ned]);
        //console.log("probaGodina" + probaGodina);
        var cuvajNedelju;
        cuvajNedelju = String(probaNedelja);
        if(cuvajNedelju == 'NaN'){
            resp.status(500).json('Nije dobra nedelja');
            return;
        }
    }
    ///

    //Ovde treba da se uradi zastita
    if(Ime == "" || Ime == undefined || Ime == NaN){
        resp.status(500).json('Fali ime');
        return;
    }

    for(var pr in Projekat){

        if(Projekat[pr] === " "){
            resp.status(500).json('Nije dobro unet Projekat');
            return;
        }

        probaj = Number(Projekat[pr]);
        var cuvaj;
        cuvaj = String(probaj);

        if(cuvaj == 'NaN'){
            resp.status(500).json('Nije dobar projekat');
            return;
        }
    }

    if(Projekat == "" || Projekat == undefined || Projekat == NaN){//U text ne sme da bude slova
        resp.status(500).json('Fali projekat');
        return;
    }

    //Razvoj
    for(var pr in Razvoj){

        if(Razvoj[pr] === " "){
            resp.status(500).json('Nije dobro uneta vrednost za Razvoj');
            return;
        }

        probajRazvoj = Number(Razvoj[pr]);
        var cuvajRazvoj;
        cuvajRazvoj = String(probajRazvoj);

        if(cuvajRazvoj == 'NaN'){
            resp.status(500).json('Nije dobro uneta vrednost za Razvoj');
            return;
        }
    }
    if(Razvoj == "" || Razvoj == undefined || Razvoj == null ||  Razvoj == NaN){
        resp.status(500).json('Nije dobro uneta vrednost za razvojj');
        return;
    }
    
    //Odrzavanje
    for(var od in Odrzavanje){

        if(Odrzavanje[od] === " "){
            resp.status(500).json('Nije dobro uneta vrednost za Odrzavanje');
            return;
        }

        probajOdrzavanje= Number(Odrzavanje[od]);
        var cuvajOdrzavanje;
        cuvajOdrzavanje = String(probajOdrzavanje);

        if(cuvajOdrzavanje == 'NaN'){
            resp.status(500).json('Nije dobro uneta vrednost za Odrzavanje');
            return;
        }
    }

    if(Odrzavanje == "" || Odrzavanje == undefined || Odrzavanje == null || Odrzavanje == NaN)
    {
        resp.status(500).json('Nije dobro uneta vrednost za odrzavanje');
        return;
    }

    //Dokumentacija
    for(var dok in Dokumentacija){

        if(Dokumentacija[dok] === " "){
            resp.status(500).json('Nije dobro uneta vrednost za Dokumentacija');
            return;
        }

        probajDokumentacija= Number(Dokumentacija[dok]);
        var cuvajDokumentacija;
        cuvajDokumentacija = String(probajDokumentacija);

        if(cuvajDokumentacija == 'NaN'){
            resp.status(500).json('Nije dobro uneta vrednost za Dokumentacija');
            return;
        }
    }

    if(Dokumentacija == "" || Dokumentacija == undefined || Dokumentacija == null){
        resp.status(500).json('Nije dobro uneta vrednost za dokumentacija');
        return;
    }

    //Implementacija
    //console.log("Implementacija" + Implementacija)
    for(var im in Implementacija){

        //console.log("Implementacija[im]" + Implementacija[im]);
        if(Implementacija[im] === " "){
            resp.status(500).json('Nije dobro uneta vrednost za Implementacija');
            return;
        }
        probajImplementacija= Number(Implementacija[im]);
        var cuvajImplementacija;
        cuvajImplementacija = String(probajImplementacija);

        console.log("cuvajImplementacija" + cuvajImplementacija);
        if(cuvajImplementacija == 'NaN' || cuvajImplementacija == ' '){
            resp.status(500).json('Nije dobro uneta vrednost za Implementacija');
            return;
        }
    }
    if(Implementacija == "" || Implementacija == undefined || Implementacija == null){
        resp.status(500).json('Nije dobro uneta vrednost za implementacija');
        return;
    }

    //Reziski poslovi
    for(var rez in Reziski_poslovi){

        if(Reziski_poslovi[rez] === " "){
            resp.status(500).json('Nije dobro uneta vrednost za REzijske poslove');
            return;
        }    

        probaReziski_poslovi= Number(Reziski_poslovi[od]);
        var cuvajReziski_poslovi;
        cuvajReziski_poslovi = String(probaReziski_poslovi);

        if(cuvajReziski_poslovi == 'NaN'){
            resp.status(500).json('Nije dobro uneta vrednost za Reziski poslovi');
            return;
        }
    }

    if(Reziski_poslovi == "" || Reziski_poslovi == undefined || Reziski_poslovi == null){

    }

    //resp.json('Uspesan Insert' + Implementacija);

    connection.query("update sve_jedna_tabela set Razvoj = '"+Razvoj+"',odrzavanje = '"+Odrzavanje+"',dokumentacija = '"+Dokumentacija+"',implementacija='"+Implementacija+"',rezijski_poslovi='"+Reziski_poslovi+"' \
         where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+Projekat+"' and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {
             
        if (error) {
            resp.json('Error',error);
        }
        else {
             //resp.json('Uspesan Insert');
             resp.status(200).json('Uspesan Insert');
        }

    });

});  

//Ne koristi se u aplikaciji!!
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

    console.log("11" + insertValues.Nadimak_Klijent)
    console.log("22" + insertValues.Projekti)
    console.log("33" + insertValues.nedelja)
    console.log("44" + insertValues.mesec)
    console.log("55" + insertValues.broj_sati)
    console.log("66" + insertValues.godina)

          //resp.json('Uspesan Insert');

    connection.query("call Procedura_Null('"+insertValues.Nadimak_Klijent+"','"+insertValues.Projekti+"','"+insertValues.nedelja+"','"+insertValues.mesec+"','"+insertValues.broj_sati+"','"+insertValues.godina+"')",function(error,rows,field) {
            
        if(error){
            resp.status(500).send('Nije dobro upisanooooo');
            console.log("Nije dobrooo")
        }
        else{
            resp.json('Uspesan Insert');
            console.log("Uspesan Insert")
        }

    });
});

//Ne koristi se u aplikacija!!
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

//Ne koristi se u aplikacija!!
router.get('/FunkcijeProba/Izvestaj',function(req,resp,next){
   
      var query = url.parse(req.url,true).query;
      var NadimakI = query.nadimak;
      var ProjekatI = query.projekat;
      var MesecI = query.mesec;
    
      connection.query("select sum(broj_sati) from micko_nedelja_mesec_sati where id_nadimak_N = Micko_S('"+NadimakI+"') and id_projekat_N = Micko_S_Projekat('"+ProjekatI+"') and mesec = '"+MesecI+"'",function(error,rows,field) {
        
          if(error){
            resp.json('Error',error);
          }
          var rest = [];
          
            for(var ii in rows){

                var empobj = rows[ii];
                rest.push(empobj);
            }

                prvi = JSON.stringify(rest);
                drugi = prvi.substr(19);
                treci = prvi.substr(19,drugi.length - 2);

                resp.json(treci);

        });  
     
})

//Ne koristi se u aplikacija!!
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

//Ne koristi se u aplikacija!!
router.get('/Spojeno-u-nadimak',function(req,resp,next){
      
    
     var query = url.parse(req.url,true).query;
     var imePrijava1 = query.ime;
     var godina = query.godina;
     console.log("imePrijava1" + imePrijava1)
    
     connection.query("select *,(Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti(Micko_Spajanje_U_Nadimak('"+imePrijava1+"')) and godina = '"+godina+"' UNION ALL\
         select 'id','id_nadimak_M','id_projekat_M','SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
         sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),'godina',sum('Sum')\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti(Micko_Spajanje_U_Nadimak('"+imePrijava1+"')) and godina = '"+godina+"'",function(error,rows,field) {

     /*connection.query("select *,(Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti('"+imePrijava1+"') and godina = '"+godina+"' UNION ALL\
         select 'id','id_nadimak_M','id_projekat_M','SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
         sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),'godina',sum('Sum')\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti('"+imePrijava1+"') and godina = '"+godina+"'",function(error,rows,field) {*/        


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

//Ne koristi se u aplikacija!!
router.get('/Spojeno-u-nadimak-tabela-nije-admin',function(req,resp,next){
      
    
     var query = url.parse(req.url,true).query;
     var imePrijava1 = query.ime;
     var godina = query.godina;


             if(imePrijava1 == ""){

                resp.json("loseee breeee");

             }
    
     connection.query("select *,(Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti('"+imePrijava1+"') and godina = '"+godina+"' UNION ALL\
         select 'id','id_nadimak_M','id_projekat_M','SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
         sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),'godina',sum('Sum')\
         from micko_meseci_tabela where id_nadimak_M = Micko_Zapamti('"+imePrijava1+"') and godina = '"+godina+"'",function(error,rows,field) {


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

//Ne koristi se u aplikacija!!
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
//Nije potreba zastitaa!!
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

//Ne treba zastitaa!!
router.get('/korisnici/aktivni',function(req,resp,next){
      
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

//Ne treba zastitaa!!
router.get('/korisnici/neaktivni',function(req,resp,next){
      
    
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

//Ne koristi se u aplikaciji
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

//Zastitaa
router.get('/korisnici/pr/nerade',function(req,resp,next){
      
    var query = url.parse(req.url,true).query;
    var imePrijava12 = query.ime;


    /*if(imePrijava12 == "" || imePrijava12 == null || imePrijava12 == NaN || imePrijava12 == undefined)
    {
        resp.status(500).json("Neispravno je uneto ime");
        return;
    }   */ 
    
    connection.query("select Projekti from micko_projekti where id_pr not in \
        (select id_projekat from micko_pr_nadimak where id_korisnik = \
        (select id from micko_registracija where Nadimak_Klijent = '"+imePrijava12+"'))",function(error,rows,field) {
     
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

//Ne koristi se u aplikaciji
router.post('/Upis-Projekta-koji-nepostoji',function(req,resp,next){

    var reqObj = req.body;
    var probaGodina;
    var insertValues = {

        "Nadimak" :  reqObj.Nadimak,
        "Projekat" : reqObj.Projekat,
        "godina": reqObj.godina
        
    };

    console.log("Nadimak" + insertValues.Nadimak)
    console.log("Projekat" + insertValues.Projekat)  
    console.log("godina" + insertValues.godina)       

    if(Godina == "" || Godina == undefined || Godina == NaN || Godina == null){
        resp.status(500).json("Neispravno je uneta godina");
        return;
    }

    for(var god in Godina){

        if(Godina[god] === " "){
            resp.status(500).json('Nije dobro uneta Godina');
            return;
        }

        probaGodina = Number(Godina[god]);
        //console.log("probaGodina" + probaGodina);
        var cuvajGodinu;
        cuvajGodinu = String(probaGodina);
        if(cuvajGodinu == 'NaN'){
            resp.status(500).json('Nije dobra godina');
            return;
        }
    }

    //U connection.query je dodata funkcija "Micko_Spajanje_U_Nadimak" koja ime i prezime pretvori u nadimak->
    //->jer nam je to potrebno da bi mogli da snimimo projekat
     connection.query("call Micko_Admin_Projekat_Korisnik(Micko_Spajanje_U_Nadimak('"+insertValues.Nadimak+"'),'"+insertValues.Projekat+"','"+insertValues.godina+"')",function(error,rows,field) {
        
        if(error)
        {
            //console.log('Error',error);
            //resp.json('Error',error);
            resp.status(500).json('Nije dobro upisanooooo');
        }
        var rest = [];

        for(var ii in rows){

            var empobj = rows[ii];
            rest.push(empobj);

        }

        resp.json(rest);
       
    });  
})

//Zastitaa
router.post('/projekat/admin',function(req,resp,next){

    var reqObj = req.body;
    var probaGodina;
    var insertValues = {

            "Nadimak" :  reqObj.Nadimak,
            "Projekat" : reqObj.Projekat,
            "godina": reqObj.godina
    };

    console.log("Nadimak" + insertValues.Nadimak)
    console.log("Projekat" + insertValues.Projekat)  
    console.log("godina" + insertValues.godina) 

    var Godina;
    Godina = insertValues.godina; 
    
    if(Godina == "" || Godina == undefined || Godina == NaN || Godina == null){
        resp.status(500).json("Neispravno je uneta godina");
        return;
    }

    if(Godina.length > 4 || Godina.length <= 3){
        resp.status(500).json('Nije dobro uneta Godina');
        return;
    }

    for(var god in Godina){

        if(Godina[god] === " "){
            resp.status(500).json('Nije dobro uneta Godina');
            return;
        }

        probaGodina = Number(Godina[god]);
        //console.log("probaGodina" + probaGodina);
        var cuvajGodinu;
        cuvajGodinu = String(probaGodina);
        if(cuvajGodinu == 'NaN'){
            resp.status(500).json('Nije dobra godina');
            return;
        }
    }
    //U connection.query je dodata funkcija "Micko_Spajanje_U_Nadimak" koja ime i prezime pretvori u nadimak->
    //->jer nam je to potrebno da bi mogli da snimimo projekat
    //Micko_Admin_Projekat_Korisnik upisuje u tabelu micko_meseci_tabela koji mi nije potrebna!!!!
    connection.query("call Micko_Admin_Projekat_Korisnik('"+insertValues.Nadimak+"','"+insertValues.Projekat+"','"+insertValues.godina+"')",function(error,rows,field) {
        
        if(error){
          resp.status(500).json('Nije dobro upisanooooo');
        }
        var rest = [];

        for(var ii in rows){
            
            var empobj = rows[ii];
            rest.push(empobj);
        }

        resp.json(rest);
       
    });  
})

//Ne treba zastita za projekat!!
router.post('/projekat/novi',function(req,resp,next){

    var reqObj = req.body;

    var insertValues = {

            "Projekat" :  reqObj.Projekat,
        
    };

    connection.query("insert into micko_projekti(Projekti) value('"+insertValues.Projekat+"');",function(error,rows,field) {
        
        if(error)
        {
        
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

//Ne koristi se u aplikaciji
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

//Ne treba zastita jer se ne unosi godina kao kod posta!!
router.delete('/projekat/admin',function(req,resp,next){
        
    var query = url.parse(req.url,true).query;
    var NadimakBrisanje = query.NadimakBrisanje;
    var ProjekatBRisanje = query.ProjekatBRisanje;

    //resp.json('Uspesao Brisanje');
    
    connection.query("call Micko_Admin_Brisanje('"+NadimakBrisanje+"','"+ProjekatBRisanje+"')",function(error,rows,field) {
    
        if(error){
            //console.log('Error',error);
            resp.status(500).json('Nije dobro upisanooooo');
        }
        else{

            resp.json('Uspesao Brisanje');
        }
    }); 
})

//Ne koristi se u aplikaciji
router.get('/Lista-projekata-na-kojim-korisnik-radi',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var imePrijavaUklanjanje = query.ime;
    
    connection.query("select Projekti,id_pr from micko_projekti where id_pr in \
        (select id_projekat from micko_pr_nadimak where id_korisnik = (select id from micko_registracija where Nadimak_Klijent = Micko_Spajanje_U_Nadimak('"+imePrijavaUklanjanje+"')))",function(error,rows,field) {   

          if(error){
              
                //console.log('Error',error);
                resp.json('Error',error);
          }

            var rest = [];

                for(var ii in rows){

                    var empobj = rows[ii];
                    rest.push(empobj);
                }

                resp.json(rest);
       
        });  

})

//Ne treba zastita!!
router.get('/projekti/lista/admin',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var imePrijavaUklanjanje = query.ime;

    /*if(imePrijavaUklanjanje == '' || imePrijavaUklanjanje == 'undefined'){

        resp.json('Ne selectuj');

    }*/
    
    connection.query("select Projekti,id_pr from micko_projekti where id_pr in \
        (select id_projekat from micko_pr_nadimak where id_korisnik = (select id from micko_registracija where Nadimak_Klijent = '"+imePrijavaUklanjanje+"'))",function(error,rows,field) {   

        if(error){

            resp.json('Error',error);
        }

        var rest = [];

        for(var ii in rows){

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

//Ne koristi se u aplikciji
/*
router.get('/Za-dati-projekat-korisnici-koji-rade-na-njemu',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var ProjekatA = query.projekat;//projekat se pise u zaglavlju
    var godina = query.godina;

       //connection.query("select A.Ime_Prezime,\
        //M.Januar,M.Februar,M.Mart,M.April,M.Maj,M.Jun,M.Jul,M.Avgust,M.Septembar,M.Oktobar,M.Novembar,M.Decembar,\
        //(Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
        //from micko_registracija as A LEFT JOIN micko_meseci_tabela as M on A.id = M.id_nadimak_M\
        //where M.id_projekat_M = Micko_Zapamti1('"+ProjekatA+"') and godina = '"+godina+"'\
        //UNION ALL select 'SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
        //sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),sum('Sum') from micko_meseci_tabela\
        //where id_projekat_M = Micko_Zapamti1('"+ProjekatA+"') and godina = '"+godina+"'",function(error,rows,field) { 

       connection.query("select A.Ime_Prezime,\
        M.Januar,M.Februar,M.Mart,M.April,M.Maj,M.Jun,M.Jul,M.Avgust,M.Septembar,M.Oktobar,M.Novembar,M.Decembar,\
        (Januar + Februar + Mart + April + Maj + Jun + Jul + Avgust + Septembar + Oktobar + Novembar + Decembar) as 'Sum'\
        from micko_registracija as A LEFT JOIN micko_meseci_tabela as M on A.id = M.id_nadimak_M and A.aktivan = 'aktivan'\
        where M.id_projekat_M = Micko_Zapamti1('"+ProjekatA+"') and godina = '"+godina+"'  \
        UNION ALL select 'SUM',sum(Januar),sum(Februar),sum(Mart),sum(April),sum(Maj),sum(Jun),\
		sum(Jul),sum(Avgust),sum(Septembar),sum(Oktobar),sum(Novembar),sum(Decembar),sum('Sum') \
		from micko_registracija as A LEFT JOIN micko_meseci_tabela as M on A.id = M.id_nadimak_M and A.aktivan = 'aktivan'\
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
})*/

router.get('/projekti/lista',function(req,resp,next){
      
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

router.post('/promenasifre',function(req,resp,next){

   connection.beginTransaction(function(error) {

        var query = url.parse(req.url,true).query;
        var NadimakSifra = query.imeSifra;
        var sifraPrijava1 = query.sifra;

        var reqObj = req.body;

        var insertValues = {
                 "sifra" : reqObj.sifra     
        };

        console.log("NadimakSifra" + NadimakSifra);
        console.log("sifraPrijava1" + sifraPrijava1);
        console.log("insertValues.sifra" + insertValues.sifra);

        //resp.json("Sifraaaa")

        //var upitSifra = "select Sifra_Klijent from micko_ime_sifra where Nadimak_Klijent = '" + NadimakSifra + "'";
         var upitSifra = "select Sifra_Klijent from micko_registracija where Nadimak_Klijent = '" + NadimakSifra + "'";  

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
                                //console.log("Ssssssssssssssssssssssssss" + sifra_niz2)
                                
                                var PrediSifre123 = bcrypt.compareSync(String(sifraPrijava1),String(sifra_niz2));
                               //  console.log("Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm" + sifra_niz2) 
                                var PorediGlobalono1 =  PrediSifre123; 

                         

                        if(PorediGlobalono1)
                        {


                              //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")  
                              var sifraPromena = insertValues.sifra;
                              var hashSifraPromena = bcrypt.hashSync(sifraPromena, bcrypt.genSaltSync(8));

                              var upitProvera = "call Micko_Promena_Sifre('"+NadimakSifra+"','"+hashSifraPromena+"')";

                              connection.query(upitProvera,function(error,rows){

                                     if(error){
                                                    //resp.json('Error',error);
                                                    resp.status(500).json('Nije dobra sifra');
                                    
                                      }
                                      else{
                                                    resp.json('Uspesano promenjena sifra');
                                      }

                              });

                        }
                        else{

                             resp.json("Nijeeeeeeee dobra sifraaa");

                        }    
                           
             });
       });
})
/*
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
   
     
})*/

//Ne koristi se u aplikaciji
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

//Ne treba zastita
router.put('/korisnik/deaktivacija',function(req,resp){

    var query = url.parse(req.url,true).query;
    var Nadimak_Klijent = query.Nadimak_Klijent;

    var query = connection.query("UPDATE micko_registracija SET aktivan = 'nije' where Nadimak_Klijent = '"+Nadimak_Klijent+"'",function(error,result){

             if (error) {

                    resp.json('Error',error);

             }
             else{
                  // console.log('PUT uspesan');
                   resp.json("Uspesno deaktiviran");
             }
    });

});

//Ne koristi se u aplikaciji
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

//Ne treba zastita
router.put('/korisnik/aktivacija',function(req,resp){

    var query = url.parse(req.url,true).query;
    var Nadimak_Klijent = query.Nadimak_Klijent;

    var query = connection.query("UPDATE micko_registracija SET aktivan = 'aktivan' where Nadimak_Klijent = '"+Nadimak_Klijent+"'",function(error,result){

             if (error) {
                   //console.log('Error',error.message);
                    resp.json('Error',error);

             }
             else {
                   //console.log('PUT uspesan');
                   resp.json("Uspesno aktiviran");
             }
       });
});

//Ne koristi se u aplikaciji
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

router.get('/local-storage-login',function(req,resp){  

        var query = url.parse(req.url,true).query;
        var imePrijava = query.ime;
        var sifraPrijava = query.sifra;
        dateObjStorage = new Date();
		monthStorage = dateObjStorage.getUTCMonth() + 1; //months from 1-12
		dayStorage = dateObjStorage.getUTCDate();
		yearStorage = dateObjStorage.getUTCFullYear();

		newdateStorage = yearStorage + "-" + monthStorage + "-" + dayStorage;

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

                            imena_ProjekataStogare = rest;    
                   
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

                            tabelaStorage = rest;    
                      
                   
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
                            pamtiAktivanStorage = rest; 
                              
                            pamtiAktivanStorageIf = rest[0].aktivan;
                   
            });


        var Trenutna_Nedelja = "select Nedelja_Trenutna('"+newdateStorage+"') as Vreme";

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
                       
                            seciNedeljaStorage = rest[0].Vreme;
                            //console.log("Nedeljaaaaa"+seciNedelja);
                   
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

                            podaciSaljiStorage = rest;    
                           
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

                                adminKStorage = rest; 
                                
                                adminKStorage = JSON.stringify(rest);
                                ispisADdmnKStorage = adminKStorage.substr(11);
                                ispisADdmnK1Storage = adminKStorage.substr(11,ispisADdmnKStorage.length - 3);
                            
            });
            

        //var upit1 = "SELECT Sifra_Klijent FROM micko_ime_sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";
        var upit1 = "SELECT Sifra_Klijent FROM micko_registracija as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";    
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
                        
                        PorediGlobalonoStorage =  PrediSifre12;

            });

        //var upit2 = "SELECT Nadimak_Klijent FROM micko_ime_sifra as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";
        var upit2 = "SELECT Nadimak_Klijent FROM micko_registracija as a where a.Nadimak_Klijent = ? or a.Sifra_Klijent = ?";

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
                                
                                    pocetakNiz12Storage = (rest[0].Nadimak_Klijent); 
                                
                            if(imePrijava == pocetakNiz12Storage)
                            {
                            
                                if(PorediGlobalonoStorage)
                                {
                                    
                                    if(pamtiAktivanStorageIf == 'aktivan')
                                    {
                                    
                                            resp.json({
                                                Podaci: podaciSaljiStorage,
                                                imena_Projekata: imena_ProjekataStogare,
                                                Tabela: tabelaStorage,
                                                AktivanK: pamtiAktivanStorage,
                                                seciNedelja: seciNedeljaStorage
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

//Ne koristi se u aplikaciji
router.post('/proba-insert-angular2',function(req,resp,next){

     var reqObj = req.body;

            var insertValues = {

                 "id" :  reqObj.id,
                 "upis" :  reqObj.upis,
                
            };


     connection.query("insert into proba_upis(id,upis) value('"+insertValues.id+"','"+insertValues.upis+"')",function(error,rows,field) {
        
          if(error)
          {
                //console.log('Error',error);
                resp.status(500).send('Nije dobro upisanooooo');
          }
          else{

              resp.json("Bravoooo")
              console.log("Bravoooo")

          }
          /*var rest = [];

                for(var ii in rows)
                {
                    var empobj = rows[ii];
                    rest.push(empobj);
                } 

                resp.json(rest);*/
       
        });  
})
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

function Meseci(odabraniMesec){

    var mesecUpit;

    if(odabraniMesec  == 'Januar'){mesecUpit = 0;}
    else if( odabraniMesec  == 'Februar'){mesecUpit = 1;}
    else if( odabraniMesec  == 'Mart'){mesecUpit = 2;}
    else if( odabraniMesec  == 'April'){mesecUpit = 3;}
    else if( odabraniMesec  == 'Maj'){mesecUpit = 4;}
    else if( odabraniMesec  == 'Jun'){mesecUpit = 5;}
    else if( odabraniMesec  == 'Jul'){mesecUpit = 6}
    else if( odabraniMesec  == 'Avgust'){mesecUpit = 7;}
    else if( odabraniMesec  == 'Septembar'){mesecUpit = 8;}
    else if( odabraniMesec  == 'Oktobar'){mesecUpit = 9;}
    else if( odabraniMesec  == 'Novembar'){mesecUpit = 10;}
    else if( odabraniMesec  == 'Decembar'){mesecUpit = 11;}
    else{ mesecUpit = 20;}

    return mesecUpit

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
        user     : 'root',
        password : 'tonet14edu',
        database : 'test_schema',
        micko : console.log('ConekcijaBaza')
});

/*var connection = mysql.createConnection({
   
        host     : '192.168.1.11',
        user     : 'timerep',
        password : '123timerep456',
        database : 'timerep',
        micko : console.log('ConekcijaBaza')
});*/




module.exports = router;
