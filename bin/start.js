#!/usr/bin/env node

"use strict";
const fs = require('fs');
const logConfig = require('../config/log_config');
const server = require('../index');

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
const confirmPath = function (pathStr) {

    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
};

/**
 * 初始化log相关目录
 */
const initLogPath = function () {
    //创建log的根目录'logs'
    if (logConfig.baseLogPath) {
        confirmPath(logConfig.baseLogPath);
        //根据不同的logType创建不同的文件目录
        for (let i = 0, len = logConfig.appenders.length; i < len; i++) {
            if (logConfig.appenders[i].path) {
                confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path);
            }
        }
    }
};

initLogPath();

server.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
