var xhr = new XMLHttpRequest();

function latestRecipes() {
    console.log('Am intrat in latestRecipes');
    var url = 'http://localhost:8125/latest';
    xhr.open('GET', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send();
    var elem = '';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.status);
            if (xhr.status == 200) {
                console.log('afisam inner html si afisam ' + this.responseText)
                var body = JSON.parse(this.responseText);
                for (var i = 0; i < body.length; i++) {
                    elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                        "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\">View recipe</a> </div>";
                }
                document.getElementById("nr").innerHTML = elem;
            }
        }
    }
}


function search() {
    var name = document.getElementById('search').value;

    if (name != '') {
        var url = 'http://localhost:8125/search';
        var elem = '';

        xhr.open('POST', url);
        var data = {
            name: name
        }
        console.log('[search] trimitem ' + data.name);

        xhr.open('POST', url);
        xhr.setRequestHeader("Content-type", "text/plain");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    console.log('[search.] xhr.status = 200')
                    console.log('[search] ' + xhr.responseText)
                    var body = JSON.parse(this.responseText);
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                            "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\">View recipe</a> </div>";
                    }
                    document.getElementById("nr").innerHTML = elem;
                } else {
                    console.log(console.log('[search] xhr.status= ' + xhr.status))

                }
            }
        }
    }
}



latestRecipes();