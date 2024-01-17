import  pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    user: 'utx8ftigc6lxepfzndkx',
    host: 'bzwbaewg1mrk19ddpzay-postgresql.services.clever-cloud.com',
    database: 'bzwbaewg1mrk19ddpzay',
    password: 'mglz3NhUp3ntoaNgRcdcuA0DdT0xNQ',
    port: 50013,
});

export default db;