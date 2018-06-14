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

                var body = JSON.parse(xhr.responseText);
                console.log(body)
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
                    "<input  id=\"username\" type=\"text\" value=\"" + body[0].username + "\">" +
                    "<input id=\"name\" type=\"text\" value=\"" + body[0].name + "\">" +
                    "<input id=\"surname\" type=\"text\" value=\"" + body[0].surname + "\">" +
                    "<input id=\"email\" type=\"email\" value=\"" + body[0].email + "\">" +
                    "<input id=\"phone\" type=\"text\" value=\"" + body[0].phone + "\">" +
                    "<input id=\"adress\" type=\"text\" value=\"" + body[0].adress + "\">" +
                    "</div>" +
                    "<button onclick='submit()'> Submit changes </button>" +
                    "</div>";
            }
            document.getElementById('id').innerHTML = elem;
        }
    }
}

myAccount();

function submit() {
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var adress = document.getElementById('adress').value;

    //console.log('USERUL ESTE ' + localStorage.key(0))
    var username = localStorage.key(0);
    var url = 'http://localhost:8125/addRecipe';
    var data = {
        name: name,
        username: username,
        surname: surname,
        email: email,
        phone: phone,
        adress: adress,
        isAdmin:'false'
    };

    var url = 'http://localhost:8125/updateUser';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                if (xhr.responseText === "Success") {
                    alert("User modificat!");
                    window.location.href = "http://localhost:8125";
                } else {
                    alert("Completati toate campurile!");
                }
            }
        }
    }

}
