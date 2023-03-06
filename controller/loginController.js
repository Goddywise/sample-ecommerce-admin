const Crud= require('../model/crud');
const dbCrud= new Crud();
const table = 'admin_table';

const getAdminDetails = (username,password)=>{
    return new Promise((resolve,rejects)=>{
        dbCrud.GetAdminInfo(table,username,password)
            .then((data) =>{ 
            if(data.length > 0){
                resolve({message:"Login successful",status:200,isSuccessful:true})
            }
            {
                resolve({message:"invalid username or password",status:200,isSuccessful:false})
            }
        })
        .catch(err => rejects(err));
       
    })
}



module.exports = {
    getAdminDetails,
}