const item = require("../pages/items");
const authenticate = require("./middleware");

function itemRoutes(fastify, options, done) {
  fastify.get("/get-item", { preHandler: authenticate }, (req, reply) => {
    reply.send(item);
  });

  fastify.post("/add-item", { preHandler: authenticate }, (req, reply) => {
    var user = req.body;
    reply.send(user);
  });

  done();
}

module.exports = itemRoutes;
