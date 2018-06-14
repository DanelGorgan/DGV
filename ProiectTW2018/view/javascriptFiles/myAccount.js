var xhr = new XMLHttpRequest();

function myAccount() {
    var elem = ' ';

    var url = 'http://localhost:8125/getUser';
    var email = localStorage.key(0); 

    var data = {
        email: email
    }

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                var body = JSON.stringify(xhr.responseText);
                elem += "<div class=\"account-preferences\">" +
                    "<h1>My account preferences</h1>" +
                    "<input id=\"profile-photo\" type=\"image\" src=\"../img/eu.jpg\" alt=\"profile photo\">" +

                    "<div class=\"text\">" +
                    "<p> Username </p>" +
                    "<p> Name </p>" +
                    "<p> Surname </p>" +
                    "<p> E-mail </p>" +
                    "<p> Telefon </p>" +
                    "<p> Address </p>" +
                    "<p> Regim alimentar</p>" +
                    "</div>" +

                    "<div class=\"input\">" +
                    "<input type=\"text\" value=\"" + body[0].username + "\">" +
                    "<input type=\"text\" value=\"" + body[0].name + "\">" +
                    "<input type=\"text\" value=\"" + body[0].surname + "\">" +
                    "<input type=\"email\" value=\"" + body[0].email + "\">" +
                    "<input type=\"text\" value=\"" + body[0].phone + "\">" +
                    "<input type=\"text\" value=\"" + body[0].adress + "\">" +
                    "</div>" +
                    "<button> Submit changes </button>" +
                    "</div>";
            }
        }
    }
}

myAccount();