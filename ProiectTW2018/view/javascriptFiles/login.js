var xhr = new XMLHttpRequest();

function validateForm() {
    var un = document.getElementById('usr').value;
    var pw = document.getElementById('pword').value;
    
    var url = 'http://localhost:8125/Login';
    var data = {
        username: un,
        password: pw
    };
    console.log(data.username + ' ' + data.password);

    xhr.open('POST',url);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            console.log('nu stiu ce fac, manca-ti-as');
        }
    }

    xhr.send(JSON.stringify(data));

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
