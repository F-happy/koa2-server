/**
 * 自定义Api异常
 * Created by fuhuixiang on 2017-4-21.
 */
const ApiErrorNames = require('./api_error_names');

class ApiError extends Error {

    //构造方法
    constructor(errorName, errorCode, errorMessage) {
        super();
        let errorInfo = ApiErrorNames.getErrorInfo(errorName);

        this.name = errorName;
        this.code = errorInfo.code;
        this.message = errorInfo.message;
    }
}

module.exports = ApiError;
