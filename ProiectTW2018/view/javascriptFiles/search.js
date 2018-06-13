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
                    //console.log('[search.] xhr.status = 200')
                    //console.log('[search] ' + xhr.responseText)
                    var body = JSON.parse(this.responseText);
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div><figure class=\"box-img\"><img src=\"./img/" + body[i].picture + "\" alt=\"\"></figure></div><div> <p id=\"description\">" + body[i].description +
                            "</p> <a class=\"btn\" onclick=\"recipe('" + body[i].name + "')\">View recipe</a> </div>";
                    }
                    //console.log(localStorage.getItem(localStorage.key(2)))
                    if (localStorage.getItem('search') == 'myRecipe') {
                        console.log('Schimbam pagina...')
                        window.location.href = "http://localhost:8125/";
                        localStorage.setItem('mere','ceva');
                        //document.getElementById("main").innerHTML = elem;
                    } else {
                        console.log('Suntem pe index cu sesiunea')
                        document.getElementById("nr").innerHTML = elem;
                    }
                } else {
                    //console.log(console.log('[search] xhr.status= ' + xhr.status))
                }
            }
        }
    }
}
