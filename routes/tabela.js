var express = require('express');
var routerTabela = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var url = require('url');
//var datetime = require('node-datetime');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');

routerTabela.get('/probabre', function(req, resp, next) {
  //res.send('respond with a resource');
  console.log("Users!!!!!");
  resp.json("Micko!")
});

//Upit se koristi kod tabele,nije u anminskoj stranici!!
routerTabela.get('/projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var imePrijavaUklanjanje = query.ime;

    connection.query("select Projekti,id_pr from micko_projekti where aktivan_projekat = 'aktivan' and id_pr in \
        (select id_projekat from micko_pr_nadimak where id_korisnik = (select id from micko_registracija where Nadimak_Klijent = '"+imePrijavaUklanjanje+"') and zakacen = 'radi')",function(error,rows,field) {   

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
});

//Zastitaa
routerTabela.get('/korisnici',function(req,resp,next){

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

    
    var imenaTabela = [];
    let sumPoljeStringNiz = '';
    objPolja = [];
    let brPolja = 0;
    let brojQ = 0;
    
    connection.query("select * from micko_tabele_ime", function(error, blogs, fields) {

        var pending = blogs.length;
        var rest_ime_tabela = [];
        if(error) {
            resp.json('Error',error);           
        }

        for(var ii in blogs)
        {
            var empobj = blogs[ii];
            imenaTabela.push(empobj);
            imenaTabela[ii].json = JSON.parse(imenaTabela[ii].json)
        }
        //resp.json(imenaTabela);
        PoljaTabela(imenaTabela);
    });

    function PoljaTabela(imenaTabela){

        for(let pd in imenaTabela){ 
            for(let polje in imenaTabela[pd].json){
                //console.log(polje + ": " + imenaTabela[pd].json[polje]);
                brPolja++;
                if(brPolja == Object.keys(imenaTabela[pd].json).length){
                    brPolja = 0;
                    sumPoljeStringNiz += 'St.'+imenaTabela[pd].json[polje]+'';
                }
                else{
                    sumPoljeStringNiz += 'St.'+imenaTabela[pd].json[polje]+'+';
                }
            
            }
            let z = {};
            z['imeTabele'] = imenaTabela[pd].ime_tabele;
            z['polja'] = sumPoljeStringNiz;
            objPolja.push(z);
            sumPoljeStringNiz = '';
           
        }
        SumProjektiTabela(objPolja);
        //resp.json(objPolja);
    }

    var rest = [];

    function SumProjektiTabela(sumPoljeString){

        let nazivTabele = 'sve_jedna_tabela';
        connection.query("\
            select Rg.Ime_Prezime,\
                St.id_nadimak_D,\
                Pr.id_pr,\
                Pr.Projekti,\
                St.nedelja,\
                ("+sumPoljeString[brojQ].polja+") as sum \
            from micko_projekti as Pr INNER JOIN micko_pr_nadimak as Np on Pr.id_pr = Np.id_projekat \
                INNER JOIN "+sumPoljeString[brojQ].imeTabele+" as St on Pr.id_pr = St.id_projekat_D \
                INNER JOIN micko_registracija as Rg on St.id_nadimak_D = Rg.id \
            where Np.id_korisnik = Micko_S('"+Nadimak+"') and Np.zakacen = 'radi' and Pr.aktivan_projekat = 'aktivan' and St.mesec = '"+Mesec+"' and St.godina = '"+Godina+"' and St.id_nadimak_D = Micko_S('"+Nadimak+"') \
            group by id_nadimak_D,id_projekat_D,nedelja",function(error,rows,field) {
    
            
            brojQ++;
            if(error) {
                resp.json('Error',error);           
            }

            for(var ii in rows) {
                var empobj = rows[ii];
                rest.push(empobj);
            }
            if(sumPoljeString.length == brojQ){
                resp.json(rest);
            }
            else{
                SumProjektiTabela(sumPoljeString)
            }
        }); 
    }

    /*
        connection.query("\
            select P.Projekti,\
                   S.id_projekat_D,\
                   M.Ime_Prezime,\
                   M.Nadimak_Klijent,\
                   S.id_nadimak_D,\
                   S.nedelja,\
                   S.mesec,\
                   ("+sumPoljeString[brojQ].polja+") as sum \
            from micko_projekti as P INNER JOIN "+sumPoljeString[brojQ].imeTabele+" as S \
                on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id \
            where mesec = '"+Mesec+"' and godina = '"+Godina+"' and id_nadimak_D = Micko_S('"+Nadimak+"') \
            group by id_nadimak_D,id_projekat_D,nedelja",function(error,rows,field) {
    */            

    /*connection.query("\
        select P.Projekti,\
               S.id_projekat_D,\
               M.Ime_Prezime,\
               M.Nadimak_Klijent,\
               S.id_nadimak_D,\
               S.nedelja,\
               S.mesec, \
               sum(S.razvoj + S.odrzavanje + S.dokumentacija + S.implementacija + S.rezijski_poslovi) as sum\
               from micko_projekti as P INNER JOIN sve_jedna_tabela as S \
               on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id \
               where id_nadimak_D = Micko_S('"+Nadimak+"') and godina = '"+Godina+"' and mesec = '"+Mesec+"' \
               group by id_nadimak_D,id_projekat_D,nedelja,mesec order by mesec ",function(error,rows,field) {
        
            if(error) {
                    resp.json('Error',error);           
            }
            var rest = [];

            for(var ii in rows) {
                var empobj = rows[ii];
                rest.push(empobj);
            }

            resp.status(200).json(rest);
    })*/    

})

module.exports = routerTabela;

var connection = mysql.createConnection({
   
        host     : 'localhost',
        user     : 'root',
        password : 'tonet14edu',
        database : 'test_schema',
        //micko : console.log('ConekcijaBaza')
});