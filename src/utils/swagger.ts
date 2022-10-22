import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
// import log from './logger';

// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: 'REST API Docs',
//             version
//         },
//         components: {
//             securitySchemes: {
//                 apiKey: {
//                     type: 'apiKey',
//                     in: 'header',
//                     scheme: 'bearer',
//                     bearerFormat: 'JWT'
//                 }
//             }
//         },
//         security: [
//             {
//                 bearerAuth: []
//             }
//         ]
//     },
//     apis: ['src/routes/*.ts', 'src/schemas/*.ts'],
// }

// export const swaggerOptions = swaggerJsdoc(options);

// export const swaggerDocs = (app: Express, port: number) => {
//     // Swagger page
//     app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));
//     // Docs in JSON format
//     app.get('docs.json', (req, res) => {

//         res.setHeader('Content-Type', 'application/json');
//         res.send(swaggerOptions);
//     })
// }

export const swaggerOptions = {
    info: {
        version,
        title: 'API REST Product',
        description: 'API server to practice node.js',
        license: {
            name: 'DAN',
        },
    },
    security: {
        BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: "Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluL"
        }
    },
    baseDir: '',
    swaggerUIPath: '/docs',
    filesPattern: './**/*.{ts,js}',
    exposeSwaggerUI: true,
};