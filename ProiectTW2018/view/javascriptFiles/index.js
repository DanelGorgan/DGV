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
            //console.log(xhr.status);
            if (xhr.status == 200) {
                //console.log('afisam inner html si afisam ' + this.responseText)
                var body = JSON.parse(this.responseText);
                for (var i = 0; i < body.length; i++) {
                    elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                        "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\" onclick=\"recipe()\">View recipe</a> </div>";
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
                        elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p id=\"description\">" + body[i].description +
                            "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\" onclick=\"recipe()\">View recipe</a> </div>";
                    }
                    document.getElementById("nr").innerHTML = elem;
                } else {
                    console.log(console.log('[search] xhr.status= ' + xhr.status))
                }
            }
        }
    }
}

function filter() {
    var data = '';
    var timp = document.getElementById('timp').value;
    var dif = [];
    var diffi = document.getElementsByClassName('diffi');

    data += "{ \"dificulty\" : [";
    console.log(diffi);
    for (var i = 0; i < diffi.length; i++) {
        if (diffi[i].checked) {
            if (i != diffi.length - 1) {
                data += '\"'+ diffi[i].value + '\", ';
            }else{
                data += '\"'+ diffi[i].value + '"], '
            }
            dif.push(diffi[i].value);
        }
    }
    console.log('data = ' + data);

    var gastr = [];
    var gastro = document.getElementsByClassName('gastro');
    for (var i = 0; i < gastro.length; i++) {
        if (gastro[i].checked) {
            gastr.push(gastro[i].value);
        }
    }
    var post = [];
    var pst = document.getElementsByClassName('chestie1');
    for (var i = 0; i < pst.length; i++) {
        if (pst[i].checked) {
            post.push(pst[i].value);
        }
    }
    var regimal = [];
    var regim = document.getElementsByClassName('ing');
    for (var i = 0; i < regim.length; i++) {
        if (regim[i].checked) {
            regimal.push(regim[i].value);
        }
    }
    var style = [];
    var sdv = document.getElementsByClassName('sdv');
    for (var i = 0; i < sdv.length; i++) {
        if (sdv[i].checked) {
            style.push(sdv[i].value);
        }
    }

    var choices1 = [];
    var dotari = document.getElementsByClassName('dotari');
    for (var j = 0; j < dotari.length; j++) {
        if (dotari[j].checked) {
            choices1.push(dotari[j].value);
        }
    }
    var url = 'http://localhost:8125/filter';
    // var data = {
    //     style: style,
    //     post: post,
    //     difficulty: dif,
    //     gastronomy: gastr,
    //     duration: timp,
    //     regim: regimal,
    //     dotari: choices1,
    // };
    // console.log('data = ' + JSON.stringify(data))
    // xhr.open('POST', url);
    // xhr.setRequestHeader("Content-type", "text/plain");
    // xhr.send(JSON.stringify(data));
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         if (xhr.status == 200) {
    //             if (xhr.responseText != "Failure") {
    //                 var body = JSON.parse(this.responseText);
    //                 console.log('[search] am primit body = ' + body);
    //                 for (var i = 0; i < body.length; i++) {
    //                     elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
    //                         "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\">View recipe</a> </div>";
    //                 }
    //                 document.getElementById("nr").innerHTML = elem;
    //             }
    //             else {
    //                 console.log(xhr.responseText)
    //             }
    //         }
    //     }
    // }
}

latestRecipes();