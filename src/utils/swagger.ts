import { version } from '../../package.json';

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