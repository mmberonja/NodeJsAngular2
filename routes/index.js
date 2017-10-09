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
var async = require('async');

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
            //console.log("Usaooo",brojac);//other requests
        }
        next();
    }catch (e) {
        //console.log(e);
    }

});



router.get('/Sifra123',function(req,resp,next){
      
        resp.json((new Date).getFullYear());
});

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
            //res.status(500).send('Takav Nadimak,Mejl ili Sifra vec postoje');
            res.json('postoji');
        }
        else{   
            var token = jwt.sign({ime:pocetakNiz12, sifra:pocetakNiz1 }, 'shhhhh', {
            /*expiresInMinutes: 1440*/ expiresIn : 60*60*24//VReme isteka tokena
                    //expiresIn : 60
            });
            res.json({
                message: 'Napravio Token',
                Token: token
            });
        }
    });
});

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
    
     
});

router.get('/json',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Nedelja = query.nedelja;
    var Mesec = query.mesec;
    var Ime = query.ime;
    var Godina = query.godina;

    var callbackPrevodi = function(restSveSatnice){

        let prevod = [];

        connection.query("select * from micko_prevodi",function(error,rows,field) {
        
            if(error)
            {
                console.log('Error',error);
                resp.json('Error',error);
            }
            var restPrevodi = [];
            

            for(var ii in rows)
            {
                var empobj = rows[ii];
                restPrevodi.push(empobj);
            }
            var z = {};    
            for(var zz in rows){
                z[rows[zz].naziv] = rows[zz]['prevod'];
            
            }
            prevod.push(z);

            resp.json({
                Prevodi:prevod,
                Podaci:restSveSatnice
            });
        });
    }

    var callbackSpajanjeJson = function(sviProjekti,projektipr,rest){

        let nizSpajanje = [];

        for(let z = 0; z < rest.length; z++){
    
            let y = {};
            for(let j in sviProjekti){

                if(rest[z].Projekti == sviProjekti[j].Projekti){
                    flg = 1; 
                    for(let k in sviProjekti[j]){
                        y[k] = sviProjekti[j][k];
                    }
                }
            }
            nizSpajanje.push(y);
        }
        callbackPrevodi(nizSpajanje)

    }

    var callbackMicko = function(selectM,projektipr,rest){

        var rest_sve = [];
        var sviProjekti = [];
        var jBr = 0;
        var selectBr = 0;
        var brFun = 0; 
        let dd = 0;
        
        SelectFunction(dd);

        function SelectFunction(dd){

            for(let p in selectM[dd].json){

                connection.query("select P.id_pr,P.Projekti,S."+selectM[dd].json[p]+",P.tabela_vrednosti from micko_projekti as P LEFT JOIN "+selectM[dd].ime_tabele+" as S \
                    on P.id_pr = S.id_projekat_D LEFT JOIN micko_pr_nadimak as R on S.id_nadimak_D = R.id_korisnik and S.id_projekat_D = R.id_projekat \
                    where R.zakacen = 'radi' and P.aktivan_projekat = 'aktivan' and id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and \
                    godina = '"+Godina+"' order by P.id_pr",function(error,rows,field) {

                        selectBr++;
                        if(error) {
                            resp.json('Error',error);           
                        }
                        //var rest_sve = [];
                        for(var ii in rows) {
                            var empobj = rows[ii];
                            sviProjekti.push(empobj);
                        }
                        if(Object.keys(selectM[dd].json).length == selectBr){
                            selectBr = 0;
                            brFun++;
                            if(selectM.length == brFun){
                                callbackSpajanjeJson(sviProjekti,projektipr,rest);
                                //resp.json(sviProjekti);
                            }
                            else{
                                dd++;
                                SelectFunction(dd);
                            }

                        }
                });    
            }
        }
        /*
            for(let pr1 in selectM){

                connection.query("select P.id_pr,P.Projekti,S."+selectM[pr1].json.polje1+",S."+selectM[pr1].json.polje2+",S."+selectM[pr1].json.polje3+",\
                    S."+selectM[pr1].json.polje4+",S."+selectM[pr1].json.polje5+",P.tabela_vrednosti from micko_projekti as P  LEFT JOIN "+selectM[pr1].ime_tabele+" as S \
                    on P.id_pr = S.id_projekat_D LEFT JOIN micko_pr_nadimak as R on S.id_nadimak_D = R.id_korisnik and S.id_projekat_D = R.id_projekat \
                    where R.zakacen = 'radi' and id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and \
                    godina = '"+Godina+"' order by P.id_pr",function(error,rows,field) {
                        
                    jBr++; 
                        
                    if(error) {
                        resp.json('Error',error);           
                    }
                    //var rest_sve = [];
                    for(var ii in rows) {
                        var empobj = rows[ii];
                        rest_sve.push(empobj);
                    }

                    if(jBr == selectM.length){
                        callbackPrevodi(rest_sve);    
                    }
                    
                });
            }
        */

    }

    var callbackPoslednji = function(satnice,projektipr,informacijePr,rest){

        //SATNICE   
        //Iz tabela na kojima korisnici rade dobijaju se satnice,ako nema informacija znaci da nije nista upisano u tu tabelu
        //PROJEKTI
        //Projekti na kojima rade korisnici 

        //resp.json(satnice);

        var brQuery = 0;
        var sumaBre = 0;
        
        for(let k in informacijePr){
    
            var oznakaP = informacijePr[k].ime_tabele
            var projektiLength = 0;
            var satniceLength = 0;

            if(projektipr[0][oznakaP] == null){
                projektiLength = 0;
            }
            else{
                projektiLength = projektipr[0][oznakaP].length    
            }
            if(satnice[0][oznakaP] == null){
                satniceLength = 0
            }
            else{
                satniceLength = satnice[0][oznakaP].length
            }

            let rezRazlika = 0;
            rezRazlika = projektiLength - satniceLength;
            if(rezRazlika == 0){
                rezRazlika = 1;        
            }
            /*if(rezRazlika < 0){
                rezRazlika = 1;
            }*/
            sumaBre += rezRazlika;
          
        }

        let k = 0;
        let funkcijeBr = 0;

        
        function MarsBre(SlovoK){

            let k;
            k = SlovoK;
            //console.log("k" + k);

            if(satnice[0][informacijePr[k]['ime_tabele']] == null){//Ovde ulazi samo ako za odredjenu tabelu nema upisanih satnica!!

                console.log("Micko bree");

                var oznaka = [informacijePr[k]['ime_tabele']]
                for(let pr in projektipr[0][oznaka]){
                    //informacijePr[k]['ime_tabele'] - ime tabele u koju treba da se upisuje
                    //projektipr[0][oznaka][pr]['id_pr'] - id projekta koji nema satnice upisane
                    console.log("Ime tabele" + informacijePr[k]['ime_tabele']);    

                    connection.query("insert into "+informacijePr[k]['ime_tabele']+"(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,\
                        "+informacijePr[k].json.polje1+","+informacijePr[k].json.polje2+","+informacijePr[k].json.polje3+","+informacijePr[k].json.polje4+","+informacijePr[k].json.polje5+") value \
                        (Micko_S('"+Ime+"'),'"+projektipr[0][oznaka][pr]['id_pr']+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0,0,0,0,0)",function(error,rows,field) {

                            brQuery++;
                            //console.log("Usaooooo" + brQuery);
                            if(brQuery == sumaBre){
                                callbackMicko(informacijePr,projektipr,rest);
                            }
                    });
                }
            }
            else{
                var oznaka1 = [informacijePr[k]['ime_tabele']]
                console.log("oznaka1" + oznaka1);
                if(satnice[0][oznaka1].length == projektipr[0][oznaka1].length){

                    funkcijeBr++;
                    if(informacijePr.length == funkcijeBr){
                        //resp.json("Micko");
                        callbackMicko(informacijePr,projektipr,rest);
                    }
                    else{
                        k++;
                        MarsBre(k);
                    }                   
                }
                else if(satnice[0][oznaka1].length > projektipr[0][oznaka1].length){

                    funkcijeBr++;
                    if(informacijePr.length == funkcijeBr){
                        //resp.json("Micko");
                        callbackMicko(informacijePr,projektipr,rest);
                    }
                    else{
                        k++;
                        MarsBre(k);
                    }
                }
                else{
                    
                    //console.log("usao ovde!!1")
                    funkcijeBr++;
                    let pr = 0;
                    let brFunkcije = 0;
                    NekaFunkcija(k,oznaka1,pr,brFunkcije);

                }
            }
        }
        

        function NekaFunkcija(k,oznaka1,pr,brFunkcije){

            let brPrk = 0;
            var idZakacen;
            idZakacen = projektipr[0][oznaka1][pr].id_pr;
            for(let sat in satnice[0][oznaka1]){
                //console.log(satnice[0][oznaka1][sat].id_pr);
                if(idZakacen == satnice[0][oznaka1][sat].id_pr){                                
                    brPrk++;
                }
                else{
                    //console.log("Usao" + satnice[0][oznaka1][sat].Projekti + ":  " + satnice[0][oznaka1][sat].id_pr)
                }
            }
            if(brPrk >= 1){

                brFunkcije++;
                pr++;
                if(Number(projektipr[0][oznaka1].length) == Number(brFunkcije)){
                    k++
                    MarsBre(k);
                }
                else{
                    
                    NekaFunkcija(k,oznaka1,pr,brFunkcije);
                }
            }
            else{
                
                let brInsert = 0;
                let brUpit = 0;
                
                for(let s in informacijePr[k].json){
                   
                    if(brInsert == 0){
                        brInsert++;
                        connection.query("insert into "+informacijePr[k]['ime_tabele']+"(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,\
                            "+informacijePr[k].json[s]+") value \
                            (Micko_S('"+Ime+"'),'"+projektipr[0][oznaka1][pr]['id_pr']+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',0)",function(error,rows,field) {

                                brUpit++;
                                if(error) {
                                    console.log("Error Insert");         
                                }
                                if(brUpit == Object.keys(informacijePr[k].json).length){
                                    //console.log("Usao bre ovde bre!!");
                                    brFunkcije++;
                                    pr++;
                                    if(Number(projektipr[0][oznaka1].length) == Number(brFunkcije)){
                                       
                                        k++;
                                        if(informacijePr.length == funkcijeBr){
                                            //resp.json("Micko");
                                            callbackMicko(informacijePr,projektipr,rest);
                                        }
                                        else{
                                            MarsBre(k);
                                        }
                                        //MarsBre(k);
                                    }
                                    else{
                                        NekaFunkcija(k,oznaka1,pr,brFunkcije);
                                    }   
                                }
                        });
                    }
                    else{
                        connection.query("update "+informacijePr[k]['ime_tabele']+" set "+informacijePr[k].json[s]+" = 0 \
                            where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+projektipr[0][oznaka1][pr]['id_pr']+"' and \
                            nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {

                            brUpit++;
                            if(error) {
                                console.log("Error Update");
                                //resp.json('Error',error);           
                            }
                            if(brUpit == Object.keys(informacijePr[k].json).length){
                                brFunkcije++;
                                pr++;
                                if(Number(projektipr[0][oznaka1].length) == Number(brFunkcije)){
                                    k++;
                                    if(informacijePr.length == funkcijeBr){
                                        console.log("Resp");
                                        //resp.json("Micko");
                                        callbackMicko(informacijePr,projektipr,rest);
                                    }
                                    else{
                                        console.log("Funkcija");
                                        MarsBre(k);
                                    }
                                    //MarsBre(k);
                                }
                                else{
                                    NekaFunkcija(k,oznaka1,pr,brFunkcije);
                                }
                            }
                        });      
                    }
                }
            }
        }

        MarsBre(0);

         /*
            if(brInsert == 0){
                brInsert++;
                connection.query("insert into "+informacijePr[k]['ime_tabele']+"(id_nadimak_D,id_projekat_D,nedelja,mesec,godina,\
                    "+informacijePr[k].json[s]+") value \
                    (Micko_S('"+Ime+"'),'"+projektipr[0][oznaka1][pr]['id_pr']+"','"+Nedelja+"','"+Mesec+"','"+Godina+"',1)",function(error,rows,field) {

                        brUpit++;
                        console.log("Usao Insert!!");
                        if(error) {
                            //console.log("Errorrrrrrrrrrrrrrrrrrrrrrr");
                            //resp.json('Error',error);           
                        }
                        if(brUpit == Object.keys(informacijePr[k].json).length){
                            //console.log("Usao bre ovde bre!!");
                            brFunkcije++;
                            pr++; 
                            if(brFunkcije == projektipr[0][oznaka1].length){
                                console.log("Gotovo,uvecaj brQuery")
                                brQuery++;
                                //console.log("Drugoo" + brQuery);
                                if(brQuery == sumaBre){
                                    callbackMicko(informacijePr);
                                }
                            }
                            else{
                                NekaFunkcija();
                            }
                        }
                });
            }
            else{
                    connection.query("update "+informacijePr[k]['ime_tabele']+" set "+informacijePr[k].json[s]+" = 2 \
                    where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+projektipr[0][oznaka1][pr]['id_pr']+"' and \
                    nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {

                        brUpit++;
                        //console.log("Usao Update!!");
                        if(error) {
                            console.log("Errorrrrrrrrrrrrrrrrrrrrrrr");
                            //resp.json('Error',error);           
                        }
                        if(brUpit == Object.keys(informacijePr[k].json).length){
                            console.log("Usao bre ovde bre!!");
                            brFunkcije++;
                            pr++;
                            console.log(projektipr[0][oznaka1].length);
                            console.log(brFunkcije); 
                            if(brFunkcije == projektipr[0][oznaka1].length){
                                console.log("Gotovo,uvecaj brQuery");
                                brQuery++;
                                //console.log("Drugoo" + brQuery);
                                if(brQuery == sumaBre){
                                    callbackMicko(informacijePr);
                                }
                            }
                            else{
                                NekaFunkcija();    
                            }
                        }
                });      
            }
        */
    }

    var callbackFunction = function(jedan,dva,tri,rest){
        
        let z = {};
        //var vezva = [[{ime:'Micko'},{ime:'Cile'}],[{ime:'Jaca'},{ime:'Miroslav'}]]
        //resp.json(tri)
        //console.log(dva);
        for(let i in tri){
        //for(let i=0; i<4;i++){   
            var neZnamKakoDaNazovem = [],satniceNiz = [];
            z[tri[i].ime_tabele] = null

            //console.log(tri[i].ime_tabele)
            
            if(dva[i] == ''){       
            } 
            else{
                for(let g in dva){
                    //console.log(dva[0]);
                    for(let hh in dva[g]){
                         //console.log(dva[g][hh].tabela_vrednosti);
                         if(tri[i].ime_tabele == dva[g][hh].tabela_vrednosti){
                             //console.log(dva[g][hh]);
                             let qq = {};
                             for(let f in dva[g][hh]){
                                qq[f] = dva[g][hh][f];
                            }
                            satniceNiz.push(qq);
                         }
                    }
                }
                z[tri[i].ime_tabele] = satniceNiz
            }
            neZnamKakoDaNazovem.push(z);
            //resp.json(neZnamKakoDaNazovem);

            /*if(dva[i] == ''){       
            }
            else{
                for(let g in dva[i]){
                    if(tri[i].ime_tabele == dva[i][g]['tabela_vrednosti'])
                    {
                        let qq = {};
                        for(let f in dva[i][g]){
                            qq[f] = dva[i][g][f];
                        }
                        satniceNiz.push(qq);
                    }
                }
                z[tri[i].ime_tabele] = satniceNiz
            }
            neZnamKakoDaNazovem.push(z);*/
        }
        //Dobijamo sortirane projekte po tome u kojoj se tabeli nalazi koji projekat!!
        //resp.json(neZnamKakoDaNazovem);
        callbackPoslednji(neZnamKakoDaNazovem,jedan,tri,rest);
    }

    var callbackUbacena = function(restPrKor,rest,Izgled,zakaceniNaProjekte){

        let neZnam = [];

        //resp.json(rest);
        //resp.json(restPrKor);
        /*console.log(restPrKor);
        console.log("-----------"); 
        console.log(rest); */    

        for(let z = 0; z < rest.length; z++){
    
            let flg = 0;
            let y = {};
            for(let j in restPrKor){
                if(rest[z].Projekti == restPrKor[j].Projekti){
                    flg = 1; 
                    for(let k in restPrKor[j]){
                        y[k] = restPrKor[j][k];
                    }
                }
            }
            if(flg == 1){
                neZnam.push(y);
            }
            else{
            }
        }

        //resp.json(neZnam);

        let metiNiz = [];
        let nizM = [];
        let imeT;
        let lengthNiz = 1;
        let m1 = 0;
        let m2 = 0;

        //resp.json(neZnam);
        
        if(restPrKor == ""){
            console.log("Niz je prazan!!!")
        }
        else{
            imeT = neZnam[0].tabela_vrednosti; //// Ovdeeeee
            nizM[0] = neZnam[0].tabela_vrednosti;

            for(let kk in neZnam){
                if(imeT == neZnam[kk].tabela_vrednosti){
                }
                else{
                    nizM[lengthNiz] = neZnam[kk].tabela_vrednosti
                    lengthNiz++;
                    imeT == neZnam[kk].tabela_vrednosti;
                }
            }

            for(let zz = 0; zz < nizM.length; zz++){
                
                let newArray = [];
                for(let kk in neZnam){
                    if(nizM[zz] == neZnam[kk].tabela_vrednosti){
                        newArray[m1] = neZnam[kk];
                        m1++;
                    }
                }
                metiNiz[zz] = newArray;
                m1 = 0; 
            }
        }

        //resp.json(metiNiz);
        callbackFunction(Izgled,metiNiz,zakaceniNaProjekte,rest);
        
        /*
            var juhu1 = [
                [
                    {
                        "id_pr": 27,
                        "Projekti": "INIT 10",
                        "Razvoj": 0,
                        "odrzavanje": 0,
                        "dokumentacija": 0,
                        "implementacija": 0,
                        "rezijski_poslovi": 0,
                        "tabela_vrednosti": "sve_jedna_tabela"
                    },
                    {
                        "id_pr": 34,
                        "Projekti": "ERViKO ",
                        "Razvoj": 0,
                        "odrzavanje": 0,
                        "dokumentacija": 0,
                        "implementacija": 0,
                        "rezijski_poslovi": 0,
                        "tabela_vrednosti": "sve_jedna_tabela"
                    }
                ],
                [
                    {
                        "id_pr": 65,
                        "Projekti": "Obuka, stručno usavršavanje",
                        "samostalno__ucenje": 0,
                        "interna_obuka": 0,
                        "eksterna_obuka": 0,
                        "sajam_strucniskup_i_slicno": 0,
                        "ostalo_obuka": 0,
                        "tabela_vrednosti": "obuka"
                    }
                ],
                [
                    {
                        "id_pr": 65,
                        "Projekti": "Obuka, stručno usavršavanje",
                        "samostalno__ucenje": 0,
                        "interna_obuka": 0,
                        "eksterna_obuka": 0,
                        "sajam_strucniskup_i_slicno": 0,
                        "ostalo_obuka": 0,
                        "tabela_vrednosti": "prodaja"
                    }
                ],

            ]

            var juhu = [
                {
                    "id_pr": 27,
                    "Projekti": "INIT 10",
                    "Razvoj": 0,
                    "odrzavanje": 0,
                    "dokumentacija": 0,
                    "implementacija": 0,
                    "rezijski_poslovi": 0,
                    "tabela_vrednosti": "sve_jedna_tabela"
                },
                {
                    "id_pr": 34,
                    "Projekti": "ERViKO ",
                    "Razvoj": 0,
                    "odrzavanje": 0,
                    "dokumentacija": 0,
                    "implementacija": 0,
                    "rezijski_poslovi": 0,
                    "tabela_vrednosti": "sve_jedna_tabela"
                },
                {
                    "id_pr": 65,
                    "Projekti": "Obuka, stručno usavršavanje",
                    "samostalno__ucenje": 0,
                    "interna_obuka": 0,
                    "eksterna_obuka": 0,
                    "sajam_strucniskup_i_slicno": 0,
                    "ostalo_obuka": 0,
                    "tabela_vrednosti": "obuka"
                },
                {
                    "id_pr": 65,
                    "Projekti": "Obuka, stručno usavršavanje",
                    "samostalno__ucenje": 0,
                    "interna_obuka": 0,
                    "eksterna_obuka": 0,
                    "sajam_strucniskup_i_slicno": 0,
                    "ostalo_obuka": 0,
                    "tabela_vrednosti": "prodaja"
                }
            ]

            imeT = juhu[0].tabela_vrednosti;
            nizM[0] = juhu[0].tabela_vrednosti;   

            for(let kk in juhu){
                if(imeT == juhu[kk].tabela_vrednosti){
                    
                }
                else{
                    nizM[lengthNiz] = juhu[kk].tabela_vrednosti
                    lengthNiz++;
                    imeT == juhu[kk].tabela_vrednosti;
                }
            }

            for(let zz = 0; zz < nizM.length; zz++){
                
                let newArray = [];
                console.log(zz);
                for(let kk in juhu){
                    if(nizM[zz] == juhu[kk].tabela_vrednosti){
                        newArray[m1] = juhu[kk];
                        m1++;
                    }
                }
                metiNiz[zz] = newArray;
                m1 = 0;
                console.log(newArray);    
            }
        */    
        
    }

    var callback = function(blogs,rest,rest_ime_tabela) {
    
        let niz = [];
        let nizDuzine = [];
        var brNiz = 0;
        var razliciti = rest[0].tabela_vrednosti;
        var brojacProjekata = 1;
        var duzinaProjekata = 0;
        var Izgled = [];
        var InformacijeProjakta1 = [];
        var zakaceniNaProjekte = [];
        var prenosZakaceni = [];
        var prviPr = 0;
        
        //Dobijamo json sa informacijama na koje je projekte zakacen korisnik
        for(let ime1 in blogs){
            for(let t in rest){
                if(blogs[ime1].ime_tabele == rest[t].tabela_vrednosti){
                    
                    if(prviPr == 0){
                        let p = {};
                        for(let ime2 in blogs[ime1]){
                            p[ime2] = blogs[ime1][ime2];
                            //console.log(blogs[ime1][ime2]);
                        }
                        zakaceniNaProjekte.push(p);
                    }
                    prviPr++;
                }
                else{
                    prviPr = 0;
                }
            }
        }

        //resp.json(zakaceniNaProjekte)
        /*console.log(zakaceniNaProjekte);
        console.log(rest);
        console.log(blogs);*/

        let h = {};
        for(let ime in zakaceniNaProjekte){
            InformacijeProjakta = [];
            h[zakaceniNaProjekte[ime].ime_tabele] = null
            for(let t in rest){
                if(zakaceniNaProjekte[ime].ime_tabele == rest[t].tabela_vrednosti){
                    let l = {};
                    for(let k in rest[t]){
                        l[k] = rest[t][k]
                    }
                    InformacijeProjakta.push(l)
                }
                else{
                    //console.log("razlicito");
                }
            }

            h[zakaceniNaProjekte[ime].ime_tabele] = InformacijeProjakta;
        } 
        Izgled.push(h);
        //resp.json(Izgled);

        var brFor = 0
        //for(var pr in zakaceniNaProjekte){      
        var restPrKor = [];
        let duzQ = 0;   
        var MickoNizBre = [];
        let g = {};
        var nizKolikoBre = [27,34,41];
        let Xyz = 0;
        let XyzBr = 0
        var pr = 0;
        //console.log(Object.keys(zakaceniNaProjekte[0].json).length);
        //console.log(zakaceniNaProjekte[0].json);
        //resp.json(Izgled);

        
        MickoBre();
        
        function MickoBre(){

            for(var pr1 = 1;pr1<Object.keys(zakaceniNaProjekte[pr].json).length + 1;pr1++){ //for(let pr1 = 1;pr1 < ){
               
                var polja = "polje"+pr1+"";
               
                connection.query("select P.id_pr,P.Projekti,S." + zakaceniNaProjekte[pr].json[polja] + " \
                    ,P.tabela_vrednosti from micko_projekti as P  LEFT JOIN "+zakaceniNaProjekte[pr].ime_tabele+" as S \
                    on P.id_pr = S.id_projekat_D LEFT JOIN micko_pr_nadimak as R on S.id_nadimak_D = R.id_korisnik and S.id_projekat_D = R.id_projekat \
                    where R.zakacen = 'radi' and P.aktivan_projekat = 'aktivan' and id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and \
                    godina = '"+Godina+"' order by id_pr",function(error,rows,field) {        

                        duzQ++;
                        let poljaB = 0;
                        poljaB = "polje"+duzQ+"";
                        //var restPrKor = [];
                        if(error) {
                            console.log("Errorrrrrrrrrrrrrrrrrrrrrrr");
                            resp.json('Error',error);           
                        }
                        for(var ii in rows) {
                            var empobj = rows[ii];
                            restPrKor.push(empobj);
                        }
                        
                        if(duzQ == Object.keys(zakaceniNaProjekte[pr].json).length){

                            //console.log(restPrKor);
                            duzQ = 0;
                            Xyz++;
                            if(zakaceniNaProjekte.length == Xyz){
                                 //resp.json(restPrKor);
                                 callbackUbacena(restPrKor,rest,Izgled,zakaceniNaProjekte);
                            }
                            else{
                                pr++;
                                MickoBre();
                            }
                        }
                });
            }
        } 
        

        /*
            for(var pr in zakaceniNaProjekte){  
                //for(var pr = 0;pr<2;pr++){
                let u = {};
                u['ime'] = zakaceniNaProjekte[pr].ime_tabele;
            
                //Daje vrednosti samo koje postoje u tabelama to jest gde su upisane satnice 
                //ako za odredjeni projekat nema upisana satnica onda nece prikazati vrednosti i ako je taj korisnik zakacen na taj projekat       
                connection.query("select P.id_pr,P.Projekti,S."+zakaceniNaProjekte[pr].json.polje1+",S."+zakaceniNaProjekte[pr].json.polje2+",S."+zakaceniNaProjekte[pr].json.polje3+",\
                    S."+zakaceniNaProjekte[pr].json.polje4+",S."+zakaceniNaProjekte[pr].json.polje5+",P.tabela_vrednosti from micko_projekti as P  LEFT JOIN "+zakaceniNaProjekte[pr].ime_tabele+" as S \
                    on P.id_pr = S.id_projekat_D LEFT JOIN micko_pr_nadimak as R on S.id_nadimak_D = R.id_korisnik and S.id_projekat_D = R.id_projekat \
                    where R.zakacen = 'radi' and id_nadimak_D =  Micko_S('"+Ime+"') and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and \
                    godina = '"+Godina+"' order by P.id_pr",function(error,rows,field) {        

                        var duz = 0;
                        duz = rows.length
                        var restPrKor = [];
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
                            restPrKor.push(empobj);
                        }

                        let p = {}
                        u['duzina'] = duz;
                        ProjektiBazaObejct.push(u);

                        ProjektiBaza[brFor] = restPrKor;
                        brFor++;

                        if(brFor == zakaceniNaProjekte.length){
                            //resp.json(ProjektiBaza);
                            callbackFunction(Izgled,ProjektiBaza,zakaceniNaProjekte);
                        }
                });
            }
        */
           
    }

    var rest = [];
    var nesto = [],duzineSatnice = [];
    var ProjektiBaza = [];
    var ProjektiBazaObejct = [];
    //var zakaceniNaProjekte = [];
    //var Ime = 'Jaca';
    //var Nedelja = 5;
    //var Mesec = 'Avgust'
    //var Godina = 2017

    connection.query("select * from micko_tabele_ime", function(err, blogs, fields) {
        var pending = blogs.length;

        var rest_ime_tabela = []; 
        for(var ii in blogs)
        {
            var empobj = blogs[ii];
            rest_ime_tabela.push(empobj);
            rest_ime_tabela[ii].json = JSON.parse(rest_ime_tabela[ii].json)
        }

        connection.query("select P.id_pr,P.Projekti,R.Nadimak_Klijent,P.tabela_vrednosti from micko_projekti as P INNER JOIN  micko_pr_nadimak as M on P.id_pr = M.id_projekat \
            INNER JOIN micko_registracija as R on M.id_korisnik = R.id where R.id = Micko_S('"+Ime+"') and M.zakacen = 'radi' and P.aktivan_projekat = 'aktivan' order by P.tabela_vrednosti DESC,id_pr",function(error,tags,field) {        

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

            for(var ii in tags)
            {
                var empobj = tags[ii];
                rest.push(empobj);
            }
            //resp.json(rest);
            //console.log(rest);
            //console.log(blogs);
            callback(blogs,rest,rest_ime_tabela);
        });
    });
    
});

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
});

router.get('/email',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Projekat = query.projekat;
    var sendMail = query.emailsend;

    console.log("Email" + sendMail);
    console.log("Projekat" + Projekat);

    //var cuvaj = Email('KC-Novi Sad - gas','miroslav.beronja@to-net.rs');
    var cuvaj = Email(Projekat,sendMail);
    //resp.json(cuvaj);

    transporter.sendMail(cuvaj, (error, info) => {
        if (error) {
            return console.log(error);
            resp.json(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            resp.json("Poslat mejl");
    });

});

router.get('/trenutna-godina',function(req,resp,next){

    console.log("Godinaaaaaa");
    var d = new Date();
    var n = d.getFullYear();

    resp.json(Number(n))
});

router.get('/token/provera',function(req,resp,next){
      
    // resp.send('Bravooo Micko');

     
});

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

});

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

    let nePozivaj = 0
    let rezM = 0
    let brIns = 0
    let brojacIns = 0
    let brProjekta = 0;
    function PozoviSamaSebe(){
        
        for(let y = 0; y <= 3; y++ ){

            //console.log("Breee");
            if(y == 3){
                nePozivaj++;
                //console.log("nePozivaj " + nePozivaj)
                if(nePozivaj == 3){
                    //console.log("Micko: " + rezM);
                    resp.json("Insert bre");
                }
                else{
                    rezM = rezM + 5;
                    PozoviSamaSebe()
                }
            }
        }
    }

    function UpisiSveSatnice(){

        for(let br in insertValues.obj[brProjekta].Podaci){
            connection.query("update "+insertValues.obj[brProjekta].tabela_vrednosti+" set "+insertValues.obj[brProjekta].Podaci[br].baza+" = '"+insertValues.obj[brProjekta].Podaci[br].satnica+"' \
                where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = "+insertValues.obj[brProjekta].id_pr+" and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {
                    
                brojacIns++; 
                if (error) {
                    resp.json('Error',error);
                }
                else {
                    //resp.json('Uspesan Insert');
                    if(brojacIns == insertValues.obj[brProjekta].Podaci.length){

                        brojacIns = 0;    
                        brProjekta++;

                        if(brProjekta == insertValues.obj.length){
                            console.log(brProjekta);
                            resp.status(200).json('Uspesan Insert');
                        }
                        else{
                            UpisiSveSatnice();    
                        }
                    }
                }
            });
        }
    }

    UpisiSveSatnice();  

});

//Zastitaa
router.put('/projekti',function(req,resp,next){

    var reqObj = req.body;
    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    var Projekat = query.projekat;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;
    var insertValues = { 
        "obj" :  reqObj.data,
        "imeTabele" :  reqObj.tabela,
    };


    var probaj;
    var probaGodina;
    var probaNedelja;
    var probaRazvoj;
    var probaOdrzavanje;
    var probaDokumentacija;
    var probaImplementacija;
    var probaReziski_poslovi;
    var brojac = 0;

  
    var odabraniMesec = Mesec;
    var godinaUpit = Godina;
    var mesecUpit;
    let brojacInsert = 0;
    console.log("brojacInsert" + brojacInsert);

    /*console.log(insertValues.obj);
    console.log(insertValues.oimeTabelebj);
    resp.status(200).json('Uspesan Insert');*/

    
    for(let br in insertValues.obj){

        connection.query("update "+insertValues.imeTabele+" set "+insertValues.obj[br].baza+" = "+insertValues.obj[br].satnica+" \
            where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+Projekat+"' and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {
            //connection.query("UPDATE "+insertValues.imeTabele+" SET odrzavanje=4 WHERE id='2219'",function(error,rows,field) {    

            brojacInsert++;
            
            if (error) {
                resp.json('Error',error);
            }
            else {
                if(brojacInsert == insertValues.obj.length){
                    console.log("Usaoo");
                    resp.status(200).json('Uspesan Insert');
                }
            }
        });
    }


    /*
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

    if(Odrzavanje == "" || Odrzavanje == undefined || Odrzavanje == null || Odrzavanje == NaN){
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

    if(Reziski_poslovi == "" || Reziski_poslovi == undefined || Reziski_poslovi == null){}*/

    //resp.json('Uspesan Insert' + Implementacija);
    /*
    connection.query("update sve_jedna_tabela set Razvoj = '"+Razvoj+"',odrzavanje = '"+Odrzavanje+"',dokumentacija = '"+Dokumentacija+"',implementacija='"+Implementacija+"',rezijski_poslovi='"+Reziski_poslovi+"' \
         where id_nadimak_D = Micko_S('"+Ime+"') and id_projekat_D = '"+Projekat+"' and nedelja = '"+Nedelja+"' and mesec = '"+Mesec+"' and godina = '"+Godina+"'",function(error,rows,field) {
             
        if (error) {
            resp.json('Error',error);
        }
        else {
             //resp.json('Uspesan Insert');
             resp.status(200).json('Uspesan Insert');
        }

    });*/

}); 

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

router.get('/projekti-prevodi',function(req,resp,next){

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
    var prevod = [];

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

    connection.beginTransaction(function(error) {    

        connection.query("select * from micko_prevodi",function(error,rows,field) {
        
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
            var z = {};    
            for(var zz in rows){
                z[rows[zz].naziv] = rows[zz]['prevod'];
            
            }
            prevod.push(z);

            /*resp.json({
                Prevodi:prevod
            }); */
        }); 

        //Dobijamo projekte na koje je zakacen korisnik!!
        
        connection.query("select P.id_pr,Projekti,R.Nadimak_Klijent from micko_projekti as P INNER JOIN  micko_pr_nadimak as M on P.id_pr = M.id_projekat \
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

            //

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

            console.log(restPrKor)

            console.log("rest.length" + rest.length);
            console.log("restPrKor.length"+ restPrKor.length);

            if(restPrKor.length == 0){
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
                resp.json({
                    Prevod:prevod,
                    Podaci:rest_1
                });

            });
        }); 
          
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

function Email(textT,email){

    var mailOptions;

    return mailOptions = {
        //from: '"Miroslav Beronja" <miroslavmicko1964@gmail.com>', // sender address
        //from: '<miroslav.beronja@to-net.rs>',
        from: '<miroslav.beronja@to-net.rs>',
        //to: 'miroslav.beronja@to-net.rs', // list of receivers
        to: 'miroslav.beronja@to-net.rs,mickochelsea1234@gmail.com', // list of receivers
        subject: 'Zahtev za dodavanje novog projekta ✔', // Subject line//milos.tolic@to-net.rs,stevan.filipovic@to-net.rs
        /*text: 'ZAHTEV ZA NOVIM PROJEKTOM:\
        '+textT+' \
         podnosilac zahteva:'+email+'', // plain text body*/
        html: '<p>ZAHTEV ZA NOVI PROJEKAT:<br><br>'+textT+'. <br><br> '+email+'.</p>' // html body
    };  
}

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
