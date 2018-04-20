import axios from 'axios' 
import qs from 'qs';
import fetchJsonp from 'fetch-jsonp';

const config = require('../../config/')
/**
 * JSOP默认域名
 */
const JSONP_HOST = process.env.NODE_ENV === 'production' 
  ? config.build.hostJsonp
  : config.dev.hostJsonp;

/*
axios.interceptors.request.use(config => {  
  store.commit('UPDATE_LOADING',true) //显示loading  
  return config  
}, error => {  
  return Promise.reject(error)  
})  
  
  
axios.interceptors.response.use(response => {  
  return response  
}, error => {  
  return Promise.resolve(error.response)  
})  
*/

//错误处理
let onError = (errData) => {
  alert(errData.errmsg); 
  //if(errData.errno === -9999){
  // login();
  // }
};

const httpServer = ({url, method='get', params = {}, data = {}}) => {
    let httpDefaultOpts = { //http默认配置  
          method,  
          url,  
          params: Object.assign({
            _t: Date.now()
          }, params), 
          data: qs.stringify(data),
          headers: method=='get'?{  
            'X-Requested-With': 'XMLHttpRequest',  
            "Accept": "application/json",  
            "Content-Type": "application/json; charset=UTF-8"  
          }:{  
            'X-Requested-With': 'XMLHttpRequest',  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
          }  
    }  
  
    if(method=='get'){  
      delete httpDefaultOpts.data  
    }else{  
      delete httpDefaultOpts.params  
    }  
      
    let promise = new Promise((resolve, reject) => {  
      axios(httpDefaultOpts).then((res) => {
          if(res.data.errno == 0){
            resolve(res.data);
          } else {
            onError(res)
            reject(res.data);
          }          
      }).catch((res) => {
        onError({
            errno: -1,
            errmsg: '连接超时，请稍后再试'
        });
          //reject(res);
      }) 
    })  
  return promise  
}  

let callJsonp = function({url, params = {}, CallbackName, callbackFunctionName}) {
  let options = {
    headers:{ Accept: 'application/json' }
  };
  //callback时调用的function name
  if(callbackFunctionName){
    options.jsonCallbackFunction = callbackFunctionName;
  }
  //callback参数的名称比如customCallback=functionName中的customCallback
  if(CallbackName){
    options.jsonpCallback = CallbackName;
  }
 
  if(params){
    params = qs.stringify(params);
    url = `${url}?${params}`;
  } else {
    params = '';
  }

  return new Promise((resolve, reject) => {
    fetchJsonp(url, options)
      .then( response => response.json() )
      .then( resJson => {
        if(resJson.errno === 0){
          resolve(resJson.data);
        } else {
          onError(resJson);
          reject(resJson);
        }
      })
      .catch(response => {
        let err = {
            errno: -1,
            errmsg: '连接超时，请稍后再试'
        };
        onError(err);
        reject(err);
      });
  });
};
  
export default {
  get: (options) => {
    options.method = 'get';
    httpServer(options)
  },
  post: (options) => {
    options.method = 'post';
    httpServer(options)
  },
  jsonp: (options) => {
    /**
     * 默认jsonp域名
     */
    if(options.url.indexOf('http') !== 0) {
      options.url = JSONP_HOST + options.url;
    }
    return callJsonp(options);
  }
}