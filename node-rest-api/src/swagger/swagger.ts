import swaggerAutogen from "swagger-autogen";

const outputFile = './src/swagger/static/swagger.json';
const endpointsFiles = ["./src/app.ts"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles);