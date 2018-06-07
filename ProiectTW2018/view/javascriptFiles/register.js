//var createUser = require ('../../models/user.js')

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

    if (pw1 === pw2){
        alert("Passwords match!");
    }
    else{
        alert("Passwords doesn't match!");
    }

    var url = 'http://localhost:8125/Register';
    var data = {
        username: un,
        email: em,
        password: pw
    };
    console.log(data.em + ' ' + data.password + ' ' + data.username);

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            console.log('nu stiu ce fac, manca-ti-as');
        }
    }

    xhr.send(JSON.stringify(data));

}