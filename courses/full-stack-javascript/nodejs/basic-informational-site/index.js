const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
  let filePath = "";

  switch (req.url) {
    case "/":
      filePath = "index.html";
      break;
    case "/about":
      filePath = "about.html";
      break;
    case "/contact-me":
      filePath = "contact-me.html";
      break;
    default:
      filePath = "404.html";
      break;
  }

  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
