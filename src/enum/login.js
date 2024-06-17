class LoginDevices{
    static numberDevices = 2;
    static accessToken = 0;
    static refreshToken = 1;
} 
class frontEndDirect{
    static directREGISTERSUCCESS = "se-deploy-fr.vercel.app/";
    static loginFacebookSuccess = "se-deploy-fr.vercel.app/success2authen"
     static vnpayTransactionResult = "se-deploy-fr.vercel.app/vnpay"
}

module.exports = {LoginDevices,frontEndDirect}