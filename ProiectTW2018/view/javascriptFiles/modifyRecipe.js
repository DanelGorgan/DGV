xhr = new XMLHttpRequest();

function updateRecipe() {
    var url = 'http://localhost:8125/getMyRecipe';
    var un = localStorage.key(0);
    var elem = '';
    var data = {};

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
                    elem += "<div>"+
                    "<label>Nume </label><br>"+
                    "<input type=\"text\" id=\"name\" placeholder=\"Nume reteta..\" required>"+
                    "</div>"+
                    "<div>"+
                    "<label>Descriere </label><br>"+
                    "<textarea id=\"descriere\" placeholder=\"Descrierea retetei..\" required></textarea>"+
                    "</div>"+
                    "<div>"+
                    "<label>Stil de viata </label><br>"+
                    "<select id=\"sdv\">"+
                    "<option value=\"Vegan\">Vegan</option>"+
                    "<option value=\"Vegetarian\">Vegetarian</option>"+
                    "<option value=\"Other\">Other</option>"+
                    "</select>"+
                    "</div>"+
                    "<div>"+
                    "<label>Dificultate </label><br>"+
                    "<select id=\"dificultate\">"+
                    "<option value=\"Usor\">Usor</option>"+
                    "<option value=\"Mediu\">Mediu</option>"+
                    "<option value=\"Greu\">Greu</option>"+
                    "</select>"+
                    "</div>"+
                    "<div>"+
                    "<label>Gastronomie </label><br>"+
                    "<select id=\"gastr\">"+
                    "<option value=\"Frantuzeasca\">Frantuzeasca</option>"+
                    "<option value=\"Romaneasca\">Romaneasca</option>"+
                    "<option value=\"Italiana\">Italiana</option>"+
                    "<option value=\"Chinezeasca\">Chinezeasca</option>"+
                    "<option value=\"Indiana\">Indiana</option>"+
                    "<option value=\"Other\">Other</option>"+
                    "</select>"+
                    "</div>"+
                    "<div>"+
                    "<label>Link </label><br>"+
                    "<input required type=\"text\" id=\"link\" placeholder=\"Link tutorial.. \">"+
                    "</div>"+
                    "<div>"+
                    "<label>Post </label><br>"+
                    "<select id=\"post\">"+
                    "<option value=\"Nu\">Nu</option>"+
                    "<option value=\"Da\">Da</option>"+
                    "</select>"+
                    "</div>"+
                    "<div>"+
                    "<label>Regim-uri alimentare </label><br>"+
                    "<input type=\"checkbox\" id=\"ingredient1\" value=\"Diabet\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient1\">Diabet</label>"+
                    "<input type=\"checkbox\" id=\"ingredient2\" value=\"Ulcer\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient2\">Ulcer</label>"+
                    "<input type=\"checkbox\" id=\"ingredient3\" value=\"Giovanetti\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient3\">Giovanetti</label>"+
                    "<input type=\"checkbox\" id=\"ingredient4\" value=\"Kempner\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient4\">Kempner</label>"+
                    "<input type=\"checkbox\" id=\"ingredient5\" value=\"Hidric\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient5\">Hidric</label>"+
                    "<input type=\"checkbox\" id=\"ingredient6\" value=\"Hidrozaharat\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient6\">Hidrozaharat</label>"+
                    "<input type=\"checkbox\" id=\"ingredient7\" value=\"Hipoproteic\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient7\">Hipoproteic</label>"+
                    "<input type=\"checkbox\" id=\"ingredient8\" value=\"Hiposodat\" class=\"ing\">"+
                    "<label name=\"ing1\" for=\"ingredient8\">Hiposodat</label>"+
                    "<input type=\"checkbox\" id=\"ingredient9\" value=\"Other\" class=\"ing\" checked>"+
                    "<label name=\"ing1\" for=\"ingredient9\">Other</label>"+
                    "</div>"+
                    "<div>"+
                    "<label>Dotari bucatarie necesare </label><br>"+
                    "<input type=\"checkbox\" id=\"dotare1\" class=\"dotari\" value=\"Aragaz\">"+
                    "<label for=\"dotare1\">Aragaz</label>"+
                    "<input type=\"checkbox\" id=\"dotare2\" class=\"dotari\" value=\"Cuptor\">"+
                    "<label for=\"dotare2\">Cuptor</label>"+
                    "<input type=\"checkbox\" id=\"dotare3\" class=\"dotari\" value=\"Cuptor cu microunde\">"+
                    "<label for=\"dotare3\">Cuptor cu microunde</label>"+
                    "<input type=\"checkbox\" id=\"dotare4\" class=\"dotari\" value=\"Robot de bucatarie\">"+
                    "<label for=\"dotare4\">Robot de bucatarie</label>"+
                    "<input type=\"checkbox\" id=\"dotare5\" class=\"dotari\" value=\"Other\" checked>"+
                    "<label for=\"dotare5\">Other</label>"+
                    "</div>"+
                    "<div>"+
                    "<label>Durata prepararii (minute) </label><br>"+
                    "<input type=\"number\" id=\"timp\" required>"+
                    "</div>"+
                    "<div>"+
                    "<label>Ingrediente (separate prin virgula) </label><br>"+
                    "<input type=\"text\" id=\"ingrediente\" placeholder=\"Ingrediente necesare..\">"+
                    "</div>"+
                    "<div>"+
                    "<p><strong class=\"res\">Dupa ce dati submit veti fi redirectionat pe o pagina unde trebuie sa incarcati o imagine pentru reteta.</strong></p>"+
                    "</div>"+
                    "<input type=\"Submit\" value=\"Submit\">";
                    document.getElementById("main").innerHTML = elem;

                }
            }
        }
    }
}

updateRecipe();