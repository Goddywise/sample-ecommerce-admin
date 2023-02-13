const express = require('express');
const router = express.Router();
const {createTables} = require('../controller/dbController');


router.get('/create-tables',async(req,res)=>{
    data = await createTables();
    res.send({data});
})





module.exports = router;