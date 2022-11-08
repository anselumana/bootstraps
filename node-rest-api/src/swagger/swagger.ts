import swaggerAutogen from "swagger-autogen";


const doc = {
   info: {
     title: "Products API",
     description: "Simple REST API built with Typescript, Express and MongoDB.",
   },
   host: "localhost:8080", // todo: how to make parametric?
   schemes: ["http"],
 };

const outputFile = "./src/swagger/static/swagger.json";
const endpointsFiles = ["./src/app.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);