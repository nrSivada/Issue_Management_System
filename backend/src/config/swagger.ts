import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Issue Management API",
      version: "1.0.0",
      description:
        "Issue Tracking System with AI Analysis",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec =
  swaggerJsdoc(options);