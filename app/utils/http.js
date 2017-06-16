/**
 * Created by Administrator on 2017/6/15.
 */
import lodash from 'lodash';
import qs from 'qs';

// 默认自定义处理方法
const defaultCall = (res) => res;

// 尝试解析为json对象 不成功则返回 文本对象
const parseJson = (res) => {
    if (res) {
        try {
            return JSON.parse(res);
        } catch (e) {
            return {
                text: res
            }
        }
    }
    return {};
};

// 统一处理错误
const handleError = error => {
    console.error('_request failed:', error);
    return {
        err: error
    }
};

// 请求方法类型
export const MethodType = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

// 请求模式
export const ModeType = {
    CORS: 'cors',
    NO_CORS: 'no-cors',
    ORIGIN: 'same-origin'
};

// 请求缓存类型
export const CacheType = {
    DEFAULT: 'default',
    NO_STORE: 'no-store',
    RELOAD: 'reload',
    NO_CACHE: 'no-cache',
    FORCE_CACHE: 'force-cache',
    ONLY_IF_CACHED: 'only-if-cached'
};

// 重定向处理类型
export const RedirectType = {
    FOLLOW: 'follow',
    ERROR: 'error',
    MANUAL: 'manual'
};

// 证书类型
export const CredirectType = {
    // 不发送cookie
    OMIT: 'omit',
    // 同一个域, 则发送cookie
    SAME_ORIGIN: 'same-origin',
    // 总是发送
    INCLUDE: 'include'
};

/**
 * fetch封装
 * url
 * method
 * headers
 * params
 * */
function fetchAction (...params) {
    this._url = params.shift(1);
    this._method = params.shift(1);
    this._headers = params.shift(1);
    this._params = params.shift(1);
    this._callback = params.shift(1);

    const option = {
        method: this._method,
        headers: this._headers,
        body: JSON.stringify(this._params),
        credentials: 'same-origin'
    };
    const url = this._url;
    const callback = (
        lodash.isUndefined(this._callback)
        || lodash.isNull(this._callback))
        || lodash.isEmpty(this._callback)
        ? defaultCall : this._callback;

    return fetch(url, option)
        .then(callback)
        .then(res => parseJson(res))
        .catch(error => handleError(error));
}

// 创建header
const createHeader = type => {
    const headers = new Headers();
    const _type = type.toLowerCase();
    if (_type === 'json') {
        headers.append('Content-type', 'application/json;charset=UTF-8');
    } else if (_type === 'file') {
        headers.append('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    }
    return headers;
};

/**
 * Http请求对象构造这模式
 * */
class HttpRequest {
    constructor (option) {
        this._method = MethodType.GET;
        this._url = '';
        this._body = {};
        this._mode = ModeType.ORIGIN;
        this._event = null;
        this._credentials = CredirectType.SAME_ORIGIN;
        this._redirect = RedirectType.FOLLOW;
        this._cache = CacheType.DEFAULT;
        this._bodyUsed = false;
        this._request = new Request({
            bodyUsed: this._bodyUsed,
            headers: new Headers()
        });
        // 默认Json
        this._request.headers.set('Content-type', 'application/json; charset=UTF-8');
    }

    setMethodType = type => {
        this._method = type;
        return this;
    };

    getMethodType = () => {
        return this._method;
    };

    setURL = text => {
        this._url = text;
        return this;
    };

    getURL = () => {
        return this._url;
    };

    setBody = (obj) => {
        this._body = obj ? obj : {} ;
        return this;
    };

    getBody = () => {
        return this._body;
    };

    setMode = (type) => {
        this._mode = type;
        return this;
    };

    setCredentials = (type) => {
        this._credentials = type;
        return this;
    };

    setCustomEvent = (func) => {
        this._event = func;
        return this;
    };

    setRedirect = (type) => {
        this._redirect = type;
        return this;
    };

    setCache = (type) => {
        this._cache = type;
        return this;
    };

    setBodyUsed = (state) => {
        this._bodyUsed = state;
        return this;
    };

    setContentType = text => {
        this._request.headers.set('Content-type', text);
        return this;
    };

    setToken = text => {
        this._request.headers.set('token', text);
        return this;
    };

    addHeaders = obj => {
        this._request.headers.append(obj.name, obj.value);
        return this;
    };

    build = () => {
        return this.buildWithOption(null);
    };

    buildWithOption = (option) => {
        const {
            _method,
            _body,
            _event,
            _url,
            _mode,
            _credentials,
            _bodyUsed
        } = option || this;
        let url = _url;
        if (_method === MethodType.GET) {
            url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(_body);
        }
        this._request.url = url;
        this._request.mode = _mode;
        this._request.method = _method;
        this._request.credentials = _credentials;
        this._request.bodyUsed = _bodyUsed;
        this._request.body = JSON.stringify(_body);
        this._request.event = _event;
        return this._request;
    };
}

export class RequestBuilder {
    static create (option) {
        return new HttpRequest(option);
    }
}

// 重定向登录界面
const redirectLogin = res => {
    return Promise.reject('登录过期重新登录');
};

// 检查登录状态
const checkLogin = res => res.status === 401 ? redirectLogin(res) : res;

// 检查资源
const checkRes = res => {
    const type = res.headers.get('Content-type').split(';')[0];
    if (type === 'text/html') {
        return res.text();
    } else if (type === 'application/json') {
        return res.json();
    } else if (type.match(/\.image/['jpeg'|'png'])) {
        return res.blob();
    }
    return res;
};

// 尝试解析为json对象 不成功则返回 文本对象
const checkJson = (res) => {
    if (res) {
        console.log('checkJson:', res);
        try {
            return JSON.parse(res);
        } catch (e) {
            return {
                text: res
            }
        }
    }
    return {};
};

// 默认自定义处理事件
const defaultCustomHandleEvent = res => res;

const requestAction = (request) => {
    const { event } = request;
    let lastEvent = defaultCustomHandleEvent;
    if (lodash.isFunction(event)) {
        lastEvent = event;
    }
    return fetch(request)
        .then(res => checkLogin(res))
        .then(res => checkRes(res))
        .then(res => lastEvent(res))
        .catch(error => handleError(error))
};

export const get = (request) => {
    return requestAction(request);
};

// export const get = (url, params = {}, type = 'json', event) => {
//     let browserUrl = url;
//     if (!lodash.isEmpty(params)) {
//         browserUrl = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
//     }
//     const headers = createHeader(type);
//     // const _request = new Request(browserUrl, {
//     //     headers: headers,
//     //     method: 'POST'
//     // });
//     // console.log('headers:', _request);
//     // return fetch(_request);
//     return fetchAction(browserUrl, TYPE.GET, headers, {}, event);
// };

// export const post = (url, params = {}, type = 'json', event) => {
//     const headers = createHeader(type);
//     return fetchAction(url, MethodType.POST, headers, params, event);
// };
