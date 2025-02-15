const swaggerJsdoc = require("swagger-jsdoc");


// Swagger configuration
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "",
        version: "1.0.0",
        description:
          "",
      },
    //   components: {
    //     securitySchemes: {
    //       BearerAuth: {
    //         type: "apiKey",
    //         name: "Authorization",
    //         scheme: "bearer",
    //         in: "header",
    //       },
    //     },
    //   },
    },
    apis: ["../routes/*.js"],
  };
  
  const swaggerSpec = swaggerJsdoc(options);

  module.exports = swaggerSpec
  