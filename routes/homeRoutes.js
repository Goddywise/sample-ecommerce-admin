const express = require('express');
const router = express.Router();
const {readFile} = require('fs');

router.get('/',(req,res)=>{
    const login = new Promise((resolve,rejects)=>{
        readFile('./public/views/login.html','utf-8',(err,data)=>{
            if(err) rejects(err);
            resolve(data);
        })
    })

    Promise.allSettled([login]).then(values =>{
        res.setHeader('Content-type','text/html');
        res.status(200).send(values[0].value);
    })
})

router.get('/dashboard',(req,res)=>{
    const header = new Promise((resolve,rejects)=>{
        readFile('./public/components/header.html','utf-8',(err,data)=>{
            if(err) rejects(err);
            resolve(data);
        })
    })
    const home = new Promise((resolve,rejects)=>{
        readFile('./public/views/dashboard.html','utf-8',(err,data)=>{
            if(err) rejects(err);
            resolve(data);
        })
    })

    Promise.allSettled([header,home]).then(values =>{
        res.setHeader('Content-type','text/html');
        res.status(200).send(values[0].value+values[1].value);
    })
})
module.exports = router;