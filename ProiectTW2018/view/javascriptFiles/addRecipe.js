var xhr = new XMLHttpRequest();

function validateForm() {
    var name = document.getElementById('name').value;
    var descriere = document.getElementById('descriere').value;
    var sdv = document.getElementById('sdv').value;
    var post = document.getElementById('post').value;
    var dif = document.getElementById('dificultate').value;
    var gastr = document.getElementById('gastr').value;
    var link = document.getElementById('link').value;
    var timp = document.getElementById('timp').value;
    var ing = document.getElementById('ingrediente').value;
    var image = document.getElementById('myFile').value;
    var choices = [];
    var regim = document.getElementsByClassName('ing');
    for (var i=0;i<regim.length;i++){
        if ( regim[i].checked ) {
            choices.push(regim[i].value);
        }
    }
    var choices1 = [];
    var dotari = document.getElementsByClassName('dotari');
    for (var j=0;j<dotari.length;j++){
        if ( dotari[j].checked ) {
            choices1.push(dotari[j].value);
        }
    }
    var url = 'http://localhost:8125/addRecipe';
    var data = {
        name: name,
        description: descriere,
        style: sdv,
        post: post,
        difficulty:dif,
        gastronomy: gastr,
        link: link,
        duration: timp,
        ingredients: ing,
        image: image,
        regim: choices,
        dotari: choices1,
        user: 'asdasa'
    };

    console.log(data.dotari + ' ' + data.regim + ' ' + data.name + ' ' + data.description + ' ' + data.style + ' ' + data.difficulty);

    xhr.open('POST',url);
    xhr.setRequestHeader("Content-type", "text/plain");

    // xhr.onreadystatechange = function(){
    //     if (xhr.readyState == XMLHttpRequest.DONE){
    //         console.log('xhr.readyState=XMLHttpRequest.done');
    //         console.log(xhr.status);
    //         if (xhr.status==200){
    //             console.log('xhr response text is ' + xhr.responseText);
    //             if (xhr.responseText === "Success"){
    //                 alert("You have succesfully logged in!");
    //                 window.location.href = "http://localhost:8125/";
    //             }else{
    //                 alert("Wrong user or password! Try again.");
    //             }
    //         }
    //     }
    // }

    xhr.send(JSON.stringify(data));

}
