export default {
	browser: {
    device: function() {
      const u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
        qq: u.match(/\sQQ/i) == " qq" // 是否QQ
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  },
	getQuery() {
	    const queryArrs = location.search.slice(1).split('&');
	    let query = {};

	    queryArrs.forEach(v => {
	      if (v) {
	        const queryItems = v.split('=');

	        query[queryItems[0]] = queryItems[1];
	      }
	    })

	    return query;
  },

  parseJson(json) {
    let obj = {};
    try {
      obj = JSON.parse(json)
    } catch (e) {
      try {
        obj = eval('(' + json + ')')
      } catch (e) {}
    }

    return obj;
  },
  // goBack() {
  //   if (typeof mWebView == "object" && mWebView.finishWeb) {
  //     mWebView.finishWeb();
  //   } else if (typeof QhSDKWebView == "object" && QhSDKWebView.finishAct) {
  //     QhSDKWebView.finishAct();
  //   } else {
  //     history.go(-1);
  //   }
  // },
  //页面PV、UV打点
  
  // qdasLoger(data = {}) {
  //   const track = monitor.data.getTrack()
  //   monitor.setProject('QH_46_1').qdasMonitor().log({...track, ...data}, 'track')    
  // },
  
  keyWithPrefix(prefix, key) {
	  if (prefix !== "") {
	    // 首字母大写
	    return prefix + key.slice(0, 1).toUpperCase() + key.slice(1);
	  }
	  return key;
	},
  isArray(data){
    return Object.prototype.toString.call(data) === "[object Array]";
  },
  /**
   * 窗口是否可见()
   * @param  {Function} fn - 回调函数
   * @return {isActive} boolean
   */
  checkVisibilityState(fn) {
    const doc = document;    
    const prefix =  ["", "webkit", "moz", "ms"];
    let prefixSupport;

    const formatProp = (pre, prop) => {
    	return pre && pre.length > 0 ? `${pre}${prop.slice(0, 1).toUpperCase()}${prop.slice(1)}` : `${prop}`;
    };
    const visibilityStateChange = (evt) => {
      const isActive = formatProp(prefixSupport, "visibilityState") == "visible" ? true : false;
      fn(isActive);
    };
    
    for(let i = 0; i < prefix.length; i ++){
    	const prop = formatProp(prefix[i], "hidden");
    	if(prop in doc){
    		prefixSupport = prefix[i];
    		document.addEventListener(`${prefixSupport}visibilitychange`, visibilityStateChange, false);
    		visibilityStateChange();
    		break;
    	}
    }
    if(prefixSupport !== undefined){ 
    	// IE 9 and lower:
	    if ('onfocusin' in document) {
	      doc.onfocusin = doc.onfocusout = visibilityStateChange;
	    } else {
	    	// All others:
	      window.onpageshow = window.onpagehide = window.onfocus = window.onblur = visibilityStateChange;
	    }
	    fn(true);
    } 
  }
}