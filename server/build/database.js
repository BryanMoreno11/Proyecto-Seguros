"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const db = pgp({
    user: 'utx8ftigc6lxepfzndkx',
    host: 'bxr81i7c2rp24eggmtha-postgresql.services.clever-cloud.com',
    database: 'bxr81i7c2rp24eggmtha',
    password: 'mglz3NhUp3ntoaNgRcdcuA0DdT0xNQ',
    port: 5432,
});
exports.default = db;
