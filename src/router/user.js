const { loginCheck } = require('../controller/user')
const handleUserRouter = (req,res)=>{

  const method = req.method //GET PST

  // 登录
  if( method === 'POST' && req.path ==='/api/user/login' ){
    // return {
    //   msg:'这是登录的接口'
    // }
    const { username,passsword } = req.body
    const result = loginCheck(username,passsword)
    if( result ){
      return new SuccessModel()
    }else{
      return new ErrorModel('登录失败')
    }
  }

}

module.exports = handleUserRouter