const http = require("http");
const fs = require("fs");
const url = require("url");
const { insertar, canciones, eliminar, editar } = require("./consultas");
http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync("./index.html");
      res.end(html);
    } else if (req.url == "/cancion" && req.method === "POST") {
      res.writeHead(200, { "Content-Type": "text/html" });
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        const parametros = Object.values(JSON.parse(body));
        const resultado = await insertar(parametros);
        res.end(JSON.stringify(resultado));
      });
    } else if (req.url == "/canciones" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const resultado = await canciones();
      res.end(JSON.stringify(resultado));
    } else if (req.url.startsWith("/cancion") && req.method === "DELETE") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const { id } = url.parse(req.url, true).query;
      const resultado = await eliminar(id);
      res.end(JSON.stringify(resultado));
    } else if(req.url == '/cancion' && req.method === 'PUT') {
        let body = '';
        req.on("data", (chunk) => body += chunk);
  
        req.on("end", async() => {
          const cancion = JSON.parse(body);
          console.log(cancion);
          const resultado = await editar(cancion);
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(resultado));
        });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 Not Found</h1>");
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("usuario Conectado");
  });
