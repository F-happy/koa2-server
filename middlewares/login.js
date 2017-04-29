/**
 * Created by fuhuixiang on 2017-4-28.
 */
"use strict";
//log工具
const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_names');
const {verifyToken} = require('../utils/safety');

module.exports = async (ctx, next) => {
    //开始进入到下一个中间件
    await next();
    const passUrlList = ['/v1/users/register', '/v1/users/login'];
    if (!passUrlList.includes(ctx.request.url) && process.env.NODE_ENV !== 'dev') {
        if (!verifyToken(ctx.header.authorization)) {
            throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
        }
    }
};
