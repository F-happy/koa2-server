/**
 * Created by fuhuixiang on 2017-4-21.
 */
const router = require('koa-router')();
const userController = require('../controllers/user');

router.get('/get', userController.getUser);
router.post('/register', userController.registerUser);


module.exports = router;
