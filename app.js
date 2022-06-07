const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req)=>{
  const promise = new Promise((resolve,reject)=>{

    if( req.method !== 'POST' ){
      resolve({})
      return 
    }

    if(req.headers['Content-type'] !== 'application/json' ){
      resolve({})
      return 
    }

    let postData = ''
    req.on('data',chunk=>{
      postData += chunk.toString()
    })
    req.end(()=>{
      if( !postData ){
        resolve({})
        return 
      }

      resolve(
        JSON.parse(postData)
      )
    })

  })

  return promise 
}

const serverHandle = (req,res)=>{
  res.setHeader('Content-type','application/json')

  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])
  
  getPostData(req).then((postData)=>{
    req.body = postData

    const blogData = handleBlogRouter(req,res);
    if( blogData ){
      res.end(
        JSON.stringify(blogData)
      )
      return ;
    }

    const userData = handleUserRouter(req,res);
    if( userData ){
      res.end(
        JSON.stringify(userData)
      )
      return ;
    }
    // const resData = {
    //   name:'tq',
    //   site:'ioo',
    //   env: process.env.NODE_ENV
    // }

    //未命中路由，返回404
    res.writeHead(404,{
      "Content-typ":"text/plain"
    })
    res.write("404 Not Found\n")
    res.end()
  });
  

  // res.end(
  //   JSON.stringify(resData)
  // )
}

module.exports = serverHandle