<<<<<<< HEAD

=======
var xhr = new XMLHttpRequest();
>>>>>>> 0fc06b876434fdebafc63c9d533b80da98e010dd

function latestRecipes(){
    console.log('Am intrat in latestRecipes');
    var url = 'http://localhost:8125/latest';
    xhr.open('GET',url);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.send();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == XMLHttpRequest.DONE){
            console.log('xhr.readyState=XMLHttpRequest.done');
            console.log(xhr.status);
            if (xhr.status==200){
                console.log('xhr response text is ' + xhr.responseText);
            }
        }
    }


}
latestRecipes();