var xhr = new XMLHttpRequest();

function search() {
    var name = document.getElementById('search').value;
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
                    elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[0].description +
                        "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\">View recipe</a> </div>";
                }
                document.getElementById("nr").innerHTML = elem;
            } else {
                console.log(console.log('[search] xhr.status= ' + xhr.status))

            }
        }
    }
}

search()