/**
 * Created by fuhuixiang on 2017-4-21.
 */
const router = require('koa-router')();
const user_router = require('./user');

router.use('/users', user_router.routes(), user_router.allowedMethods());

module.exports = router;
