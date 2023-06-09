const item = require("../pages/items");
const item1 = require("../pages/a");
const authenticate = require("./middleware");

function itemRoutes(fastify, options, done) {
  fastify.get("/get-item1", { preHandler: authenticate }, (req, reply) => {
    reply.send(item1);
  });

  fastify.post("/add-item1", { preHandler: authenticate }, (req, reply) => {
    var user = req.body;
    reply.send(user);
  });

  done();
}

module.exports = itemRoutes;
