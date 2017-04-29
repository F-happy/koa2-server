/**
 * Created by fuhuixiang on 2017-4-28.
 */
"use strict";
//log工具
const logUtil = require('../utils/log_util');
const {errorMap} = require('../error/api_error_names');

module.exports = async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
        //开始进入到下一个中间件
        await next();
        if (process.env.NODE_ENV !== 'dev') {
            //记录响应日志
            ms = new Date() - start;
            logUtil.logResponse(ctx, ms);
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(error);
        } else if (!errorMap.has(error.name)) {
            //记录异常日志
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms);
        }
    }
};
