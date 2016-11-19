import * as express from "express";
import * as redis from "redis";
import * as bodyParser from "body-parser";

let client = redis.createClient();

let app = express();
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.route("/api/:key").get((request, response) => {
  client.get(request.params.key, (err, res) => {
    if(!res) {
      response.json({});
    } else {
      response.json(JSON.parse(res));
    }
  });
}).put((request, response) => {
  client.set(request.params.key, JSON.stringify(request.body), (err, res) => {
    response.json(true);
  });
});

app.listen(8080, "127.0.0.1");