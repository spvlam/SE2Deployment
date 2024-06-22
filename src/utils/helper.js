const crypto = require('crypto');
module.exports = {
    createPass() {     
            const passwordLength = 10;
            const password = crypto.randomBytes(passwordLength).toString('hex');
            return 123+password+'@gmaABC';
    },
    randomArray(){
        const passwordLength = 10;
        const password1= crypto.randomBytes(passwordLength).toString('hex');
        const password2= crypto.randomBytes(passwordLength).toString('hex');
        return password1+'2'+password2+1+password1;
    },
    giveCurrentDateTime (){
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        return dateTime;
    }
}
