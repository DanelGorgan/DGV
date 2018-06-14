var xhr = new XMLHttpRequest();

function validate(id) {
    console.log('suntemin validate')
    var name = document.getElementById('name').value;
    var descriere = document.getElementById('descriere').value;
    var sdv = document.getElementById('sdv').value;
    var post = document.getElementById('post').value;
    var dif = document.getElementById('dificultate').value;
    var gastr = document.getElementById('gastr').value;
    var link = document.getElementById('link').value;
    var timp = document.getElementById('timp').value;
    var ing = document.getElementById('ingrediente').value;
    var regimal = [];
    var regim = document.getElementsByClassName('ing');

    for (var i = 0; i < regim.length; i++) {
        if (regim[i].checked) {
            regimal.push(regim[i].value);
        }
    }
    var dotarin = [];
    var dotari = document.getElementsByClassName('dotari');
    for (var j = 0; j < dotari.length; j++) {
        if (dotari[j].checked) {
            dotarin.push(dotari[j].value);
        }
    }

    //console.log('USERUL ESTE ' + localStorage.key(0))
    var username = localStorage.key(0);
    var url = 'http://localhost:8125/update';
    var data = {
        _id:id,
        name: name,
        description: descriere,
        style: sdv,
        post: post,
        difficulty: dif,
        gastronomy: gastr,
        link: link,
        duration: timp,
        ingredients: ing,
        regim: regimal,
        dotari: dotarin,
        user: username
    };

    // console.log(data.dotari + ' ' + data.regim + ' ' + data.name + ' ' + data.description + ' ' + data.style + ' ' + data.difficulty);
    console.log('----------------')
    console.log(JSON.stringify(data))
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");

    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                if (xhr.responseText === "Success") {
                    alert("Reteta adaugata!");
                    window.location.href = "http://localhost:8125/upload";
                } else {
                    alert("Completati toate campurile!");
                }
            }
        }
    }
}