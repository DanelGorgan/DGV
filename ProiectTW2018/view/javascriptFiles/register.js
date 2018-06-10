//var createUser = require ('../../models/user.js')
var xhr = new XMLHttpRequest();

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
    console.log('asdasdsadasbdjsabdjhsabdbasdj')
    var un = document.getElementById('usr').value;
    var em = document.getElementById('email').value;
    var pw1 = document.getElementById('pword1').value;
    var pw2 = document.getElementById('pword2').value;

    if (pw1 !== pw2){
        alert("Passwords doesn't match!");
    }

    var url = 'http://localhost:8125/Register';
    var data = {
        username: un,
        email: em,
        password: pw1
    };
    console.log(data.email + ' ' + data.password + ' ' + data.username);

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == XMLHttpRequest.DONE){
            console.log('xhr.readyState=XMLHttpRequest.done');
            if (xhr.status==200){   
                console.log('xhr response text is ' + xhr.responseText);
                if (xhr.responseText === "Success"){
                    alert("You have succesfully registered!");
                    window.location.href = "http://localhost:8125/Login";
                }else{
                    alert("User already exist!");
                }
            }
        }
    }

    xhr.send(JSON.stringify(data));

}