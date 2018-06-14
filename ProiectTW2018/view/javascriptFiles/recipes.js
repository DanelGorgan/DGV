xhr = new XMLHttpRequest();

function findAllRecipes() {
    var url = 'http://localhost:8125/getMyRecipes';
    var un = localStorage.key(0);
    var elem = '';
    var data = {}

    console.log('data.user = ' + data.user + ' and un = ' + un);
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status == 200) {
                if (xhr.responseText != "Nu exista aceasta reteta") {
                    // console.log(xhr.responseText);
                    var body = JSON.parse(xhr.responseText);
                    console.log(body);
                    elem += "<div class=\"bigcontainer\">";
                    for (var i = 0; i < body.length; i++) {
                        elem += "<div class=\"responsive\">" +
                            "<div class=\"gallery\">" +
                            "<div class=\"container1\">" +
                            "<img class=\"image\" src=\"../img/" + body[i].picture + "\" alt=\"\" width=\"400\\\" height=\"200\" >" +
                            "<div class=\"middle\">" +
                            "<a onclick=\"recipe('" + body[i].name + "')\"><div class=\"text\">" + body[i].name + "</div></a>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";
                    }
                    elem += "</div>";
                    document.getElementById("main").innerHTML = elem;

                }
            }
        }
    }
}

findAllRecipes();