const express = require("express");
const { ErrorHandler, auth } = require("./middlewares");
const app = express();
const swaggerUi = require("swagger-ui-express");
const { ApiError } = require("./utils");
const cors = require("cors");
const config = require("./config");
const router = require("./routes");

// Serve Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(config.swagger.swaggerSpec)
);

// Enable CORS for all routes
app.use(cors());

// parse json request body
app.use(express.json());

// Reroute all api requests to routes
app.use("/api", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

// Middleware to handle Errors.
app.use(ErrorHandler);

module.exports = app;
