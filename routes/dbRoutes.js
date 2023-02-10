const express = require('express');
const router = express.Router();
const {createTables} = require('../controller/dbController');


router.get('/create-tables',async(req,res)=>{
    let data = await createTables();
    res.send({data});
    // .then(data => res.send({data}))
    // .catch(err => res.send({err}))
})





module.exports = router;