import  pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    user: 'postgres',
    host: 'localhost',
    database: 'facilitaSeguros',
    password: 'admin',
    port: 5432,
});

export default db;