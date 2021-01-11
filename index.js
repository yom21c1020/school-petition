const fastify = require('fastify')({ logger: true });
const fastifyFormbody = require('fastify-formbody');
const db = require('./db');
const config = require('./config');

// Declare a route
fastify.get('/', async (request, reply) => ({ hello: 'world' }));

// Run the server!
const start = async () => {
    // Create database tables
    await db.createTables();

    // Import plugins
    fastify.register(fastifyFormbody);

    // Define routes
    fastify.route({
        method: 'POST',
        url: '/post',
        schema: {
            body: {
                title: {
                    type: 'string'
                },
                context: {
                    type: 'string',
                    maxLength: 1500
                }
            }
        },
        handler: async (request, reply) => {
            const { title, context } = request.body;

            const [id] = await db.knex('petitions')
                .returning('id')
                .insert({
                    title,
                    context
                });
            const [item] = await db.knex('petitions')
                .select('*')
                .where({
                    id
                });

            return item;
        }
    });
    fastify.route({
        method: 'GET',
        url: '/list',
        handler: async (request, reply) => {
            const results = await db.knex('petitions').select('id', 'title').limit(50).orderBy('id', 'desc');

            return results;
        }
    });
    fastify.route({
        method: 'GET',
        url: '/post/:id',
        schema: {
            params: {
                id: {
                    type: 'integer'
                }
            }
        },
        handler: async (request, reply) => {
            const { id } = request.params;

            if (!id) return { result: false };

            const [item] = await db.knex('petitions').select('*').where({ id });

            return {
                result: item
            };
        }
    });

    // Start the server
    try {
        await fastify.listen(config.app.port);

        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
