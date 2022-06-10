const { login } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')


const getCookieExpires=()=>{
  const d = new Date()
  d.setTime(d.getTime()+(24*60*60*1000))
  return d.toGMTString()
}

const handleUserRouter = (req,res)=>{

  const method = req.method //GET PST

  // 登录
  if( method === 'GET' && req.path ==='/api/user/login' ){
    // const { username,password } = req.body
    const { username,password } = req.query
    const result = login(username,password)
    return result.then(data=>{
      res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`);
      if( data.username ){
        req.session.username = data.username
        req.session.realname= data.username
        console.log('req.session is '.req.session)
        return new SuccessModel()
      }else{
        return new ErrorModel('登录失败')
      }
    })
  }
  
  //登录验证
  if(method === 'GET' && req.path === '/api/user/login-test'){
    if( req.session.username ){
      return Promise.resolve(new SuccessModel({
        session:req.session
      }))
    }
    return Promise.resolve(new ErrorModel('尚未登录')) 
  }
}

module.exports = handleUserRouter