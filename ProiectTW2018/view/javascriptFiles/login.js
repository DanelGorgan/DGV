var xhr = new XMLHttpRequest();

function validateForm() {
    var em = document.getElementById('usr').value;
    var pw = document.getElementById('pword').value;
    
    var url = 'http://localhost:8125/Login';
    var data = {
        email: em,
        password: pw
    };
    console.log(data.email + ' ' + data.password);

    xhr.open('POST',url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == XMLHttpRequest.DONE){
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status==200){
                console.log('xhr response text is ' + xhr.responseText);
                let r=''
                r = xhr.responseText.split(" ")
                if (r[0] === "Success"){
                    alert("You have succesfully logged in!");
                    window.location= "http://localhost:8125/";
                    localStorage.setItem(data.email,'retete');
                    localStorage.setItem('login',JSON.stringify(true));
                    localStorage.setItem('admin',r[1]);
                    localStorage.setItem('jwt',JSON.stringify(r[3]));
                }else{
                    alert("Wrong user or password! Try again.");
                }
            }
        }
    }

    xhr.send(JSON.stringify(data));
}

function showPassword(){
    var password = document.getElementById('pword');
    if (password.type == "password"){
        password.type="text";
    } else {
        password.type="password";
    }
}


//vezi MVC
//fa cookie ca atunci cand unn utilizator se logheaza, la a doua logare sa apara sugestia cand scrie
//Sesiuni. Atunci cand se logheaza, dupa c inchide browser-ul, cand intra inapoi sa nu fie delogat userul