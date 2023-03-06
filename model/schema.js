const mysql = require('mysql');
const dropTables =false;
const table1 = 'admin_table';
const table2 = 'user_table';
const table3 = 'product_table';

class Schema{
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
                    //console.log(result);
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
                           
                        }
                        if(result){
                            result = null;
                            sql = `DROP TABLE IF EXISTS ${table2}`;
                            result = await new Promise((resolve, reject) => {
                                this.conn.query(sql,(err,data)=>{
                                    if(err) reject(err);
                                    resolve(`2 ${table3} dropped successfully, `);
                                })
                            })
                            finalResult+= result;
    
                        }

                        if(result){
                            result = null;
                            sql = `DROP TABLE IF EXISTS ${table3}`;
                            result = await new Promise((resolve, reject) => {
                                this.conn.query(sql,(err,data)=>{
                                    if(err) reject(err);
                                    resolve(`3 ${table3} dropped successfully, `);
                                })
                            })
                            finalResult+= result;
    
                        }
                       // console.log(finalResult)
                        resolve(finalResult)
                        
                    
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
//what's the code that direct us Secting from this below table, since we have many tables---According to readAll > crud.js
                sql = `CREATE TABLE ${table3} (id int AUTO_INCREMENT,name VARCHAR(255), price int,discount int, image TEXT, description TEXT,rating int, total_left int, total_sold int, PRIMARY KEY(id))`;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,(err,data)=>{
                        if(err) reject(err);
                        resolve(`3 ${table3} created successfully, `);
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
                let params;
                let result;
                const adminData = ['goddywise@gmail.com','12345'];
                sql = `INSERT INTO ${table1} (username,password) VALUES(?,?);`;
                params = adminData;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,params,(error,data)=>{
                        if(error) reject(`Data not inserted into ${table1}, check the error object`);
                        resolve(`Data inserted into ${table1} successfully `)
                    })
                })
                finalResult+= result;

                const productData = [
                    ['Six Pairs-in-1 Quality Ankle Socks','5200','2','item-1.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat.','4','5000','2000'],

                    ['Biore UV Aqua Rich Watery Essence Sunscreen SPF 50 (50ml)','3400','1','item-2.jp','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat.','4','5000','1700'],
                    
                    ['1000 mAH power bank','12000','1','item-3.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat.','4','5000','2340'],

                    ['Wrist watch and Wrist band','5400','2','item-6.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat','4','5000','3300'],

                    ['62GB flash drive','5400','2','item-4.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat','4','3000','3000'],
                    
                    ['hand band','5000','5','item-5.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat','5','3000','5000'],

                    ['32iches plasma TV','85000','5','item-7.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum. Non repudiandae tempora dicta ipsam exercitationem tempore sapiente, odit rem? Voluptatem, fugiat','5','3000','500'],

                    ['blue gate UPS','50000','2','item-8.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','6','3000','100'],

                    ['40inches plasma TV','120000','5','item-9.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','6','3000','100'],
                    
                    ['Plate stand set','12000','2','item-10.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','6','2000','300'],

                    ['ear pud','12000','2','item-11.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum,Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','2','10','30'],

                    ['mini scale','12000','2','item-17.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum,Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','2','200','100'],

                    ['mini scale','25000','2','item-17.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum,Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','3','2000','400'],

                    ['bravo perfume','20000','10','item-18.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum,Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','3','200','200'],

                    ['Short wear','10000','15','item-19.jpg','Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum,Blanditiis amet nemo tempore quo perspiciatis minus repellendus excepturi harum.','3','200','100']
                ];

                sql = `INSERT INTO ${table3} (name,price,discount,image,description,rating,total_left,total_sold) VALUES ?;`;
                params = productData;
                result = await new Promise((resolve,reject)=>{
                    this.conn.query(sql,[params],(error,data)=>{
                        if(error) reject(`Data not inserted into ${table3}, check the error object`);
                        resolve(`Data inserted into ${table3} successfully `)
                    })
                })
                finalResult+= result;



                
                console.log(finalResult);
                resolve(finalResult);
                tempConn.release();
            })
            
        })
    }
}

module.exports = Schema;