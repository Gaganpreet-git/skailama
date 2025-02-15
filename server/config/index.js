const dotenv = require("dotenv");
dotenv.config();
const swaggerSpec = require("./swagger");
const config = {
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  swagger: {
    swaggerSpec,
  },
};

module.exports = config;
