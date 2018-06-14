var xhr = new XMLHttpRequest();
function json(){
    console.log('suntem in json')
    var url = 'http://localhost:8125/json';
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "text/plain");

    data = {
        name: 'Ciorba de burtaaa'
    }

    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {

                document.getElementById("main").innerHTML = xhr.responseText;
            }
        }
    }
}
json()