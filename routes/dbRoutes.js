const express = require('express');
const router = express.Router();

const {createTables,initializeTables} = require('../controller/dbController');


router.get('/create-tables',async(req,res)=>{
    data = await createTables();
    res.send({data});
})

router.get('/initialize-tables',async(req,res)=>{
    data = await initializeTables();
    res.send({data});
})

module.exports = router;