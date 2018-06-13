var xhr = new XMLHttpRequest();

function changeHeader() {
    var elem = '';
    var data1 = localStorage.getItem(localStorage.key(0));

    if (data1) {
        elem += "<div id=\"branding\"><h1><a href=\"http://localhost:8125/\" method=\"post\"><img src=\"./img/chef.png\" alt=\"\"></a></h1></div>";
        elem += "<div class=\"search-bar-wrapper\"><input class=\"search-box-input\" id=\"search\" type=\"text\" placeholder=\"Search...\"><button class=\"search-box-button\"><img src=\"./img/search.png\" alt=\"\" onclick=\"search()\"></button></div>"
        elem += "<nav class=\"navbar\"><div class=\"dropdown\"><form action=\"http://localhost:8125/recipes\" method=\"post\"><button class=\"dropbtn\">Recipes</button></form></div><div class=\"dropdown\"><form action=\"http://localhost:8125/myAccount\" method=\"post\"><button class=\"dropbtn\">My Account</button></form><div class=\"dropdown-content\"><a href=\"http://localhost:8125/myRecipes\" method=\"post\">My Recipes</a><a href=\"http://localhost:8125\" onclick=\"logout()\">Logout</a></div></div></nav></div>"
    }
    else {
        elem += "<div id=\"branding\"><h1><a href=\"http://localhost:8125/\" method=\"post\"><img src=\"./img/chef.png\" alt=\"\"></a></h1></div>";
        elem += "<div class=\"search-bar-wrapper\"><input class=\"search-box-input\" id=\"search\" type=\"text\" placeholder=\"Search...\"><button class=\"search-box-button\"><img src=\"./img/search.png\" alt=\"\" onclick=\"search()\"></button></div>"
        elem += "<nav class=\"navbar\"><div class=\"dropdown\"><form action=\"http://localhost:8125/recipes\" method=\"post\"><button class=\"dropbtn\">Recipes</button></form></div><div class=\"dropdown\"><form action=\"http://localhost:8125/myAccount\" method=\"post\"><button class=\"dropbtn\">My Account</button></form><div class=\"dropdown-content\"><a href=\"http://localhost:8125/Login\" method=\"post\">Login</a><a href=\"http://localhost:8125/Register\" method=\"post\">Register</a></div></div></nav></div>"

    }
    document.getElementById("cont").innerHTML = elem;
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
                for (var i = 0; i < body.length; i++) {
                    elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                        "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\" onclick=\"recipe()\">View recipe</a> </div>";
                }
                document.getElementById("nr").innerHTML = elem;
            }
        }
    }
}

function logout(){
    console.log('am intrat pe logout')
    localStorage.removeItem(localStorage.key(0));
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

latestRecipes();
changeHeader();

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

    // data += "\"dificulty\" : [";
    // console.log(diffi);
    // for (var i = 0; i < diffi.length; i++) {
    //     if (diffi[i].checked) {
    //         if (i != diffi.length - 1) {
    //             data += '\"'+ diffi[i].value + '\", ';
    //         }else{
    //             data += '\"'+ diffi[i].value + '"], '
    //         }
    //         dif.push(diffi[i].value);
    //     }
    // }
    // console.log('data = ' + data);
    if (dif.length === 0)
        dif = '';
    else
        dif = "\"difficulty\" : [" + dif + "] ";

    var gastr = [];
    var gastro = document.getElementsByClassName('gastro');
    // data += "\"gastronomy\" : [";
    // console.log(diffi);
    // for (var i = 0; i < gastro.length; i++) {
    //     if (gastro[i].checked) {
    //         if (i != gastro.length - 1) {
    //             data += '\"'+ gastro[i].value + '\", ';
    //         }else{
    //             data += '\"'+ gastro[i].value + '"], '
    //         }
    //         gastr.push(gastro[i].value);
    //     }
    // }
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
    // data += "\"post\" : [";
    // console.log(diffi);
    // if (pst.checked)  data += '\"'+ pst[i].value + '\"]';
    // for (var i = 0; i < pst.length; i++) {
    //     if (pst[i].checked) {
    //         if (i != pst.length - 1) {
    //             data += '\"'+ pst[i].value + '\", ';
    //         }else{
    //             data += '\"'+ pst[i].value + '"], '
    //         }
    //         post.push(pst[i].value);
    //     }
    // }
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
    // data += "\"regim\" : [";
    // console.log(diffi);
    // for (var i = 0; i < regim.length; i++) {
    //     if (regim[i].checked) {
    //         if (i != regim.length - 1) {
    //             data += '\"'+ regim[i].value + '\", ';
    //         }else{
    //             data += '\"'+ regim[i].value + '"], '
    //         }
    //         regimal.push(regim[i].value);
    //     }
    // }
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
    // data += "\"style\" : [";
    // console.log(diffi);
    // for (var i = 0; i < sdv.length; i++) {
    //     if (sdv[i].checked) {
    //         if (i != sdv.length - 1) {
    //             data += '\"'+ sdv[i].value + '\", ';
    //         }else{
    //             data += '\"'+ sdv[i].value + '"], '
    //         }
    //         style.push(sdv[i].value);
    //     }
    // }

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
    // data += "\"dotari\" : [";
    // console.log(diffi);
    // for (var i = 0; i < dotari.length; i++) {
    //     if (dotari[i].checked) {
    //         if (i != dotari.length - 1) {
    //             data += '\"'+ dotari[i].value + '\", ';
    //         }else{
    //             data += '\"'+ dotari[i].value + '"] } '
    //         }
    //         regimal.push(dotari[i].value);
    //     }
    // }

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
                    console.log('[search] am primit body ' + body[0].regim);
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                            "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\">View recipe</a> </div>";
                    }
                    document.getElementById("nr").innerHTML = elem;
                }
                else {
                    console.log(xhr.responseText)
                }
            }
        }
    }
}
