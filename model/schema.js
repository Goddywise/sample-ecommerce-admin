const mysql = require('mysql');
const dropTables = false;
const table1 = 'admin_table';
const table2 = 'user_table';
const table3 = 'product_table';


class Schema{
    constructor(){
        this.conn = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database:"eco_db",
            // port:"3308",
            connectionLimit: 50,
        });
        this.dropTables = dropTables;
    }

    CreateTables = ()=>{
        let sql = '';
        let finalResult = ``;
        if(this.dropTables){
            return new Promise((resolve,reject)=>{
                 this.conn.getConnection(async(err,tempConn)=>{
                    if(err) reject(err);
                    sql = `SHOW TABLES`;
                    let result =await new Promise((resolve,reject)=>{
                        this.conn.query(sql,(err,data)=>{
                            if(err) reject(err);
                            resolve(data);
                        });
                    });
                    console.log(result);
                    if(result && this.dropTables){
                        sql = `SET FOREIGN_KEY_CHECKS = 0`;
                        result = null;
                        result = await new Promise((resolve, reject) => {
                            this.conn.query(sql,(err,data)=>{
                                if(err) reject(err);
                                resolve(data);
                            })
                        })
                       
    
                        if(result){
                            result = null;
                            sql = `DROP TABLE IF EXISTS ${table1}`;
                            result= await new Promise((resolve, reject) => {
                                this.conn.query(sql,(err,data)=>{
                                    if(err) reject(err);
                                resolve(`1 ${table1} dropped successfully, `);
                                })
                            })
                            finalResult+= result;
                            if(result){
                                result = null;
                                sql = `DROP TABLE IF EXISTS ${table2}`;
                                result = await new Promise((resolve, reject) => {
                                    this.conn.query(sql,(err,data)=>{
                                        if(err) reject(err);
                                        resolve(`2 ${table2} dropped successfully, `);
                                    })
                                })
                                finalResult+= result;
        
                            }
                            console.log(finalResult)
                            resolve(finalResult)
                        }
                        
                    
                    }
    
                    tempConn.release();
                    
                })
            })    
        }
        let result;
        return new Promise((resolve,reject)=>{
                this.conn.getConnection(async (err,tempConn)=>{
                if(err) reject(err);
                sql = `CREATE TABLE ${table1} (id int AUTO_INCREMENT, username VARCHAR(255), password TEXT, PRIMARY KEY(id))`;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,(err,data)=>{
                        if(err) reject(err);
                        resolve(`1 ${table1} created successfully, `);
                    })
                });
                finalResult+= result;

                sql = `CREATE TABLE ${table2} (id int AUTO_INCREMENT, username VARCHAR(255), password TEXT, PRIMARY KEY(id))`;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,(err,data)=>{
                        if(err) reject(err);
                        resolve(`2 ${table2} created successfully, `);
                    })
                });

                finalResult+= result;
                tempConn.release();
                resolve(finalResult);
            })
        })
    }

    InitializeTables = ()=>{
        let sql = ``;
        let finalResult = ``;
        
        return new Promise((resolve,reject)=>{
            this.conn.getConnection(async (err,tempConn)=>{
                if(err) reject(err) ;
                const adminData = ['goddywise@gmail.com','12345'];
                sql = `INSERT INTO ${table1} (username,password) VALUES(?,?);`;
                let params = adminData;
                let result1 = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,params,(error,data)=>{
                        if(error) reject(`Data not inserted into ${table1}, check the error object`);
                        resolve(`Data inserted into ${table1} successfully `)
                    })
                })

                finalResult+= result1;
                console.log(finalResult);
                resolve(finalResult);
                tempConn.release();
            })
            
        })
    }


}

module.exports = Schema;