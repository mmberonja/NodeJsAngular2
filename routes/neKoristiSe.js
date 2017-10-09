
//Zastitaa
router.get('/projekti-prevodi-proba',function(req,resp,next){

    var query = url.parse(req.url,true).query;
    var Ime = query.ime;
    /*var Mesec = query.mesec;
    var Nedelja = query.nedelja;
    var Godina = query.godina;*/
    
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
    //var godinaUpit = Godina;
    var probaGodina;
    var prevod = [];
    var rest_ime_tabela = [];
    var cuvajObjetke = [];
    var spajanje;
    //Zastita!!

    tabela = 'obuka'
    var t = [{
        id_pr: 4,
        Projekti: "Eksterna obuka, kurs, seminar, …",
        Razvoj: 2,
    },
    {
        id: 27,
        ime: "INIT 10",
        Razvoj: 2,
    }]
    var t2 = [{
        nesto: 27,
        bre: "INIT 10",
        Razvoj: 2,
    }]

    //var children = t.concat(t2);
    var obj1 = { food: 'pizza', car: 'ford' }
    var obj2 = { animal: 'dog' }
    var obj3 = {};
    for(var attrname in obj1){
        obj3[attrname] = obj1[attrname]; 
    }
    for(var attrname in obj2){
        obj3[attrname] = obj2[attrname];
    }
    function Gotovo(a){

        console.log("a"+nesto);
        /*for(var i in nesto){

                connection.query("select id from micko_tabele_ime where ime_tabele = '"+nesto[i].tabela+"'",function(error,rows,field) {
                
                if(error)
                {
                    console.log('Error',error);
                    //resp.json('Error',error);
                }
                    

            }.bind(console.log("Gotovo1")));
        }*/
    }
   
    var nesto = []
    connection.beginTransaction(function(error) {    
        
        connection.query("select * from micko_tabele_ime",function(error,rows,field) {
            
            if(error)
            {
                console.log('Error',error);
                resp.json('Error',error);
            }
            
            for(var ii in rows)
            {
                var empobj = rows[ii];
                rest_ime_tabela.push(empobj);
                nesto[ii] = JSON.parse(rest_ime_tabela[ii].json)
            }
            
            

            resp.json(nesto);

        }.bind(Gotovo(),this.nesto));

  });
});

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

//Ne koristi se u aplikciji
/*router.get('/Za-dati-projekat-korisnici-koji-rade-na-njemu',function(req,resp,next){

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

/*router.get('/Djuture-upis',function(req,resp,next){
      
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

/*router.get('/trenutni-mesec',function(req,resp,next){
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

/*router.get('/prevodi',function(req,resp,next){
      
    connection.query("select * from micko_prevodi",function(error,rows,field) {
        
        if(error)
        {
            console.log('Error',error);
            resp.json('Error',error);
        }
        var rest = [];
        var prevod = [];

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

        resp.json({
            Prevodi:prevod
        });
    });  
})*/

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

/*var mailOptions = {
    //from: '"Miroslav Beronja" <miroslavmicko1964@gmail.com>', // sender address
    from: '<miroslav.beronja@to-net.rs>',
    //to: 'miroslav.beronja@to-net.rs', // list of receivers
    to: 'mickochelsea1234@gmail.com', // list of receivers
    subject: 'Zahtev za dodavanje novog projekta ✔', // Subject line
    text: 'Ime novog projekta!!', // plain text body
    html: '<b>Ime novog projekta!!</b>' // html body
};*/

/*var server = email.server.connect({
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


var nizNekio = [[

    {ime : "Micko"}
    ]
];

/*
    router.get('/Djuture-upis123',function(req,resp,next){
            
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
        
            
    });

    router.get('/Nedelja-trenutna',function(req,resp,next){
        
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
    
        
    });

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
    });

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

    });  

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
    })

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