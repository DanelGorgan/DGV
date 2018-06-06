//var createUser = require ('../../Database/user.js')

function showPassword1(){
    var password = document.getElementById('pword1');
    if (password.type == "password"){
        password.type="text1";
    } else {
        password.type="password";
    }
}

function showPassword2(){
    var password = document.getElementById('pword2');
    if (password.type == "password"){
        password.type="text1";
    } else {
        password.type="password";
    }
}

function validateForm(){
    var un = document.getElementById('usr').value;
    var em = document.getElementById('email').value;
    var pw1 = document.getElementById('pword1').value;
    var pw2 = document.getElementById('pword2').value;

    console.log(pw1 + ' ' + pw2);
    
    if (pw1 === pw2){
        alert("Passwords match!");
        return true;
    }
    else{
        alert("Passwords doesn't match!");
        return false;
    }

    return true;
}