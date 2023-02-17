const Crud= require('../model/crud');
const dbCrud= new Crud();

const getAllRecords = (table)=>{
    return new Promise((resolve,rejects)=>{
         dbCrud.ReadAll(table)
         .then(data => resolve(data))
         .catch(err => rejects(err));
       
    })
}



module.exports = {
    getAllRecords,
}