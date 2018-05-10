function validateForm() {
    var un = document.getElementById('usr').value;
    var pw = document.getElementById('pword').value;
    var username = "username@gmail.com"; 
    var password = "password";
    if ((un == username) && (pw == password)) {
        return true;
    }
    else {
        alert ("Login was unsuccessful, please check your username and password");
        return false;
    }
}

//vezi MVC
//fa cookie ca atunci cand unn utilizator se logheaza, la a doua logare sa apara sugestia cand scrie
//Sesiuni. Atunci cand se logheaza, dupa c inchide browser-ul, cand intra inapoi sa nu fie delogat userul

function showPassword(){
    var password = document.getElementById('pword');
    if (password.type == "password"){
        password.type="text";
    } else {
        password.type="password";
    }
}
