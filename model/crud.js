const mysql = require('mysql');


class Crud{
    constructor(){
        this.conn = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            // database:"eco_db",
            // port:"3308",
            database:process.env.DATABASE,
            port:process.env.DB_PORT,
            connectionLimit: process.env.CONNECTIONLIMIT,
        });
    }

    ReadAll = (table)=>{
        let sql = '';
        let result;
        try{
            let rt  = new Promise((resolve,reject)=>{
                this.conn.getConnection(async(err,tempConn)=>{
                    if(err) reject(err);
                    sql = `SELECT * FROM ${table}`;
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
            return e;
        }
        
    }
    GetAdminDetails = (table,username,password)=>{
        let sql = '';
        let result;

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
}
                    

module.exports = Crud;