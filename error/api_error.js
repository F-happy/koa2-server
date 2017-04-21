/**
 * 自定义Api异常
 * Created by fuhuixiang on 2017-4-21.
 */
const ApiErrorNames = require('./api_error_names');

class ApiError extends Error {

    //构造方法
    constructor(error_name, error_code, error_message) {
        super();
        let error_info = ApiErrorNames.getErrorInfo(error_name);

        this.name = error_name;
        this.code = error_info.code;
        this.message = error_info.message;
    }
}

module.exports = ApiError;
