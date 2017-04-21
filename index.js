/**
 * Created by fuhuixiang on 2017-4-21.
 */
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

//log工具
const logUtil = require('./utils/log_util');
const api = require('./router/index');
const responseFormatter = require('./middlewares/response_formatter');

let router = new Router();

app.use(cors());
app.use(bodyParser());

// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
        //开始进入到下一个中间件
        await next();
        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(responseFormatter('^/v1'));

router.use('/v1', api.routes(), api.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// response
app.on('error', (err, ctx) => {
    console.log(err);
    // logger.error('server error', err, ctx);
});

module.exports = app;
