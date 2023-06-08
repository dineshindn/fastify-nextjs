const item = require("../pages/items");
const item1 = require("../pages/a");




function itemRoutes(fastify, options, done) {


    fastify.get("/get-item1", async(req, reply) => {
        console.log("fd1")
        reply.send(item1);
    });

    fastify.post("/add-item1", (req, reply) => {
        var user = req.body;
        reply.send(user);
    });

    done();
}

module.exports = itemRoutes;
