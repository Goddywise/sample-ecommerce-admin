const mysql = require('mysql');
const dropTables =false;
const table1 = 'admin_table';
const table2 = 'user_table';
const table3 = 'product_table';


class Schema{
    constructor(){
        this.conn = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database:"firstdb",
            port:"3308",
            connectionLimit: 50,
        });
        this.dropTables = dropTables;
    }

    CreateTables = async()=>{
        let sql = '';
        let finalResult = ``;
        if(this.dropTables){
            this.conn.getConnection((err,tempConn)=>{
                if(err) throw err;
                sql = `SHOW TABLES`;
                let result = new Promise((resolve,reject)=>{
                    this.conn.query(sql,(err,data)=>{
                        if(err) reject(err);
                        resolve(data);
                    });
                });
                if(result && this.dropTables){
                    sql = `SET FOREIGN_KEY_CHECKS = 0`;
                    result = null;
                    result = new Promise((resolve, reject) => {
                        this.conn.query(sql,(err,data)=>{
                            if(err) reject(err);
                            resolve(data);
                        })
                    })

                    // if(result){
                    //     result = null;
                    //     sql = `DROP TABLE IF EXISTS ${table1}`;
                    //     result= new Promise((resolve, reject) => {
                    //         this.conn.query(sql,(err,data)=>{
                    //             if(err) reject(err);
                    //             resolve(data);
                    //         })
                    //     })

                    //     if(result){
                    //         result = null;
                    //         sql = `DROP TABLE IF EXISTS ${table2}`;
                    //         result= new Promise((resolve, reject) => {
                    //             this.conn.query(sql,(err,data)=>{
                    //                 if(err) reject(err);
                    //                 resolve(data);
                    //             })
                    //         })
    
                    //     }
                    // }
                    
                
                }

                tempConn.release();
            })
        }
        let result;
        return new Promise((resolve,reject)=>{
                this.conn.getConnection((err,tempConn)=>{
                if(err) throw err;
                sql = `CREATE TABLE ${table1} (id int AUTO_INCREMENT, username VARCHAR(255), password TEXT, PRIMARY KEY(id))`;
                result = new Promise((resolve,reject)=>{
                    this.conn.query(sql,(err,data)=>{
                        if(err) reject(err);
                        resolve(data);
                    })
                });
                finalResult+= result;
                tempConn.release();
                resolve(finalResult);
            })
        })
        

    }


}

module.exports = Schema;