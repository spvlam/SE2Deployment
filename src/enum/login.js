class LoginDevices{
    static numberDevices = 2;
    static accessToken = 0;
    static refreshToken = 1;
} 
class frontEndDirect{
    static directREGISTERSUCCESS = "http://localhost:8080/";
    static loginFacebookSuccess = "http://localhost:8081/success2authen"
}

module.exports = {LoginDevices,frontEndDirect}