var config = require('config')
var querystring = require('qs')
var crypto = require('crypto')
let sortObject = require('./utils')
const { Console } = require('console')
const { frontEndDirect } = require('../../enum/login')

let tmnCode = config.get('vnp_TmnCode')
let secretKey = config.get('vnp_HashSecret')

let returnUrl = config.get('vnp_ReturnUrl')
let vnp_Version = config.get('vnp_Version')
let vnp_Command = config.get('vnp_Command')
class vnPayController {
  async CreatePaymentUrl (req, res) {
    // this is an dynamic import, bacause this lib is now a part of ES6
    const dateFormat = (await import('dateformat')).default;
    let vnpUrl = config.get('vnp_Url')
    try {
      let ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

      let date = new Date()
      let createDate = dateFormat(date, 'yyyymmddHHmmss')
      let orderId = dateFormat(date, 'HHmmss')
      let amount = req.body.amount
      let bankCode = req.body.bankCode
      let orderInfo = req.body.orderDescription
      let orderType = req.body.orderType
      let locale = req.body.language
      if (locale === null || locale === '') {
        locale = 'vn'
      }
      let currCode = 'VND'
      let vnp_Params = {}
      date.setMinutes(date.getMinutes() + 15);
      let expireDate = dateFormat(date, 'yyyymmddHHmmss');
      vnp_Params['vnp_Version'] = vnp_Version
      vnp_Params['vnp_Command'] = vnp_Command
      vnp_Params['vnp_TmnCode'] = tmnCode
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params['vnp_Locale'] = locale
      vnp_Params['vnp_CurrCode'] = currCode
      vnp_Params['vnp_TxnRef'] = orderId
      vnp_Params['vnp_OrderInfo'] = orderInfo
      vnp_Params['vnp_OrderType'] = orderType
      vnp_Params['vnp_Amount'] = amount * 100
      vnp_Params['vnp_ReturnUrl'] = returnUrl
      vnp_Params['vnp_IpAddr'] = ipAddr
      vnp_Params['vnp_CreateDate'] = createDate
      vnp_Params['vnp_ExpireDate'] = expireDate
      if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode
      }

      vnp_Params = sortObject(vnp_Params)
      
      var signData = querystring.stringify(vnp_Params, { encode: false })
     
      var hmac = crypto.createHmac('sha512', secretKey)
      var signed = hmac.update( Buffer.from(signData, 'utf-8')).digest('hex')
      vnp_Params['vnp_SecureHash'] = signed
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })
      res.redirect(vnpUrl)
    } catch (error) {
        console.log(error)
      res.status(502).json('BAD GATE WAY : CAN NOT CONNECT TO VNPAY')
    }
  }
// check the consistance of data, do not update the result here
  async vnpay_return(req,res){
    try {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false }); 
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update( Buffer.from(signData, 'utf-8')).digest("hex");   
    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        // res.json( {code: vnp_Params['vnp_ResponseCode']})
        res.redirect(frontEndDirect.vnpayTransactionResult+'?'+'code='+vnp_Params['vnp_ResponseCode'])
    } else{
      res.redirect(frontEndDirect.vnpayTransactionResult+'?'+'code=97')
      res.json( {code: '97'})
    }
    } catch (error) {
        res.status(502).json('BAD GATE WAY : CAN NOT CONNECT TO VNPAY')
    }
  }
  // check the vnPay response and asynchro data and make annouce to VNpay about its response
  async vnpay_ipn(req,res){
    try {
      var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        vnp_Params = sortObject(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });  
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update( Buffer.from(signData, 'utf-8')).digest("hex");     
         
        if(secureHash === signed){
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            res.status(200).json({RspCode: '00', Message: 'success'})
        }
        else {
            res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
        }
    } catch (error) {
       res.status(502).json("BAD GATE WAY")
    }
  }
}

module.exports = new vnPayController()