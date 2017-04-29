/**
 * Created by fuhuixiang on 2017-4-24.
 */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const packageConfig = require('../package.json');
const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_names');

module.exports.encrypted = (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', packageConfig.serverKey);
    let result = cipher.update(text, 'utf8', 'hex');
    result += cipher.final('hex');
    return result;
};

module.exports.decryption = (text) => {
    let result = '';
    if (!!text) {
        const decipher = crypto.createDecipher('aes-256-cbc', packageConfig.serverKey);
        result += decipher.update(text, 'hex', 'utf8');
        result += decipher.final('utf8');
    } else {
        result = null;
    }
    return result;
};

module.exports.signToken = (userInfo) => {
    return jwt.sign(userInfo, packageConfig.serverKey);
};

module.exports.decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, packageConfig.serverKey);
    } catch (err) {
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
};
