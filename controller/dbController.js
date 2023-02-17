const Schema= require('../model/schema');
const dbSchema = new Schema();

const createTables = ()=>{
    return new Promise((resolve,rejects)=>{
         dbSchema.CreateTables()
         .then(data => resolve(data))
         .catch(err => rejects(err));
       
    })
}

const initializeTables = ()=>{
    return new Promise((resolve,reject)=>{
        dbSchema.InitializeTables()
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

module.exports = {
    createTables,
    initializeTables
}