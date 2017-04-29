/**
 * Created by fuhuixiang on 2017-4-24.
 */
"use strict";

const mysql = require('mysql');
const mysqlConfig = require('../config').mysql;
const client = require('redis').createClient();

let pool = null;

module.exports.init = () => {
    console.log('mysql server start');
    pool = mysql.createPool({
        host: mysqlConfig.host,
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database,
        connectionLimit: mysqlConfig.connectionLimit
    });
};

module.exports.getConnection = (callback) => {
    if (pool === null) {
        this.init();
    }
    return pool.getConnection(callback);
};

module.exports.setRedisData = (key, value) => {
    client.set(`308:${key}`, JSON.stringify(value));
};

module.exports.getRedisData = (key) => {
    return new Promise((resolve, reject) => {
        client.get(`308:${key}`, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(reply));
            }
        });
    });
};
