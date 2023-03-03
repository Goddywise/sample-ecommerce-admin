const Crud= require('../model/crud');
const dbCrud= new Crud();

const getAllProducts = (table)=>{
    return new Promise((resolve,rejects)=>{
         dbCrud.ReadAll(table)
         .then(data => resolve(data))
         .catch(err => rejects(err));
       
    })
}

const addProduct = (req,table)=>{
    let obj = req.body;
    return new Promise((resolve,rejects)=>{
        dbCrud.AddNewProduct(obj,table)
        .then(data => resolve(data))
         .catch(err => rejects(err));
    })
}


module.exports = {
    getAllProducts,
    addProduct
}