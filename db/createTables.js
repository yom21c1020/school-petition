const tables = require('./tables');
const knex = require('./knex');

module.exports = async () => {
    const tableNames = Object.keys(tables);

    for (let i = 0, l = tableNames.length; i < l; i++) {
        const name = tableNames[i];

        if (!await knex.schema.hasTable(name)) {
            await knex.schema.createTable(name, tables[name]);
        }
    }
};
