/**
 * Created by fuhuixiang on 2017-4-24.
 */
"use strict";

const env = process.env.NODE_ENV;
let dbConfig = null;

switch (env){
    case 'dev':
        dbConfig = require('./development');
        break;
    case 'test':
        dbConfig = require('./test');
        break;
    case 'prod':
        dbConfig = require('./product');
        break;
    default:
        break;
}

module.exports = dbConfig;
