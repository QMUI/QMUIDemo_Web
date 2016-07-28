Lib = {};
Lib.createXHR = function(){

  if ( 'XMLHttpRequest' in window ){

    /**
     * @ignore
     * @supported For Modern Browers
     */
    Lib.createXHR = function(){
      return new XMLHttpRequest();
    };

  } else if( 'ActiveXObject' in window ){

    /**
     * @ignore
     * @supported IE6-7
     */
    Lib.createXHR = function(){

      return new ActiveXObject("Msxml2.XMLHTTP");
    };

  } else {

    /**
     * @ignore
     * @supported IE5
     */
    Lib.createXHR = function(){
      throw new Error("Ajax is not supported by this browser");
    };

  }

  return Lib.createXHR();

};

/**
 * Ajax 请求方法
 * 
 * @method ajax
 * 
 * @param {Object} ajaxData Ajax 的请求选项，包括 type, data, dataType, url, noCache, before, error, callback
 * @return {Object} 返回一个 xhr 对象
 */

Lib.request = function(ajaxData){

  var xhr = Lib.createXHR();

  ajaxData.before && ajaxData.before();

  /**
   * 通过事件来处理异步请求
   * @ignore
   */
  xhr.onreadystatechange = function(){

    if( xhr.readyState == 4 ){

      if( xhr.status == 200 ){

        if( ajaxData.dataType == 'json' ){

          // 获取服务器返回的 json 对象
          jsonStr = xhr.responseText;
          json1 = eval('(' + jsonStr + ')'),
                json2 = (new Function('return ' + jsonStr))();
          ajaxData.callback(json2);
          // ajaxData.callback(JSON.parse(xhr.responseText)); // 原生方法，IE6/7 不支持

        } else

          ajaxData.callback(xhr.responseText);

      } else {

        ajaxData.error && ajaxData.error(xhr.responseText);
      }
    }
  };

  // 设置请求参数
  xhr.open(ajaxData.type, ajaxData.url);

  if( ajaxData.noCache == true ) xhr.setRequestHeader('If-Modified-Since', '0');

  if( ajaxData.data ){

    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send( ajaxData.data );

  } else {

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send( null );
  }

  return xhr;
};

/**
 * Ajax 的 post 请求方法，从 ajax 方法中封装出来
 * @param {Object} ajaxData Ajax 的请求选项，包括 data, dataType, url, noCache, before, error, callback
 * 另外 type 会在该方法中被覆盖为 'POST'
 */

Lib.post = function(ajaxData){

  ajaxData.type = 'POST';

  var _result = Lib.request(ajaxData);

  return _result;
};

/**
 * Ajax 的 get 请求方法，从 ajax 方法中封装出来
 * @param {Object} ajaxData Ajax 的请求选项，包括 dataType, url, noCache, before, error, callback
 * 另外 type 和 data 会在该方法中分别被覆盖为 'GET' 和 null(get 方法不能发送数据)
 */

Lib.get = function(ajaxData){

  ajaxData.type = 'GET';

  ajaxData.data = null;

  var _result = Lib.request(ajaxData);

  return _result;
};
