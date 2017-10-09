var express = require('express');
var routerAdmin = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var url = require('url');
//var datetime = require('node-datetime');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');


/* GET users listing. */
routerAdmin.get('/hu', function(req, resp, next) {
  //res.send('respond with a resource');
  console.log("Users!!!!!");
  resp.json("Micko!")
});

routerAdmin.get('/Sifra1234',function(req,resp,next){
      
        //resp.json((new Date).getFullYear());
        console.log("Users!!!!!");
        resp.json("Miroslav Beronja");
        //return next();
});


routerAdmin.get('/neaktivni-projekti',function(req,resp,next){

    connection.query("\
        SELECT  id_pr,\
                Projekti \
        FROM micko_projekti \
        where aktivan_projekat = 'aktivan'",function(error,rows,field) {
        
        if(error) {
            resp.json('Error',error);           
        }
        var rest = [];

        for(var ii in rows) {
        var empobj = rows[ii];
        rest.push(empobj);
        }
        resp.json(rest);

    });  
});

routerAdmin.put('/neaktivni-projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Id = query.id;
    var Projekat = query.projekat
    var reqObj = req.body;
    var insertValues = {
        "Projekat" :  reqObj.Projekat,
    };

    connection.query("update micko_projekti set aktivan_projekat = 'ne_aktivan' where id_pr = "+Id+"  and Projekti = '"+Projekat+"'",function(error,rows,field) {
        
        if(error) {
            resp.json('Error',error);           
        }
        resp.json("Uspesno aktivacija projekta!!");

    });    
});

routerAdmin.get('/aktivni-projekti',function(req,resp,next){

    connection.query("\
        SELECT  id_pr,\
                Projekti \
        FROM micko_projekti \
        where aktivan_projekat = 'ne_aktivan'",function(error,rows,field) {
        
        if(error) {
            resp.json('Error',error);           
        }
        var rest = [];

        for(var ii in rows) {
        var empobj = rows[ii];
        rest.push(empobj);
        }
        resp.json(rest);

    });  
});

routerAdmin.put('/aktivni-projekti',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Id = query.id;
    var Projekat = query.projekat
    var reqObj = req.body;
    var insertValues = {
        "Projekat" :  reqObj.Projekat,
    };

    connection.query("update micko_projekti set aktivan_projekat = 'aktivan' where id_pr = "+Id+"  and Projekti = '"+Projekat+"'",function(error,rows,field) {
        
        if(error) {
            resp.json('Error',error);           
        }
        resp.json("Uspesno aktivacija projekta!!");

    });  
});

routerAdmin.get('/projekti-nerade',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
   
    connection.query("\
        select Projekti \
            from micko_projekti where aktivan_projekat = 'aktivan' and id_pr not in \
        (select id_projekat \
            from micko_pr_nadimak where id_korisnik = \
        (select id from micko_registracija \
            where Nadimak_Klijent = '"+Ime+"')) \
        UNION ALl\
        select P.Projekti \
            from micko_pr_nadimak as N INNER JOIN micko_projekti as P on N.id_projekat = P.id_pr \
            where N.id_korisnik = Micko_S('"+Ime+"') and zakacen = 'ne_radi' and aktivan_projekat = 'aktivan' ORDER BY Projekti",function(error,rows,field) {

        if(error){
            console.log("Error",error);
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

routerAdmin.put('/dodaj-korisnika-na-projekat',function(req,resp,next){

    var reqObj = req.body;
    var insertValues = {
            "Nadimak" :  reqObj.Nadimak,
            "Projekat" : reqObj.Projekat,
            "godina": reqObj.godina
    };

    /*console.log("Nadimak" + insertValues.Nadimak)
    console.log("Projekat" + insertValues.Projekat)  
    console.log("godina" + insertValues.godina)*/

    connection.query("call dodavanje_projekta('"+insertValues.Nadimak+"','"+insertValues.Projekat+"',"+insertValues.godina+")",function(error,rows,field) {

        if(error){
            console.log("Error",error);
        }
        resp.json("Uspesno je dodat projekat!");       
    });

});

routerAdmin.get('/projekti-na-kojima-rade',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
   
    connection.query("\
            select P.Projekti,\
                   P.id_pr \
                   from micko_projekti as P INNER JOIN micko_pr_nadimak as N on P.id_pr = N.id_projekat \
                   where id_korisnik = Micko_S('"+Ime+"') and zakacen = 'radi' and aktivan_projekat = 'aktivan'",function(error,rows,field) {

        if(error){
            console.log("Error",error);
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

routerAdmin.put('/ukloni-korisnika-sa-projekata',function(req,resp,next){

    var reqObj = req.body;
    var insertValues = {
            "Nadimak" :  reqObj.Nadimak,
            "Projekat" : reqObj.Projekat,
    };

    console.log("Nadimak" + insertValues.Nadimak)
    console.log("Projekat" + insertValues.Projekat)
    console.log("Micko_Zapamti1("+insertValues.Projekat+")")  

    connection.query("\
        update micko_pr_nadimak \
        set zakacen = 'ne_radi'\
        where id_korisnik = Micko_S('"+insertValues.Nadimak+"') and \
        id_projekat = Micko_Zapamti1('"+insertValues.Projekat+"')",function(error,rows,field) {

        if(error){
            console.log("Error",error);
        }
        resp.json("Uspesno je uklonjen projekat!");       
    });

});

routerAdmin.get('/ime-tabele',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Tabela = query.tabela;
    var tabelaAdmin = [];

    connection.query("select * from micko_tabele_ime where ime_tabele = '"+Tabela+"'", function(error, blogs, fields) {

        if(error) {
            resp.json('Error',error);           
        }

        for(var ii in blogs)
        {
            var empobj = blogs[ii];
            tabelaAdmin.push(empobj);
            tabelaAdmin[ii].json = JSON.parse(tabelaAdmin[ii].json)
        }
        PrevodiFunction(tabelaAdmin);
    });

    function PrevodiFunction(tabelaAdmin){

        let prevodF = [];
        let NizSalji = [];

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
            prevodF.push(z);
            for(let nz in prevodF[0]){
                
                for(let p in tabelaAdmin[0].json){
                    if(tabelaAdmin[0].json[p] == nz){
                        let z = {};
                        z['baza'] = nz;
                        z['ime'] = prevodF[0][nz];
                        NizSalji.push(z)
                    }
                }
            }    
            resp.json(NizSalji);
        });
    }
});

//Ne treba zastitaa
routerAdmin.get('/lista/projekti',function(req,resp,next){//Nema potrebe za zastitama
      
      connection.query("SELECT * FROM micko_projekti where aktivan_projekat = 'aktivan'",function(error,rows,field) {
        
          if(error) {
                resp.json('Error',error);           
          }
          var rest = [];

          for(var ii in rows) {
            var empobj = rows[ii];
            rest.push(empobj);
          }
          resp.json(rest);
      });           
});

//Ne treba zastitaa
routerAdmin.get('/korisnici',function(req,resp,next){//Nema potrebe za zastitama
      
    //console.log("Prebaceno Admin1(korisnici)");

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

    });         
});

//Zastitaa, Ovde nema potrebe da stavljamo Aktivan,Neaktivan ali ipak ce biti stavljeno!!
routerAdmin.get('/opcije/satnica/nedelje',function(req,resp,next){//Prosledjuje se mesec i projekat,dobijamo koliko je koji korisnik radio na tom projektu

    //console.log("Prebaceno Admin2(opcije/satnica/nedelje)");

    //Koristi se na admin stranici!!
    var query = url.parse(req.url,true).query;
    var Projekat = query.projekat;
    var Godina = query.godina;  
    var Mesec = query.mesec;
    var Tabela = query.tabela;
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

    //console.log("Projekat" + Projekat);
    //console.log("Mesec" + Mesec);
    //console.log("Godina" + Godina);
    //console.log("Tabela" + Tabela);

    var tabelaPolja = [];
    
    connection.query("select * from micko_tabele_ime where ime_tabele = '"+Tabela+"'", function(error, blogs, fields) {

        if(error) {
            resp.json('Error',error);           
        }
        for(var ii in blogs)
        {
            var empobj = blogs[ii];
            tabelaPolja.push(empobj);
            tabelaPolja[ii].json = JSON.parse(tabelaPolja[ii].json)
        }
        SvaPolja(tabelaPolja);
    });

    let stringPolja = ''
    let brojPolja = 0;
    let objektiPolja = [];

    function SvaPolja(tabelaPolja){

        for(let pd in tabelaPolja){ 
            for(let polje in tabelaPolja[pd].json){
                brojPolja++;
                if(brojPolja == Object.keys(tabelaPolja[pd].json).length){
                    brojPolja = 0;
                    stringPolja += 'S.'+tabelaPolja[pd].json[polje]+'';
                }
                else{
                    stringPolja += 'S.'+tabelaPolja[pd].json[polje]+',';
                }
            
            }
            let z = {};
            z['imeTabele'] = tabelaPolja[pd].ime_tabele;
            z['polja'] = stringPolja;
            objektiPolja.push(z);
            stringPolja = '';
           
        }
        ProjekatSatnice(objektiPolja);
    }

    function ProjekatSatnice(objektiPolja){

        let poljaSva = 'S.nedelja,S.mesec,S.Razvoj,S.odrzavanje,S.dokumentacija,S.implementacija,S.rezijski_poslovi';
        
        connection.query("\
            select P.Projekti,\
                   S.id_projekat_D,\
                   M.Ime_Prezime,\
                   M.Nadimak_Klijent,\
                   S.id_nadimak_D,\
                   S.nedelja,\
                   S.mesec,\
                   "+objektiPolja[0].polja+" \
            from micko_projekti as P INNER JOIN "+objektiPolja[0].imeTabele+" as S \
                   on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id \
            where id_projekat_D = Micko_S_Projekat('"+Projekat+"') and mesec = '"+Mesec+"' and godina = '"+Godina+"' and aktivan_projekat = 'aktivan' \
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
        })   
    }      
})

//Ne treba zastitaa!!
routerAdmin.get('/korisnici/aktivni',function(req,resp,next){
      
    connection.query("SELECT Nadimak_Klijent,Ime_Prezime FROM micko_registracija where aktivan = 'aktivan'",function(error,rows,field) {
        
        if(error)
        {
            esp.json('Error',error);
            return;
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

routerAdmin.get('/projekti/lista',function(req,resp,next){
      
    connection.query("SELECT Projekti,tabela_vrednosti FROM micko_projekti where aktivan_projekat = 'aktivan'",function(error,rows,field) {
    
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

//Ne treba zastita za projekat!!
routerAdmin.post('/projekat/novi',function(req,resp,next){

    var reqObj = req.body;
    var insertValues = {
        "Projekat" :  reqObj.Projekat,
    };

    connection.query("insert into micko_projekti(Projekti,tabela_vrednosti,aktivan_projekat) value('"+insertValues.Projekat+"','sve_jedna_tabela','aktivan');",function(error,rows,field) {
        
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
});

//Zastitaa,URADJENO AKTIVNI,NEAKTIVNI PROJEKTI
routerAdmin.get('/projekti/satnica/nedelje',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;

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

    var imenaTabela = [];
    
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
        Polja(imenaTabela)
        //
    });

    //sumPoljeStringNiz = [''];
    let sumPoljeStringNiz = '';
    objPolja = [];
    //sumPoljeString = '';
    let brPolja = 0;
    let brojQ = 0;

    function Polja(imenaTabela){

        for(let pd in imenaTabela){ 
            for(let polje in imenaTabela[pd].json){
                //console.log(polje + ": " + imenaTabela[pd].json[polje]);
                brPolja++;
                if(brPolja == Object.keys(imenaTabela[pd].json).length){
                    brPolja = 0;
                    sumPoljeStringNiz += 'S.'+imenaTabela[pd].json[polje]+'';
                }
                else{
                    sumPoljeStringNiz += 'S.'+imenaTabela[pd].json[polje]+'+';
                }
            
            }
            let z = {};
            z['imeTabele'] = imenaTabela[pd].ime_tabele;
            z['polja'] = sumPoljeStringNiz;
            objPolja.push(z);
            sumPoljeStringNiz = '';
           
        }
        SumProjekti(objPolja)
    }

    var rest = [];

    function SumProjekti(sumPoljeString){

        //resp.json(sumPoljeString[0].polja);
        let nazivTabele = 'sve_jedna_tabela';
        console.log("duzina" + sumPoljeString.length);    

        connection.query("\
        select P.Projekti,\
            S.id_projekat_D,\
            M.Ime_Prezime,\
            M.Nadimak_Klijent,\
            S.id_nadimak_D,\
            S.nedelja,\
            ("+sumPoljeString[brojQ].polja+") as sum \
        from micko_projekti as P INNER JOIN "+sumPoljeString[brojQ].imeTabele+" as S \
            on P.id_pr = S.id_projekat_D INNER JOIN micko_registracija as M on S.id_nadimak_D = M.id \
        where mesec = '"+Mesec+"' and godina = '"+Godina+"' and aktivan_projekat = 'aktivan'\
        group by id_nadimak_D,id_projekat_D,nedelja",function(error,rows,field) {
            
                brojQ++;
                if(error) {
                        resp.json('Error',error);           
                }
                //var rest = [];

                for(var ii in rows) {
                    var empobj = rows[ii];
                    rest.push(empobj);
                }
                if(sumPoljeString.length == brojQ){
                    resp.json(rest);
                }
                else{
                    SumProjekti(sumPoljeString)
                }
        }) 
    }
});

//Ne treba zastita
routerAdmin.put('/korisnik/deaktivacija',function(req,resp){

    var query = url.parse(req.url,true).query;
    var Nadimak_Klijent = query.Nadimak_Klijent;

    var query = connection.query("UPDATE micko_registracija SET aktivan = 'nije' where Nadimak_Klijent = '"+Nadimak_Klijent+"'",function(error,result){

        if (error) {
            resp.json('Error',error);
        }
        else{
            resp.json("Uspesno deaktiviran");
        }
    });
});

//Ne treba zastitaa!!
routerAdmin.get('/korisnici/neaktivni',function(req,resp,next){
       
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

//Ne treba zastita
routerAdmin.put('/korisnik/aktivacija',function(req,resp){

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


//Ovi upiti se ni ne koristii u aplikaciji Angular 2!!!!
//Ne koristi se u aplikaciji
routerAdmin.put('/aktivacija-korisnik',function(req,resp){

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

//Ne koristi se u aplikaciji
routerAdmin.put('/deaktivacija-korisnik',function(req,resp){

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

//Ne treba zastita jer se ne unosi godina kao kod posta!!
routerAdmin.delete('/projekat/admin',function(req,resp,next){
        
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

//Zastitaa
routerAdmin.post('/projekat/admin',function(req,resp,next){

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

//Zastitaa
routerAdmin.get('/korisnici/pr/nerade',function(req,resp,next){
      
    var query = url.parse(req.url,true).query;
    var imePrijava12 = query.ime;
    
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
});

routerAdmin.get('/projekti/satnica',function(req,resp,next){

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

});

module.exports = routerAdmin;

var connection = mysql.createConnection({
   
        host     : 'localhost',
        user     : 'root',
        password : 'tonet14edu',
        database : 'test_schema',
        //micko : console.log('ConekcijaBaza')
});