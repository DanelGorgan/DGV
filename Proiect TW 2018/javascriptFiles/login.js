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

function showPassword(){
    var password = document.getElementById('pword');
    if (password.type == "password"){
        password.type="text";
    } else {
        password.type="password";
    }
}
