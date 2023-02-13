const Schema= require('../model/schema');
const dbSchema = new Schema();

const createTables = ()=>{
    return new Promise((resolve,rejects)=>{
         dbSchema.CreateTables()
         .then(data => resolve(data))
         .catch(err => rejects(err))
       
    })
}


module.exports = {
    createTables,
}