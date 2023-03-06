const mysql = require('mysql');


class Crud{
    constructor(){
        this.conn = mysql.createPool({
            // host: process.env.HOST,
            host: 'localhost',
            // user: process.env.USER,
            user: 'root',
            // password: process.env.PASSWORD,
            password:'',
            // database:"eco_db",
            // port:"3308",
            // database:process.env.DATABASE,
            database:'firstdb',
            // port:process.env.DB_PORT,
            port:'3308',
            // connectionLimit: process.env.CONNECTIONLIMIT,
            connectionLimit:50,
        });
    }

    ReadAll = (tble)=>{
        let sql = '';
        let result;
        //What is the value of ${tble} that we're selecting from----?
        //SELECT all FROM ${tble} does it exist before--- e.g selecting from table1 while the table1 will be declare at the top----
        try{
            let rt  = new Promise((resolve,reject)=>{
                this.conn.getConnection(async(err,tempConn)=>{
                    if(err) reject(err);
                    sql = `SELECT * FROM ${tble}`;
                    result = await new Promise((resolve, reject) => {
                        this.conn.query(sql,(err,data)=>{
                            if(err) reject(err);
                            resolve(data);
                        })
                    })
                    resolve(result);
                    tempConn.release();
                })
            })
            return rt;
        }
        catch(e){
            console.log(e);
            return e;
        }
        
    }
    GetAdminInfo = (table,username,password)=>{
        let sql = '';
        let result;
//What is the value of ${table} that we're selecting from----?
        return new Promise((resolve,reject)=>{
                this.conn.getConnection(async(err,tempConn)=>{
                if(err) reject(err);
                sql = `SELECT username,password FROM ${table} WHERE username='${username}' AND password = '${password}' `;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,(err,data)=>{
                        if(err) reject(err);
                        resolve(data);
                    })
                })
                resolve(result);
                tempConn.release();

            })
        })

    }
    AddNewProduct = (obj,table)=>{
        
        const name = obj.name;
        const image = obj.image;
        const discount = obj.discount;
        const total = obj.total;
        const price = obj.price;
        const description = obj.description;
        return new Promise((resolve,reject)=>{
                this.conn.getConnection(async (err,tempConn)=>{
                if(err) reject(err) ;
                let params;
                let result;
                //I thougth array work with index, why productData scattered
                const productData = [name,price,discount,image,description,'0',total,'0'];
                const sql = `INSERT INTO ${table} (name,price,discount,image,description,rating,total_left,total_sold) VALUES(?,?,?,?,?,?,?,?);`;
                params = productData;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,params,(error,data)=>{
                        if(error) reject(`Error:${error} \n Data not inserted into ${table}, check the error object`);
                        resolve({id:data.insertId,image:image,message:`product added successfully `})
                    })
                })

                tempConn.release();
                resolve(result);            
             })
        })
        

    }
}
                    

module.exports = Crud;