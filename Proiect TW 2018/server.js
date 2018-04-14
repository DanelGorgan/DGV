var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    mime = require("mime");

http.createServer(function(request, response) {

    var filename = path.join(process.cwd(), request.url);
    
    console.log("request url is  " + request.url);
    console.log("Process is " + process.cwd());
    console.log(filename);
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    console.log(filename);

	if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200, {"Content-Type": mime.lookup(filename)});
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(4200));

console.log("Server running at\n  => http://localhost:" + 4200 );