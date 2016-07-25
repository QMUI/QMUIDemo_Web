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
