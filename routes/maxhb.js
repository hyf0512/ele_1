var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var qhb = require('../server/qhb');
router.post('/max',function(req,res){
	const {url,mobile} = req.body;
	if (!url || !mobile) {
    return res.json({
      message: '请将信息填写完整'
    })
  }
  if (!/^1\d{10}$/.test(mobile)) {
    return res.json({
      message: '请填写 11 位手机号码'
    })
  }
  if (url.indexOf('https://h5.ele.me/hongbao/') === -1) {
    return res.json({
      message: '请填写正确的饿了么红包链接'
    })
  }
  try{
  	qhb(url,mobile);
  	 res.json({
      message: '领取完毕，打开饿了么 APP 查看红包是否到账'
    })
  }catch (e) {
    res.json({
      message: e.message
    })
}
	
});
module.exports = router;