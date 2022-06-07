// ========== CONSTANT ========== //
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const GET_URL = BASE_URL + '/posts';
const POST_URL = BASE_URL + '/posts';
const PUT_URL = BASE_URL + '/posts/1';
const DELETE_URL_BLIND_PARAM = BASE_URL + '/posts/1';
const DELETE_URL = BASE_URL + '/posts';

// ========== BASE CHECK ========== //
function isFunction(func) {
  return typeof func === 'function';
}

function handleHttpError(error) {
  if (error.response && error.response.data) {
    return error.response.data.errorMessage || error;
  }

  return error;
}

function serialize(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
}

function transformConfig(config) {
  const requestTime = Date.now();
  const headers = {
    'Content-Type': 'application/json',
    RequestTime: requestTime,
    ...config.headers,
  };

  config.headers = headers;
  config.timeout = 3000;
  return config;
}

// handle response
function handleSuccessResponse(res) {
  console.log('success', res);
  return res;
}
function handleErrorResponse(err) {
  console.log('error', err);
  return err;
}
function transformResponse(data) {
  console.log('transform', data);
  return data;
}

// ========== Request With Axios ========== //
// setup axios
axios.defaults.timeout = 3000;
axios.defaults.headers = {
  'Content-type': 'application/json',
};

/** make http request
 * @param apiCall : function to call api
 * @param successCallBack : handle success response
 * @param failCallBack : handle error response
 * @param transformFunc : pre-process response data
 *
 *  */

function makeHttpRequest(apiCall, successCallBack, failCallBack, transformFunc) {
  return new Promise(async () => {
    try {
      const response = await apiCall();
      const responseData = response.data;
      const successResponse = isFunction(transformFunc) ? transformFunc(responseData) : responseData;
      successCallBack(successResponse);
    } catch (e) {
      if (isFunction(failCallBack)) {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

// Extra method
function getRequest(url, config = {}, successCallBack, failCallBack, transformFunc) {
  transformConfig(config);
  return makeHttpRequest(() => axios.get(url, config), successCallBack, failCallBack, transformFunc);
}

function postRequest(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  transformConfig(config);
  return makeHttpRequest(() => axios.post(url, data, config), successCallBack, failCallBack, transformFunc);
}

function putRequest(url, data, config = {}, successCallBack, failCallBack) {
  transformConfig(config);
  return makeHttpRequest(() => axios.put(url, data, config), successCallBack, failCallBack);
}

function deleteRequest(url, data, config = {}, successCallBack, failCallBack) {
  transformConfig(config);
  return makeHttpRequest(() => axios.delete(url, data, config), successCallBack, failCallBack);
}

// ========== Request With Fetch ========== //

async function fetchRequest(requestConfig, successCallBack, failCallBack, transformFunc) {
  try {
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : 'GET',
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });
    const responseData = await response.json();
    const successResponse = isFunction(transformFunc) ? transformFunc(responseData) : responseData;
    successCallBack(successResponse);
  } catch (e) {
    if (isFunction(failCallBack)) {
      failCallBack(handleHttpError(e));
    }
  }
}

// ========== Demo ========== //

// axios
const callAPI = () => axios.get('https://jsonplaceholder.typicode.com/posts/1');
makeHttpRequest(callAPI, handleSuccessResponse);

getRequest(GET_URL, {}, handleSuccessResponse, handleErrorResponse);

postRequest(POST_URL, { title: 'foo', body: 'bar', userId: 1 }, {}, handleSuccessResponse, handleErrorResponse);

putRequest(PUT_URL, { title: 'foo', body: 'bar', userId: 1 }, {}, handleSuccessResponse, handleErrorResponse);

deleteRequest(DELETE_URL_BLIND_PARAM, {}, {}, handleSuccessResponse);

deleteRequest(DELETE_URL, { params: { '': 1 } }, {}, handleSuccessResponse, handleErrorResponse); // error

// fetch
fetchRequest({ url: 'https://jsonplaceholder.typicode.com/posts/1' }, handleSuccessResponse);
fetchRequest({ url: POST_URL, method: 'post', body: { title: 'foo', body: 'bar', userId: 1 } }, handleSuccessResponse);
