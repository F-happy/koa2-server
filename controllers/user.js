/**
 * Created by fuhuixiang on 2017-4-21.
 */
"use strict";
const uuidV1 = require('uuid/v1');
const moment = require('moment');
const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_names');
const userModels = require('../models/users');
const {encrypted, signToken} = require('../utils/safety');

//获取用户
exports.getUser = async (ctx, next) => {
    const uid = ctx.params.uid;
    let userInfo = await userModels.getUserInfo(uid);
    if (userInfo) {
        delete userInfo.id;
        delete userInfo.pwd;
        delete userInfo.token;
        delete userInfo.status;
        userInfo.create_time = moment(userInfo.create_time).unix();
        ctx.body = userInfo;
    } else {
        ctx.body = {};
    }
};

// 用户登录
exports.login = async (ctx, next) => {
    const {account, password} = ctx.request.body;
    const userPassWord = encrypted(password);
    let userInfo = null;
    try {
        userInfo = await userModels.getUserName(account);
    } catch (error) {
        throw new ApiError(ApiErrorNames.USER_HAS_NOT);
    }
    const token = signToken({
        ua: ctx.request.get('user-agent'),
        ip: ctx.request.ip.match(/\d+.\d+.\d+.\d+/)[0],
        name: account,
        uid: userInfo.uid
    });
    if (!!userInfo && userInfo.pwd === userPassWord) {
        delete userInfo.id;
        delete userInfo.pwd;
        delete userInfo.status;
        userInfo.create_time = moment(userInfo.create_time).unix();
        userInfo.token = token;
        ctx.body = userInfo;
    } else {
        throw new ApiError(ApiErrorNames.USER_HAS_NOT);
    }
};

//用户注册
exports.registerUser = async (ctx, next) => {
    const defaultUserImg = 'static/image/default_user.png';
    const {account, password} = ctx.request.body;
    const pwd = encrypted(password);
    const uid = uuidV1();
    const userInfo = {
        pwd,
        uid,
        account,
        headimg: defaultUserImg
    };
    try {
        await userModels.createUser(userInfo);
    } catch (error) {
        throw new ApiError(ApiErrorNames.USER_HAS_EXIST);
    }
};
