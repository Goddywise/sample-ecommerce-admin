const express = require('express');
const router = express.Router();
const {getAllProducts,addProduct} = require('../controller/productController');
const formidable = require('formidable');
const fs= require('fs');
const path = require('path');
const { resolve } = require('path');
const table = 'product_table';

const uploadImageFile = async(req,res,next)=>{
    const form = new formidable.IncomingForm();
    let result2 = await new Promise((resolves,reject)=>{
            form.parse(req,async function(err,fields,files){
            
            if(err) reject(err);
            let oldP = files.image.filepath;
            let newName = Math.floor(Math.random()*10000000000000000)+'.'+files.image.originalFilename.split('.').at(-1);
            // .at (-1) is to get the of extention of an image

            let newP = path.join(__dirname,'./../assets','images',newName);
            let result = await new Promise((resolve,reject)=>{
                    fs.rename(oldP,newP,function(err){
                    if(err) reject(err);
                    //console.log(fields);
                    resolve({image:newName,...fields});
                })
            })
            
            resolves(result);
            
        })
    })
    //console.log(result2);
    req.body = result2;
    next();
}

router.get('/get-all-products',async(req,res)=>{
    const dta = await getAllProducts(table);
    res.send({dta});
})


router.post('/add-new-product-2',uploadImageFile,async(req,res)=>{  
    //console.log(req.body); 
    const data = await addProduct(req,table);
    res.send({data});

})



module.exports = router;