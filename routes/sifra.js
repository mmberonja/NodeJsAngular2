var express = require('express');
var routerSifra = express.Router();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var url = require('url');
//var datetime = require('node-datetime');
var bcrypt = require('bcryptjs');
var randomBytes = require('random-bytes');



routerSifra.post('/promena-sifre',function(req,resp,next){

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
});


module.exports = routerSifra;

var connection = mysql.createConnection({
   
        host     : 'localhost',
        user     : 'root',
        password : 'tonet14edu',
        database : 'test_schema',
        //micko : console.log('ConekcijaBaza')
});