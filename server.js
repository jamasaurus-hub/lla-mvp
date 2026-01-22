const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// optional: log requests
server.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// use json-server router
server.use(router);

const PORT = process.env.PORT || 3501;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
