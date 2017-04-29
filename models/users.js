/**
 * Created by fuhuixiang on 2017-4-25.
 */
"use strict";

const db = require('../utils/db');

module.exports.getUserInfo = (uid) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('SELECT * FROM `users` WHERE `uid` = ? LIMIT 1', [uid], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0]);
                }
                connection.release();
            });
        });
    });
};

module.exports.getUserName = (account) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('SELECT * FROM `users` WHERE `account` = ? LIMIT 1', [account], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0]);
                }
                connection.release();
            });
        });
    });
};

module.exports.createUser = ({uid, account, pwd, headimg} = {}) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            let post = {
                phone: '',
                account: account,
                username: account,
                headimg: headimg,
                pwd: pwd,
                email: account,
                uid: uid
            };
            connection.query('INSERT INTO users SET ?', post, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        });
    });
};
