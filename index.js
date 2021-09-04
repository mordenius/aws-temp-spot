const { createServer } = require("http");

const DEFAULT_PORT = 8080;
const PORT = process.env.PORT || DEFAULT_PORT;

const server = createServer(function(req, res) {
  console.log(req.url);
  res.write(JSON.stringify(req.headers));
  res.end();
});

server.on("error", console.log);
server.listen(PORT, function() {
  console.log(`Server listening on ${PORT} port`);
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
});
