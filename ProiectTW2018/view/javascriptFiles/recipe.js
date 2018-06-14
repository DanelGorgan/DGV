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
                document.getElementById("main").innerHTML = elem;
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

