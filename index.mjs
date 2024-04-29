import { createServer } from "http";
import { StatusCodes } from "http-status-codes";
import { promises } from "fs";
const portNumber = 8080;
const routes = {
   "/": "index"
};

createServer(async (req, res) => {
   try {
      const url = routes[req.url] ? `./html/${routes[req.url]}.html` : req.url;
      const data = await promises.readFile(url);
      res.writeHead(StatusCodes.OK, { "Content-Type": "text/html" });
      res.end(data);
   } catch (error) { handleError(res); }
}).listen(portNumber, () => {
   console.log(`Server is listening on port ${portNumber}`);
});

function handleError(res) {
   res.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "text/html" });
   res.end(`<h1>HTML file not found!</h1>`);
};