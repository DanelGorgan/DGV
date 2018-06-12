var xhr = new XMLHttpRequest();

function filter() {
    var timp = document.getElementById('timp').value;
    var dif = [];
    var diffi = document.getElementsByClassName('diffi');
    for (var i = 0; i < diffi.length; i++) {
        if (diffi[i].checked) {
            dif.push(diffi[i].value);
        }
    }
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
            regimal.push(regimal[i].value);
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
    var data = {
        style: style,
        post: post,
        difficulty: dif,
        gastronomy: gastr,
        duration: timp,
        regim: regimal,
        dotari: choices1,
    };
    console.log(data.style + ' ' + data.post+ ' ' + data.difficulty+ ' ' + data.gastronomy+ ' ' + data.duration+ ' ' + data.regim+ ' ' + data.dotari);
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");


    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            console.log('xhr response text is ' + xhr.responseText);
            if (xhr.status == 200) {
                var body = JSON.parse(this.responseText);
                for (var i = 0; i < body.length; i++) {
                    elem += "<div><figure class=\"box-img\"><img src=\"./img/img1.jpg\" alt=\"\"></figure></div><div> <p>" + body[i].description +
                        "</p> <a href=\"http://localhost:8125/recipe\" class=\"btn\">View recipe</a> </div>";
                }
                document.getElementById("nr").innerHTML = elem;
            }
        }
    }
    xhr.send(JSON.stringify(data));


}