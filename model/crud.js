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
    GetAdminDetails = (table,username,password)=>{
        let sql = '';
        let result;

        return new Promise((resolve,reject)=>{this.conn.getConnection(async(err,tempConn)=>{
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
}
                    

module.exports = Crud;