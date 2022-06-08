const { exec } = require('../db/mysql')
const getList = ( author, keyword )=>{
  let sql = ` select * from blogs where 1=1 `
  if( author ){
    sql += `and author='${author}'`
  }
  if( keyword ){
    sql+=`and title like '%${keyword}%'`
  }
  sql +='order by createtime desc;'
  return exec(sql);
}

const getDetail = (id)=>{
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows =>{
    console.log(rows[0])
    return rows[0]
  });
}

const newBlog = (blogData={})=>{
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  const sql = `insert into blogs(title,content,author,createtime) values('${title}','${content}','${author}','${createtime}')`
  return exec(sql).then(insertData =>{
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id,blogData={})=>{
  return true
}

const delBlog = (id)=>{
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}