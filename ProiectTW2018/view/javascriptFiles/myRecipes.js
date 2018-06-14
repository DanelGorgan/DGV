xhr = new XMLHttpRequest();

function addInSession() {
    localStorage.setItem('search', 'myRecipe');
}

addInSession();

function delete1(name) {

    console.log(name);
    var url = 'http://localhost:8125/delete';
    xhr.open('DELETE', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    var data = {
        name: name
    }
    xhr.send(JSON.stringify(data));
    var elem = '';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //console.log(xhr.status);
            if (xhr.status == 200) {
                //console.log('[recipe] Afisam inner html si afisam ' + this.responseText)
                if (this.responseText === "Success")
                    alert("Reteta stearsa!");
                window.location.href = 'http://localhost:8125/myRecipes';

            }
        }
    }
}

function findMyRecipes() {
    var url = 'http://localhost:8125/getMyRecipes';
    var un = localStorage.getItem(localStorage.key(0));
    var un1 = localStorage.getItem(localStorage.key(1));
    var user='';
    if (un == 'retete')
        user = localStorage.key(0);
    if (un1 == 'retete')
        user = localStorage.key(1);
    console.log('SADAFSAFAFSA= ' + un1);
    var elem = '';
    var data = {
        user: user
    }

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                if (xhr.responseText != "Nu exista aceasta reteta") {
                    var body = JSON.parse(xhr.responseText);
                    console.log(body)
                    elem += "<div class=\"bigcontainer\">";
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div class=\"responsive\">" +
                            "<div class=\"gallery\">" +
                            "<div class=\"container1\">" +
                            "<img class=\"image\" src=\"../img/" + body[i].picture + "\" alt=\"\" width=\"400\\\" height=\"200\" >" +
                            "<div class=\"middle\">" +
                            "<a onclick=\"recipe('" + body[i].name + "')\"><div class=\"text\">" + body[i].name + "</div></a>" +
                            "<a onclick=\"delete1('" + body[i].name + "')\"><div class=\"delete\">Delete</div></a>" +
                            "<a onclick=\"modify('" + body[i].name + "')\"><div class=\"text\">Modify</div></a>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";


                    }
                    elem += "</div>";
                    elem += "<button class=\"button1\"><a class=\"a1\"  href=\"http://localhost:8125/addRecipe\" method=\"post\">Add recipe</a></button>";
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

findMyRecipes();

function modify(name) {
    console.log('Suntem in modify si am primit numele ' + name)
    var url = 'http://localhost:8125/getRecipe';
    var elem = '';
    var data = {
        name: name
    };

    // console.log('data.user = ' + data.user + ' and un = ' + un);
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            console.log(xhr.responseText);
            if (xhr.status == 200) {
                if (xhr.responseText != "NU exista aceasta reteta") {
                    // console.log(xhr.responseText);
                    var body = JSON.parse(xhr.responseText);
                    // console.log(body);
                        elem += "<div>" +
                            "<form action=\"/addRecipe\" onSubmit=\"return validateForm();\" method=\"POST\">" +
                            "<label>Nume </label><br>" +
                            "<input type=\"text\" id=\"name\" value=\"" + body[0].name + "\" required>" +
                            "</div>" +
                            "<div>" +
                            "<label>Descriere </label><br>" +
                            "<textarea id=\"descriere\" placeholder=\'" + body[0].description + "\' required></textarea>" +
                            "</div>" +
                            "<div>" +
                            "<label>Stil de viata </label><br>" +
                            "<select id=\"sdv\">" +
                            "<option value=\"Vegan\">Vegan</option>" +
                            "<option value=\"Vegetarian\">Vegetarian</option>" +
                            "<option value=\"Other\">Other</option>" +
                            "</select>" +
                            "</div>" +
                            "<div>" +
                            "<label>Dificultate </label><br>" +
                            "<select id=\"dificultate\">" +
                            "<option value=\"Usor\">Usor</option>" +
                            "<option value=\"Mediu\">Mediu</option>" +
                            "<option value=\"Greu\">Greu</option>" +
                            "</select>" +
                            "</div>" +
                            "<div>" +
                            "<label>Gastronomie </label><br>" +
                            "<select id=\"gastr\">" +
                            "<option value=\"Frantuzeasca\">Frantuzeasca</option>" +
                            "<option value=\"Romaneasca\">Romaneasca</option>" +
                            "<option value=\"Italiana\">Italiana</option>" +
                            "<option value=\"Chinezeasca\">Chinezeasca</option>" +
                            "<option value=\"Indiana\">Indiana</option>" +
                            "<option value=\"Other\">Other</option>" +
                            "</select>" +
                            "</div>" +
                            "<div>" +
                            "<label>Link </label><br>" +
                            "<input required type=\"text\" id=\"link\" value=\"" +  body[0].link + "\">" +
                            "</div>" +
                            "<div>" +
                            "<label>Post </label><br>" +
                            "<select id=\"post\">" +
                            "<option value=\"Nu\">Nu</option>" +
                            "<option value=\"Da\">Da</option>" +
                            "</select>" +
                            "</div>" +
                            "<div>" +
                            "<label>Regim-uri alimentare </label><br>" +
                            "<input type=\"checkbox\" id=\"ingredient1\" value=\"Diabet\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient1\">Diabet</label>" +
                            "<input type=\"checkbox\" id=\"ingredient2\" value=\"Ulcer\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient2\">Ulcer</label>" +
                            "<input type=\"checkbox\" id=\"ingredient3\" value=\"Giovanetti\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient3\">Giovanetti</label>" +
                            "<input type=\"checkbox\" id=\"ingredient4\" value=\"Kempner\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient4\">Kempner</label>" +
                            "<input type=\"checkbox\" id=\"ingredient5\" value=\"Hidric\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient5\">Hidric</label>" +
                            "<input type=\"checkbox\" id=\"ingredient6\" value=\"Hidrozaharat\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient6\">Hidrozaharat</label>" +
                            "<input type=\"checkbox\" id=\"ingredient7\" value=\"Hipoproteic\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient7\">Hipoproteic</label>" +
                            "<input type=\"checkbox\" id=\"ingredient8\" value=\"Hiposodat\" class=\"ing\">" +
                            "<label name=\"ing1\" for=\"ingredient8\">Hiposodat</label>" +
                            "<input type=\"checkbox\" id=\"ingredient9\" value=\"Other\" class=\"ing\" checked>" +
                            "<label name=\"ing1\" for=\"ingredient9\">Other</label>" +
                            "</div>" +
                            "<div>" +
                            "<label>Dotari bucatarie necesare </label><br>" +
                            "<input type=\"checkbox\" id=\"dotare1\" class=\"dotari\" value=\"Aragaz\">" +
                            "<label for=\"dotare1\">Aragaz</label>" +
                            "<input type=\"checkbox\" id=\"dotare2\" class=\"dotari\" value=\"Cuptor\">" +
                            "<label for=\"dotare2\">Cuptor</label>" +
                            "<input type=\"checkbox\" id=\"dotare3\" class=\"dotari\" value=\"Cuptor cu microunde\">" +
                            "<label for=\"dotare3\">Cuptor cu microunde</label>" +
                            "<input type=\"checkbox\" id=\"dotare4\" class=\"dotari\" value=\"Robot de bucatarie\">" +
                            "<label for=\"dotare4\">Robot de bucatarie</label>" +
                            "<input type=\"checkbox\" id=\"dotare5\" class=\"dotari\" value=\"Other\" checked>" +
                            "<label for=\"dotare5\">Other</label>" +
                            "</div>" +
                            "<div>" +
                            "<label>Durata prepararii (minute) </label><br>" +
                            "<input type=\"number\" id=\"timp\" value=\"" + body[0].duration +"\" required>" +
                            "</div>" +
                            "<div>" +
                            "<label>Ingrediente (separate prin virgula) </label><br>" +
                            "<input type=\"text\" id=\"ingrediente\" value=\"" + body[0].ingredients+"\">" +
                            "</div>" +
                            "<div>" +
                            "<p><strong class=\"res\">Dupa ce dati submit veti fi redirectionat pe o pagina unde trebuie sa incarcati o imagine pentru reteta.</strong></p>" +
                            "</div>" +
                            "<input type=\"Submit\" value=\"Submit\" onclick=\"validate('" +body[0]._id +"')\">" +
                            "</form>"
                        document.getElementById("main").innerHTML = elem;

                }
            }
        }
    }
}


function recipe(name) {
    console.log(name);
    var url = 'http://localhost:8125/getRecipe';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    var data = {
        name: name
    }
    xhr.send(JSON.stringify(data));
    var elem = '';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //console.log(xhr.status);
            if (xhr.status == 200) {
                //console.log('[recipe] Afisam inner html si afisam ' + this.responseText)
                var body = JSON.parse(this.responseText);
                elem += "<div class=\"container\">" +
                    "<h1>" + body[0].name + "</h1>" +
                    "<img src=\"../img/" + body[0].picture + "\" alt=\"" + body[0].name + "\" class=\"box-container\">" +
                    "<div class=\"ingrediente\">" +
                    "<p class=\"banane\"><strong>De ce ai nevoie ca să gătești " + body[0].name + ":</strong></p>"
                elem += "<ul class=\"lista\">"
                for (var i = 0; i < body[0].ingredients.length; i++) {
                    console.log('afisam i=' + i)
                    elem += "<li>" + body[0].ingredients[i] + "</li>";
                }
                elem += "</ul></div>";
                elem += "<div class=\"container1\"><img src=\"../img/bar.png\" alt=\"bar\" class=\"bar1\" >" +
                    "</div>" +
                    "<div class=\"container1\">" +
                    "<p><strong>Durata Preparare:</strong> " + body[0].duration + " minute</p>" +
                    "</div>" +
                    "<div class=\"container1\">" +
                    "<p><strong>Dificultate Preparare:</strong> " + body[0].difficulty + "</p>" +
                    "</div>" +
                    "<p><strong>Cum gătești " + body[0].name + ":</strong></p>" +
                    "<p>" + body[0].description +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "<h1>" + body[0].name + ", rețetă video</h1>" +
                    "<iframe class=\"center\" src=\" " + body[0].link + "\" allowfullscreen></iframe>" +
                    "<p class=\"tag\">" + body[0].style + "</p>" +
                    "<p class=\"tag\">post: " + body[0].post + "</p>" +
                    "<p class=\"tag\">" + body[0].gastronomy + "</p>" +
                    "<p class=\"tag\">gastronomie: " + body[0].regim + "</p>" +
                    "<p class=\"tag\">" + body[0].difficulty + "</p>";
                console.log(elem)
                document.getElementById("main").innerHTML = elem;
            }
        }
    }
}
