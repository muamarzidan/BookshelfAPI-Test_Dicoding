const hapi = require('@hapi/hapi');
const routes = require('./src/route/routes');

const serverUp = async () => {
    const server = hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: [`*`],
            }
        }
    });
    server.route(routes);

    await server.start();
    console.log(`Server running on port ${server.info.uri}`);
}

serverUp();