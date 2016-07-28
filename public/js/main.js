'use strict';

/**
 * @fileoverview QMUI for SASS Demo 的主要 Javascriptddkdd
 */

// 工具方法

// 暂时没有使用，先注释
// // 判断 class 是否存在
// var hasClass = function(e, c) {

//   var l = e.length;

//   for( var i = 0; i < l; i++ ){

//     var t = ' ' + e[i].className + ' ';

//     if( t.indexOf(' ' + c + ' ') != -1 ) return true; // 若包含多个 DOM ，则其中一个包含指定的 class 则返回 true
//   }

//   return false;
// }

// 增加一个 class
var addClass = function(e, c) {
  var t = ' ' + e.className + ' ',
      cs = c.split(' ');

  for( var i = 0; i < cs.length; i++ ){

    var current = cs[i];

    t.indexOf(' ' + current + ' ') === -1 && ( t += ' ' + current );

    t = t.replace('  ', ' '); // 去掉连续两个空格
  }

  e.className = t.replace(/(^\s*)|(\s*$)/g, ''); // 去掉首尾空白
}

// 移除一个 class
var removeClass = function(e, c) {
  var t = ' ' + e.className + ' ',
      cs = c.split(' ');

  for( var i = 0; i < cs.length; i++ ){

    var current = cs[i];

    t.indexOf(' ' + current + ' ') >= 0 && ( t = t.replace(' ' + current + ' ', ' ') );
  }

  e.className = t.replace(/(^\s*)|(\s*$)/g, ''); // 去掉首尾空白
}


// 业务逻辑

// 左侧栏在页面滚动时保持可视的效果
var sidebar = document.getElementById('frame_sidebar'),
    sidebarOriginTop = 60;

if (sidebar) {
  window.onscroll = function() {
    if(document.body.scrollTop > sidebarOriginTop) {
      addClass(sidebar, 'frame_sidebar_Fixed');
    } else {
      removeClass(sidebar, 'frame_sidebar_Fixed');
    }
  }
}

// 移动版菜单交互
var showMenuBtn = document.getElementById('showMenuBtn'),
    closeMenuBtn = document.getElementById('closeMenuBtn'),
    header = document.getElementById('head');

showMenuBtn.onclick = function() {
  addClass(header, 'frame_head_ShowNav');
}
closeMenuBtn.onclick = function() {
  removeClass(header, 'frame_head_ShowNav');
}

// 调用代码高亮方法
prettyPrint();

// 公共组件遮罩层效果展示
var showMask = document.getElementById('qui_showMask'),
    maskWrap = document.getElementById('qui_maskWrap');
if(showMask && maskWrap) {
  showMask.onclick = function(){
    maskWrap.style.display = 'block';
  }
  maskWrap.onclick = function(){
    maskWrap.style.display = 'none';
  }
}

// 微信接口
var wxConfigData = Lib.get({
  url: 'http://qmuiteam.com/wechat-api/get_js_token.php?url=http://qmuiteam.com',
  noCache: true,
  callback: function(result) {
    wx.config({
    debug: false,
    appId: data.appId,
    timestamp: data.timestamp,
    nonceStr: data.nonceStr,
    signature: data.signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
      ]
    });
  }
});

wx.ready(function() {
  var config = {
    title: document.title, // 分享标题
    desc: '一个旨在提高 UI 开发效率，快速产生项目 UI 的前端工作流', // 分享描述
    link: window.location.href, // 分享链接
    imgUrl: 'http://qmuiteam.com/public/style/images/independent/share/ShareLogo.png', // 分享图标
    success: function() {
      console.log('分享成功');
    },
    cancel: function() {
      console.log('分享失败');
    }
  };
  wx.onMenuShareTimeline(config);
  wx.onMenuShareAppMessage(config);
});
