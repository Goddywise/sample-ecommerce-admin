const Schema= require('../model/schema');
const dbSchema = new Schema();

const createTables = async()=>{
    return new Promise((resolve,rejects)=>{
        dbSchema.CreateTables()
        .then(data => data)
        .catch(err => err);
    })
}


module.exports = {
    createTables,
}