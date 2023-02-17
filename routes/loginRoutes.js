const express = require('express');
const router = express.Router();
const {getAdminDetails}  = require('../controller/loginController')

router.post('/submit',async(req,res)=>{
    const {username,password} = req.body;
    let data = await getAdminDetails(username,password);
    res.send({data});

});







module.exports = router;