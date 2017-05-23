/**
 * Created by fuhuixiang on 2017-5-23.
 */
const rpc = require('../utils/rpc_client');

let client = rpc.createClient('www.baidu.com');

client.call().then((v)=>{
    console.log(v);
});
