const jwt = require("jsonwebtoken");
const SECRET_KEY = "kos*nwSN21Z^";

// Authentication middleware
const authenticate = (request, reply, done) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    reply.code(401).send({ message: "Unauthorized" });
    return done(new Error("Unauthorized"));
  }

  const token = authorization.split(" ")[1];

  // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      reply.code(401).send({ message: "Invalid token" });
      return done(new Error("Invalid token"));
    }

    // Add the decoded token to the request for future use
    request.user = decoded;

    done();
  });
};

module.exports = authenticate;
