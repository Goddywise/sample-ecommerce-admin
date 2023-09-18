const express = require('express');
const router = express.Router();
const {createNewUser} = require('../controller/userController');


router.post('/create-user',async(req,res)=>{
    const obj = req.body;
    const data = await createNewUser(obj);
    res.send({data});
});

module.exports = router;