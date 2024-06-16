class LoginDevices{
    static numberDevices = 2;
    static accessToken = 0;
    static refreshToken = 1;
} 
class frontEndDirect{
    static directREGISTERSUCCESS = "http://localhost:8080/";
    static loginFacebookSuccess = "http://localhost:8080/success2authen"
     static vnpayTransactionResult = "http://localhost:8080/vnpay"
}

module.exports = {LoginDevices,frontEndDirect}