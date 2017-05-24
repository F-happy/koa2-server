/**
 * Created by fuhuixiang on 2017-5-23.
 */
const rpc = require('../utils/rpc_client');

// let client = rpc.createClient('http://sales-system-backend.test2.shouqianba.com', '/rpc/organization');
let client = rpc.createClient('http://sales-system-backend.test2.shouqianba.com/rpc/organization');
// let client2 = rpc.createClient('alipay.authinto.dev.shouqianba.com', '/rpc/alipaystore');
// let client = rpc.createClient('http://api.jonnyf.com', '/get_time');

(async () => {
    try {
        let value = await client.call('getChannelByMerchantId', ['9ce0102c-2fb5-11e7-a244-7cd30ac33432']);
        console.log(value);
    } catch (err) {
        console.log(err);
    }
})();

// let client = rpc.createClient('http://alipay.authinto.dev.shouqianba.com', '/rpc/alipaystore');
//
// // client.call('getChannelByMerchantId', ['9ce0102c-2fb5-11e7-a244-7cd30ac33432']).catch((v)=>{
// client2.call('getOAuthSuccessURL', [{},
//     "http://alipay.authinto.dev.shouqianba.com/gateway/oauthSuccessForward?storeId=006a58d2-5ed6-11e6-b79f-00163e00625b&redirect_result_url=http://alipay.authinto.dev.shouqianba.com/gateway/alinotify"]).then((v) => {
//     console.log(v);
// });

// console.log(rpc);
