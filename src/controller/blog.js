const getList = ( author, keyword )=>{
  return [
    {
      id:1,
      title:'标题A',
      content:'内容A',
      createTime:'1654510620459',
      author:'zhangsan'
    },
    {
      id:2,
      title:'标题B',
      content:'内容B',
      createTime:'1654510660153',
      author:'lisi'
    }
  ]
}

const getDetail = (id)=>{
  return {
    id:1,
    title:'标题A',
    content:'内容A',
    createTime:'1654510620459',
    author:'zhangsan'
  }
}

const newBlog = (blogData={})=>{
  return {
    id:3
  }
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