import request from 'superagent';
import Promise from 'bluebird';
import cache   from 'memory-cache';
import config  from './config';
import jp      from 'jsonpath';
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config);

    const methods = {
        value(params) {
            const {
                url,
                path
            } = params;

            return request.get(url)
                .promise()
                .then(res => {
                    const json = JSON.parse(res.text);
                    const data = path
                        ? jp.query(json, path)
                        : json;

                    return {data};
                })
                .catch(err => {
                    console.error(err, err.stack);
                });
        }
    };

    return methods;
};

export default client;
