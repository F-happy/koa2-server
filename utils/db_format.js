/**
 * 因为 mysql 返回的数据是 RowDataPacket 对象
 * 因此在这里将这个对象转成标准的数组对象，同时对错误进行判断
 *
 * @param err
 * @param rows
 * @returns {*}
 * Created by fuhuixiang on 2017-4-24.
 */
"use strict";

module.exports.formatData = (err, rows)=> {
    if (err) {
        return [];
    } else {
        return rows.map((v)=> {
            return Object.assign({}, v);
        });
    }
};

/**
 * [ { distribute: 0, buy: 1, num: 1 } ] ==> { '0': { num: 1, buy: 1 } }
 * @param list
 * @returns {{}}
 */
module.exports.formatDataList = (list)=> {
    let result = {};
    if (Object.prototype.toString.call(list) === '[object Array]') {
        list.forEach((v)=> {
            result[v['distribute']] = {num: v['num'] || 0, buy: v['buy'] || 0};
        });
    }
    return result;
};

module.exports.mergeData = (key, source_key, val, dis_id)=> {
    let result = {};
    try {
        result[key] = val[dis_id][source_key]
    } catch (e) {
        result[key] = 0;
    }
    return result[key];
};
