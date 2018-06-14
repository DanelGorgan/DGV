xhr = new XMLHttpRequest();

function addInSession() {
    localStorage.setItem('search', 'myRecipe');   
}
addInSession();

function findMyRecipes() {
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
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";


                    }
                    elem+="</div>";
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
                ;
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
