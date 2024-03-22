// swaggerConfig.ts
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Backend API Documentation",
      description:
        "This backend endpoint project which have  blogs,queries,likes and comments endpoint",
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export default specs;
