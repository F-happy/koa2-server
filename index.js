/**
 * Created by fuhuixiang on 2017-4-21.
 */
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const api = require('./router/index');
const responseFormatter = require('./middlewares/response_formatter');
const logMiddleware = require('./middlewares/logger');
const loginMiddleware = require('./middlewares/login');

let router = new Router();

app.use(convert(cors()));
app.use(bodyParser());
app.use(logMiddleware);

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(responseFormatter('^/v1'));

router.use('/v1', api.routes(), api.allowedMethods());

app.use(loginMiddleware);

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.jsonSpaces = 0;

// response
app.on('error', (err, ctx) => {
    console.log(err);
    // logger.error('server error', err, ctx);
});

module.exports = app;
