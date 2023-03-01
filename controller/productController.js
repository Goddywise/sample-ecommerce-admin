const Crud= require('../model/crud');
const dbCrud= new Crud();

const getAllProducts = (table)=>{
    return new Promise((resolve,rejects)=>{
         dbCrud.ReadAll(table)
         .then(data => resolve(data))
         .catch(err => rejects(err));
       
    })
}

const addProduct = (data,table)=>{
    console.log(data);
    return data;
}


module.exports = {
    getAllProducts,
    addProduct
}