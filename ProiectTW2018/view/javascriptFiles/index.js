var xhr = new XMLHttpRequest();

function addInSession() {
    localStorage.setItem('search', 'index');
}

addInSession();

function auth() {
    console.log('Suntem in auth')
    var token = localStorage.getItem(localStorage.key(1));
    var url = 'http://localhost:8125/myAccount1';

    xhr.open('GET', url);
    xhr.setRequestHeader("Authorization", token);
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState)
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.status);
            if (xhr.status == 200) {
                window.location.href = 'http://localhost:8125/myAccount';
            }
        }
    }

}

function latestRecipes() {
    console.log('Am intrat in latestRecipes');
    var url = 'http://localhost:8125/latest';
    xhr.open('GET', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send();
    var elem = '';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //console.log(xhr.status);
            if (xhr.status == 200) {
                //console.log('afisam inner html si afisam ' + this.responseText)
                var body = JSON.parse(this.responseText);
                if (xhr.responseText != 'Failure') {
                    elem += "<h2 text-align=center>New recipes</h2><br>";
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div><figure class=\"box-img\"><img src=\"./img/" + body[i].picture + "\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                            "</p> <a class=\"btn\" onclick=\"recipe('" + body[i].name + "')\">View recipe</a> </div>";
                    }
                } else {
                    //elem += "<h2> Nu exista retete noi! <\h2>"
                }
                document.getElementById("nr").innerHTML = elem;
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
                const link = getIframe(body[0].link)
                // elem += "<h2 text-align=center>New recipes</h2><br>";
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
                ;
                elem += "</ul></div>";
                elem += "<div class=\"container1\"><img src=\"../img/bar.png\" alt=\"bar\" class=\"bar1\" >" +
                    "</div>" +
                    "<div class=\"container1\">" +
                    "<p><strong>Durata Preparare: </strong>" + body[0].duration + " minute</strong></p>" +
                    "</div>" +
                    "<div class=\"container1\">" +
                    "<p><strong>Dificultate Preparare: </strong>" + body[0].difficulty + "</p>" +
                    "</div>" +
                    "<p><strong>Cum gătești </strong>" + body[0].name + ":</strong></p>" +
                    "<p>" + body[0].description +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "<h1>" + body[0].name + ", rețetă video</h1>" +
                    link +
                        "<p><a class=\"button\" onclick=\"json('" + body[0].name + "')\"> Vezi reteta in format JSON</a></p>" +
                        "<p><a class=\"button\" onclick=\"csv('" + body[0].name + "')\">Vezi reteta in format CSV</a></p>" +
                    "<p class=\"tag\">" + body[0].style + "</p>" +
                    "<p class=\"tag\">post: " + body[0].post + "</p>" +
                    "<p class=\"tag\">" + body[0].gastronomy + "</p>" +
                    "<p class=\"tag\">gastronomie: " + body[0].regim + "</p>" +
                    "<p class=\"tag\">" + body[0].difficulty + "</p>";
                document.getElementById("bcontainer").innerHTML = elem;
            }
        }
    }
}

latestRecipes();

//changeHeader();

function json(nume) {
    console.log('suntem in json')
    var url = 'http://localhost:8125/json';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");

    data = {
        name: nume
    }

    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                document.getElementById("bcontainer").innerHTML = xhr.responseText;
                // window.location.href = "http://localhost:8125/format"
            }
        }
    }
}

function csv(nume) {
    console.log('suntem in json')
    var url = 'http://localhost:8125/csv';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");

    data = {
        name: nume
    }

    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                document.getElementById("bcontainer").innerHTML = xhr.responseText;
                // window.location.href = "http://localhost:8125/format"
            }
        }
    }
}

//functia pentru filtrarea elementelor
function filter() {
    console.log('[filter] Am intrat in filter')
    var data = '';
    var timp = document.getElementById('timp').value;
    if (timp.length === 0)
        timp = '';
    else
        timp = "\"duration\" :\"" + timp + "\"";
    var dif = [];
    var diffi = document.getElementsByClassName('diffi');
    for (var j = 0; j < diffi.length; j++) {
        if (diffi[j].checked) {
            dif.push("\"" + diffi[j].value + "\"");
        }
    }

    if (dif.length === 0)
        dif = '';
    else
        dif = "\"difficulty\" : [" + dif + "] ";

    var gastr = [];
    var gastro = document.getElementsByClassName('gastro');
    for (var i = 0; i < gastro.length; i++) {
        if (gastro[i].checked) {
            gastr.push("\"" + gastro[i].value + "\"");
        }
    }
    if (gastr.length === 0)
        gastr = '';
    else
        gastr = "\"gastronomy\" : [" + gastr + "] ";

    var post = [];
    var pst = document.getElementsByClassName('post1');
    for (var i = 0; i < pst.length; i++) {
        if (pst[i].checked) {
            post.push("\"" + pst[i].value + "\"");
        }
    }
    if (post.length === 0)
        post = '';
    else
        post = "\"post\" : [" + post + "] ";

    var regimal = [];
    var regim = document.getElementsByClassName('ing');
    for (var i = 0; i < regim.length; i++) {
        if (regim[i].checked) {
            regimal.push("\"" + regim[i].value + "\"");
        }
    }
    if (regimal.length === 0)
        regimal = '';
    else
        regimal = "\"regim\" : [" + regimal + "] ";

    var style = [];
    var sdv = document.getElementsByClassName('sdv');
    for (var i = 0; i < sdv.length; i++) {
        if (sdv[i].checked) {
            style.push("\"" + sdv[i].value + "\"");
        }
    }
    if (style.length === 0)
        style = '';
    else
        style = "\"style\" : [" + style + "] ";


    var choices1 = [];
    var dotari = document.getElementsByClassName('dotari');
    for (var j = 0; j < dotari.length; j++) {
        if (dotari[j].checked) {
            choices1.push("\"" + dotari[j].value + "\"");
        }
    }
    if (choices1.length === 0)
        choices1 = '';
    else
        choices1 = "\"dotari\" : [" + choices1 + "] ";

    data += "{" + timp + "," + dif + "," + gastr + "," + post + "," + regimal + "," + style + "," + choices1 + "}";

    console.log(data);
    var url = 'http://localhost:8125/filter';
    xhr.open('POST', url);
    var elem = '';
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                if (xhr.responseText != "Failure") {
                    var body = JSON.parse(this.responseText);
                    elem += "<h2 text-align=center>New recipes</h2><br>";
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div><figure class=\"box-img\"><img src=\"./img/" + body[i].picture + "\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                            "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\" onclick=\"recipe('" + body[i].name + "')\">View recipe</a> </div>";
                    }
                    console.log(elem);
                }
                else {
                    elem += "<h2> Ne pare rau, nu exista reteta cautata! <\h2>"
                }
                document.getElementById("nr").innerHTML = elem;
            }
        }
    }
}

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}


function getIframe(url) {
    var videoId = getId(url);
    var iframeMarkup = '<p align="center"><iframe width="560" height="315" src="//www.youtube.com/embed/'
        + videoId + '" frameborder="0" allowfullscreen></iframe></p>';
    return iframeMarkup;
}
