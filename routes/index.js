const item = require("../pages/items");

function itemRoutes(fastify, options, done) {
    fastify.get("/get-item", (req, reply) => {
        console.log("fd")
        reply.send(item);
    });

    fastify.post("/add-item", (req, reply) => {
        var user = req.body;
        reply.send(user);
    });

    // fastify.all("/*", (req, reply) => {
    //     console.log("Capture * called");
    //     return handle(req.raw, reply.raw).then(() => {
    //         reply.sent = true;
    //     });
    // });

    done();
}

module.exports = itemRoutes;
