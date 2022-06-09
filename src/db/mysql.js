const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

const  con = mysql.createConnection(MYSQL_CONF)


function exec(sql){
  const promise = new Promise((resolve,reject)=>{

    con.query(sql,(err,result)=>{
      if(err){
        reject();
        return 
      }

      resolve(result);

    })

  })
  return promise
}
con.connect();
module.exports = {
  exec
}