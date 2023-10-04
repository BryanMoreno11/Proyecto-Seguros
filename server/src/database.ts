import  pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    user: 'utx8ftigc6lxepfzndkx',
    host: 'bxr81i7c2rp24eggmtha-postgresql.services.clever-cloud.com',
    database: 'bxr81i7c2rp24eggmtha',
    password: 'mglz3NhUp3ntoaNgRcdcuA0DdT0xNQ',
    port: 5432,
});

export default db;