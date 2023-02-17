const express = require('express');
const router = express.Router();
const {getAllRecords} = require('../controller/productController');
const table = 'product_table';

router.get('/get-all-products',async(req,res)=>{
    data = await getAllRecords(table);
    res.send({data});
})


module.exports = router;