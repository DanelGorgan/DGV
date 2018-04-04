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