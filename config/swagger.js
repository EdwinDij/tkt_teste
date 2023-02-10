const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A description of my API",
    },
    servers: [
      {
        url: process.env.URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);