const { getList,getDetail,newBlog,updateBlog,delBlog } = require('../controller/blog')
const { SuccessModel,ErrorModel } = require(  '../model/resModel')

//统一公共登录验证函数
const loginCheck = (req)=>{
  if(!req.session.username){
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = (req,res)=>{

  const method = req.method //GET PST
  const id = req.query.id || ''
  
  // 获取博客列表
  if( method === 'GET' && req.path ==='/api/blog/list' ){
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    if( req.query.isadmin ){
      const loginCheckResult = loginCheck(req)
      if( loginCheckResult ){
        return loginCheckResult
      }
      author= req.session.username
    }
    const result = getList(author,keyword)
    return result.then((listData)=>{
      return new SuccessModel(listData)
    })
    
  }

  // 获取博客详情
  if( method === 'GET' && req.path ==='/api/blog/detail' ){
    const result = getDetail(id)
    return result.then((detailData)=>{
      return new SuccessModel(detailData)
    })
  }

  // 新建一篇博客
  if( method === 'POST' && req.path ==='/api/blog/new' ){
    const blogData = req.body
    // const data = newBlog(blogData)
    // return new SuccessModel(data)
    const loginCheckResult = loginCheck(req)
    if( loginCheckResult ){
      return loginCheckResult
    }
    const author = req.session.username
    req.body.author = author
    const result = newBlog(req.body)
    return result.then((detailData)=>{
      return new SuccessModel(detailData)
    })
  }

  // 更新一篇博客
  if( method === 'POST' && req.path ==='/api/blog/update' ){
    const result = updateBlog(id,req.body)
    const loginCheckResult = loginCheck(req)
    if( loginCheckResult ){
      return loginCheckResult
    }
    return result.then((val)=>{
      if(val){
        return new SuccessModel()
      }else{
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除一篇博客
  if( method === 'POST' && req.path ==='/api/blog/del' ){
    const loginCheckResult = loginCheck(req)
    if( loginCheckResult ){
      return loginCheckResult
    }
    const author = req.session.username
    req.body.author = author
    const result = delBlog(id,author)
    return result.then((val)=>{
      if(val){
        return new SuccessModel()
      }else{
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter