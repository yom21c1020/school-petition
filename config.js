module.exports = {
    app: {
        port: 4568
    },
    database: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: 4567,
            user: 'root',
            database: 'board',
            dateStrings: [
                'DATE',
                'DATETIME'
            ]
        },
        acquireConnectionTimeout: 5 * 1000
    }
};
