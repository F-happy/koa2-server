/**
 * nuts-json-rpc
 * 这是一个遵循 json-rpc2.0 协议的 node 客户端
 * repo: http://www.jsonrpc.org/specification
 * Created by fuhuixiang on 2017-5-23.
 */
"use strict";
const http = require('http');
const url = require('url');
let clientCache = {};

class NutsJsonRPCClient {
    constructor(host, port = 80) {
        const urlInfo = url.parse(host);
        this.host = urlInfo.host;
        this.port = port;
        this.path = urlInfo.path || '/';
    }

    async call(method, params) {
        return await this.request(this.analyzeParams(method, params));
    }

    analyzeParams(method, params, notify = false) {
        let requestJSON = {
            'jsonrpc': '2.0',
            'method': method,
            'params': params
        };
        if (!notify) {
            requestJSON['id'] = `nuts_json_rpc_${Math.round(100 * Math.random())}`;
        }
        return JSON.stringify(requestJSON);
    }

    request(requestJSON) {
        return new Promise((resolve, reject) => {
            let buffer = '';
            let options = {
                host: this.host,
                port: this.port,
                path: this.path,
                headers: {
                    'Host': this.host,
                    // 'Connection': 'keep-alive',
                    // 'Transfer-Encoding': 'chunked',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Content-Length': requestJSON.length
                },
                method: 'POST'
            };
            const request = http.request(options);
            request.on('response', (response) => {
                response.on('data', (chunk) => {
                    buffer += chunk;
                });
                response.on('end', () => {
                    if (response.statusCode === 200) {
                        let decoded = JSON.parse(buffer);
                        if (decoded.hasOwnProperty('result')) {
                            resolve(decoded.result);
                        } else {
                            reject(decoded.error);
                        }
                    } else {
                        reject('request error code: ' + response.statusCode);
                    }
                });
                response.on('error', (err) => {
                    reject(err);
                });
            });
            request.on('error', (err) => {
                reject(err);
            });
            request.write(requestJSON);
            request.end();
        });
    }
}

module.exports = {
    createClient: (host, port) => {
        if (!clientCache[host]) {
            clientCache[host] = new NutsJsonRPCClient(host, port);
        }
        return clientCache[host];
    }
};
