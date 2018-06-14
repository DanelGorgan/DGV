var xhr = new XMLHttpRequest();

function validateForm() {
    var name = document.getElementById('name').value;
    var descriere = document.getElementById('descriere').value;
    var sdv = document.getElementById('sdv').value;
    var post = document.getElementById('post').value;
    var dif = document.getElementById('dificultate').value;
    var gastr = document.getElementById('gastr').value;
    var link = document.getElementById('link').value;
    var timp = document.getElementById('timp').value;
    var ing = document.getElementById('ingrediente').value;
    var regimal = [];
    var regim = document.getElementsByClassName('ing');

    for (var i = 0; i < regim.length; i++) {
        if (regim[i].checked) {
            regimal.push(regim[i].value);
        }
    }
    var dotarin = [];
    var dotari = document.getElementsByClassName('dotari');
    for (var j = 0; j < dotari.length; j++) {
        if (dotari[j].checked) {
            dotarin.push(dotari[j].value);
        }
    }

    //console.log('USERUL ESTE ' + localStorage.key(0))
    var username = localStorage.key(0);
    var url = 'http://localhost:8125/addRecipe';
    var data = {
        name: name,
        description: descriere,
        style: sdv,
        post: post,
        difficulty: dif,
        gastronomy: gastr,
        link: link,
        duration: timp,
        ingredients: ing,
        regim: regimal,
        dotari: dotarin,
        user: username
    };

    console.log(data.dotari + ' ' + data.regim + ' ' + data.name + ' ' + data.description + ' ' + data.style + ' ' + data.difficulty);

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                if (xhr.responseText === "Success") {
                    alert("Reteta adaugata!");
                    window.location.href = "http://localhost:8125/upload";
                } else {
                    alert("Completati toate campurile!");
                }
            }
        }
    }
    xhr.send(JSON.stringify(data));
}


function getRecipe() {
    var url = 'http://localhost:8125/getMyRecipes';
    var un = localStorage.key(0);
    var elem = '';
    var data = {
        user: un
    }

    console.log('data.user = ' + data.user + ' and un = ' + un);

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                if (xhr.responseText != "Nu exista aceasta reteta") {
                    var body = JSON.parse(this.responseText);
                    elem += "<div class=\"bigcontainer\">";
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div class=\"responsive\">" +
                            "<div class=\"gallery\">" +
                            "<div class=\"container1\">" +
                            "<img class=\"image\" src=\"../img/"+body[i].picture+"\" alt=\"\" width=\"400\\\" height=\"200\" >" +
                            "<div class=\"middle\">" +
                            "<a onclick=\"recipe('" + body[i].name + "')\"><div class=\"text\">"+body[i].name+"</div></a>" +
                            "<a onclick=\"delete1('"+body[i].name+"')\"><div class=\"delete\">Delete</div></a>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";


                    }
                    elem+="</div>";
                    elem += "<button class=\"button1\"><a class=\"a1\"  href=\"http://localhost:8125/addRecipe\" method=\"post\">Add recipe</a></button>";
                    elem += "<button class=\"button1\"><a class=\"a1\"  href=\"http://localhost:8125/modifyRecipe\" method=\"post\">Modify recipe</a></button>";
                    document.getElementById("main").innerHTML = elem;
                } else {
                    console.log(xhr.responseText)
                    elem += "<button class=\"button1\"><a class=\"a1\"  href=\"http://localhost:8125/addRecipe\" method=\"post\">Add recipe</a></button>";
                    document.getElementById("main").innerHTML = elem;
                }
            }
        }
    }

    xhr.send(JSON.stringify(data));
}