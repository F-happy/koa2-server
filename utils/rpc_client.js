/**
 * nuts-json-rpc
 * 这是一个遵循 json-rpc2.0 协议的 node 客户端
 * repo: http://www.jsonrpc.org/specification
 * Created by fuhuixiang on 2017-5-23.
 */
"use strict";
const http = require('http');
let clientCache = {};

class NutsJsonRPCClient {
    constructor(url, port = 8080) {
        this.url = url;
        this.port = port;
    }

    test() {
        console.log('rpc-test');
    }

    async call(method, params) {
        return 'hello';
    }

    analyzeParams(method, params, notify = false) {
        let requestJSON = {
            "jsonrpc": "2.0",
            "method": method,
            "params": params
        };

        if (!notify) {
            requestJSON["id"] = `nuts_json_rpc_${Math.round(100 * Math.random())}`;
        }

        return JSON.stringify(requestJSON);
    }

    request(requestJSON) {
        return new Promise((resolve, reject) => {
            let buffer = '';
            let options = {
                host: this.url,
                port: this.port,
                path: '/',
                headers: {
                    'host': this.url,
                    'Content-Length': requestJSON.length
                },
                method: 'POST'
            };
            http.request(options, (res) => {
                res.on('data', (chunk) => {
                    buffer += chunk;
                });
                res.on('end', () => {
                    let decoded = JSON.parse(buffer);
                    if (decoded.hasOwnProperty('result')) {
                        resolve(decoded.result);
                    } else {
                        reject(decoded.error);
                    }
                });
                res.on('error', (err) => {
                    reject(err);
                });
            }).write(requestJSON).end();
        });
    }
}

module.exports = {
    createClient: (url, port) => {
        if (!clientCache[url]) {
            clientCache[url] = new NutsJsonRPCClient(url, port);
        }
        return clientCache[url];
    }
};
