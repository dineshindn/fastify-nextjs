const fastify = require("fastify")({
  logger: { level: "error" },
  pluginTimeout: 0,
});
const Next = require("next");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "kos*nwSN21Z^";
const fastifyCors = require("@fastify/cors");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

console.log("Server running");

fastify.get("/api/:location", (req, reply) => {
  console.log("We got triggered in /api");
  return reply.send({ body: { location: req.params.location } });
});


fastify.register(fastifyCors, {
  origin: "*",
});

fastify.register(require("./routes/index"));
fastify.register(require("./routes/index1"));

fastify.post("/login", (request, reply) => {
  // Simulating user authentication
  const { username, password } = request.body;
  if (username === "admin" && password === "din") {
    // Generate a JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    reply.send({ token });
  } else {
    reply.code(401).send({ message: "Invalid credentials" });
  }
});


// const items = require("./pages/items");
// fastify.register((fastify, opts, next) => {
  
//   const app = Next({ dev });
//   const handle = app.getRequestHandler();
//   app
//     .prepare()
//     .then(() => {

//       if (dev) {
//         fastify.get('/_next/*', (req, reply) => {
//           return handle(req.raw, reply.raw).then(() => {
//             reply.sent = true;
//           });
//         });
//       }

//       fastify.get('/a', (req, reply) => {
//         return app.render(req.raw, reply.raw, '/a', req.query).then(() => {
//           reply.sent = true;
//         });
//       });

//       fastify.get('/b', (req, reply) => {
//         return app.render(req.raw, reply.raw, '/b', req.query).then(() => {
//           reply.sent = true;
//         });
//       });

//       fastify.get('/about', (req, reply) => {
//         reply.send(items)

//       });

//       // fastify.get("/get-item", (req, reply) => {
//       //   reply.send(items);
//       // });

//       // fastify.post('/add-item', (req, reply) => {
//       //   var user = req.body
//       //   reply.send(user)
//       // })

//       fastify.all('/*', (req, reply) => {
//         console.log('Capture * called');
//         return handle(req.raw, reply.raw).then(() => {
//           reply.sent = true;
//         });
//       });

//       fastify.setNotFoundHandler((request, reply) => {
//         console.log('404 hit');
//         return app.render404(request.raw, reply.raw).then(() => {
//           reply.sent = true;
//         });
//       });

//       next();
//     })
//     .catch((err) => next(err));
// });

fastify.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
