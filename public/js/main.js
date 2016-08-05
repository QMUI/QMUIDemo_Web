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
var currentUrlWithoutHash = window.location.href.replace(window.location.hash, '');
$.getJSON('http://qmuiteam.com/wxapi/signature.php?url=' + encodeURIComponent(currentUrlWithoutHash)).done(function(result) {
  wx.config({
    debug: false,
    appId: result.appId,
    timestamp: result.timestamp,
    nonceStr: result.nonceStr,
    signature: result.signature,
    jsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
    ]
  });
});

wx.ready(function() {
  var currentUrl = window.location.href,
      isIndex = currentUrl.indexOf('index') != -1 || currentUrl.indexOf('html') == -1,
      config = {
        desc: '一个旨在提高 UI 开发效率，快速产生项目 UI 的前端工作流', // 分享描述
        link: currentUrl, // 分享链接
        imgUrl: 'http://qmuiteam.com/public/style/images/independent/share/ShareLogo.png', // 分享图标
        success: function() {
          console.log('分享成功');
        },
        cancel: function() {
          console.log('分享失败');
        }
      },
      timelineConfig = $.extend(true, {}, config),
      shareAppMessageConfig = $.extend(true, {}, config); 

  timelineConfig.title = document.title; 
  shareAppMessageConfig.title = isIndex ? 'QMUI Web' : document.title; 
  wx.onMenuShareTimeline(timelineConfig);
  wx.onMenuShareAppMessage(shareAppMessageConfig);
});

// Eruda
(function () {
  var src = '../node_modules/eruda/eruda.min.js';
  if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
  document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
  document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();

// 统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?b0246dc2e24129a9a91fc47e6f5a9d9f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
