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
