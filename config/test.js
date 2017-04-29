/**
 * 测试环境的配置内容
 * Created by fuhuixiang on 2017-4-21.
 */

module.exports = {
    port: 3001,         //服务端口号
    mongodb_url: '',    //数据库地址
    redis_url: '',      //redis地址
    redis_port: '',     //redis端口号
    mysql: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: '',
        connectionLimit: 10,
    }
};
