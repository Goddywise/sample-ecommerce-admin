const Crud= require('../model/crud');
const dbCrud = new Crud();
const table = 'user_table';

const createNewUser = async(obj)=>{
    const {username} = obj;
    let check = await dbCrud.ReadWithOneField({username},table);
    if(check.length == 0){
        return await dbCrud.AddNewUser(obj,table);
    }
    
    return ({isSuccessFul:true,message:'User with this email already exist',status:200});

    
}



module.exports = {
    createNewUser,
}