/**
 * Created by fuhuixiang on 2017-4-21.
 */
const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_names');

//获取用户
exports.getUser = async (ctx, next) => {
    //如果id != 1抛出API 异常
    if (ctx.query.id !== '1') {
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    ctx.body = {
        username: '阿，希爸',
        age: 30
    }
};

//用户注册
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
};
