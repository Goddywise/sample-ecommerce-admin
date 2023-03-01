const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:"../assets/uploads/"});
const {getAllProducts,addProduct} = require('../controller/productController');

const table = 'product_table';

router.get('/get-all-products',async(req,res)=>{
    const dta = await getAllProducts(table);
    res.send({dta});
})

router.get('/add-new-product',upload.single("image"),async (req,res)=>{
    const data = addProduct(req.body);
    console.log(data);
    res.send({data});
})



module.exports = router;