const Crud= require('../model/crud');
const dbCrud= new Crud();
const table = 'admin_table';

const getAdminDetails = (username,password)=>{
    return new Promise((resolve,rejects)=>{
         dbCrud.GetAdminDetails(table,username,password)
         .then(data => resolve(data))
         .catch(err => rejects(err));
       
    })
}



module.exports = {
    getAdminDetails,
}