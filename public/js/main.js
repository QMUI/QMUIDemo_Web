'use strict';

/**
 * @fileoverview QMUI Web Demo 的主要 Javascript
 */

// 工具方法

// 增加一个 class
var addClass = function (e, c) {
    var t = ' ' + e.className + ' ',
        cs = c.split(' ');

    for (var i = 0; i < cs.length; i++) {

        var current = cs[i];

        t.indexOf(' ' + current + ' ') === -1 && (t += ' ' + current);

        t = t.replace('  ', ' '); // 去掉连续两个空格
    }

    e.className = t.replace(/(^\s*)|(\s*$)/g, ''); // 去掉首尾空白
};

// 移除一个 class
var removeClass = function (e, c) {
    var t = ' ' + e.className + ' ',
        cs = c.split(' ');

    for (var i = 0; i < cs.length; i++) {

        var current = cs[i];

        t.indexOf(' ' + current + ' ') >= 0 && (t = t.replace(' ' + current + ' ', ' '));
    }

    e.className = t.replace(/(^\s*)|(\s*$)/g, ''); // 去掉首尾空白
};


// 业务逻辑

// 移动版菜单交互
var showMenuBtn = document.getElementById('showMenuBtn'),
    closeMenuBtn = document.getElementById('closeMenuBtn'),
    header = document.getElementById('head');

showMenuBtn.onclick = function () {
    addClass(header, 'frame_head_ShowNav');
};
closeMenuBtn.onclick = function () {
    removeClass(header, 'frame_head_ShowNav');
};

// 调用代码高亮方法
var tagsToReplace = {
    '<': '&lt;',
    '>': '&gt;'
};
$('pre code').each(function (i, block) {
    var result = $(block).html();
    result = result.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
    $(block).html(result);
    hljs.highlightBlock(block);
});

// 公共组件遮罩层效果展示
var showMask = document.getElementById('qui_showMask'),
    maskWrap = document.getElementById('qui_maskWrap');
if (showMask && maskWrap) {
    showMask.onclick = function () {
        maskWrap.style.display = 'block';
    };
    maskWrap.onclick = function () {
        maskWrap.style.display = 'none';
    };
}

/* eslint-disable */
// 第三方框架调用，忽略检测
// 微信接口
var currentUrlWithoutHash = window.location.href.replace(window.location.hash, '');
$.getJSON('http://qmuiteam.com/wxapi/signature.php?url=' + encodeURIComponent(currentUrlWithoutHash)).done(function (result) {
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

wx.ready(function () {
    var currentUrl = window.location.href,
        isIndex = currentUrl.indexOf('index') != -1 || currentUrl.indexOf('html') == -1,
        config = {
            desc: '一个旨在提高 UI 开发效率，快速产生项目 UI 的前端框架', // 分享描述
            link: currentUrl, // 分享链接
            imgUrl: 'http://qmuiteam.com/web/public/style/images/independent/share/ShareLogo.png', // 分享图标
            success: function () {
                console.log('分享成功');
            },
            cancel: function () {
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
if (window.localStorage) {
    (function () {
        var src = '../node_modules/eruda/eruda.min.js';
        if (!(/eruda=true/).test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
        document.write('<scr' +
            'ipt src="' +
            src +
            '"></scr' +
            'ipt>');
        document.write('<scr' +
            'ipt>eruda.init();</scr' +
            'ipt>');
    })();
}

// 统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement('script');
    hm.src = '//hm.baidu.com/hm.js?b0246dc2e24129a9a91fc47e6f5a9d9f';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
})();
/* eslint-enable */


// 侧边栏滚动处理
var isNavInClick = false;

// 确认侧边栏上的目录是否已经进入 Active 态
var frameSidebarItemIsInActive = function (target) {
    var offsetTop = $(target).offset().top,
        height = $(target).outerHeight();

    return offsetTop > -height + 46;
};

// 触发侧边栏进入 Active 态
var makeFrameSidebarActive = function (columnIndex, itemIndex) {
    var group = $('.js_sidebar_group').removeClass('frame_sidebar_nav_item_Open').eq(columnIndex).addClass('frame_sidebar_nav_item_Open');
    $('.js_sidebar_item').removeClass('frame_sidebar_nav_item_Active');
    if (group.length > 0) {
        group.find('.js_sidebar_item').eq(itemIndex).addClass('frame_sidebar_nav_item_Active');
    }
};

// 确认侧边栏是否被点击
var confirmNavIsInClick = function () {
    var timerAtClickNav = null; // 由于导航栏点击的时候,也会触发页面滚动条滚动，这个标志位是为了当导航栏点击之后的 100ms 内不触发页面滚动条事件
    isNavInClick = true;
    clearTimeout(timerAtClickNav);
    timerAtClickNav = setTimeout(function () {
        isNavInClick = false;
    }, 100);
};

makeFrameSidebarActive(0, 0); // 初始化侧边栏

// 为侧边栏绑定滚动事件
$('.frame_cnt').on('scroll', function () {
    if (!isNavInClick) {  // 当用户进行点击时,不响应滚动事件
        var frameCntHeight = $(this).outerHeight(true), // 可见高度
            frameCntContentHeight = $(this).get(0).scrollHeight, // 内容高度
            frameCntScrollTop = $(this).scrollTop(), // 滚动高度
            columnIndex = 0,
            itemIndex = 0;
        if (frameCntHeight + frameCntScrollTop >= frameCntContentHeight) { // 到达页面底部的特殊处理
            columnIndex = $('.dm_column').length - 1;
            itemIndex = $('.dm_column').last().find('.dm_column_item').length - 1;
        } else {  // 页面滚动的处理
            $('.dm_column').each(function (i) { // eslint-disable-line
                if (frameSidebarItemIsInActive(this)) {
                    columnIndex = i;
                    $(this).children('.dm_column_item').each(function (j) { // eslint-disable-line
                        if (frameSidebarItemIsInActive(this)) {
                            itemIndex = j;

                            return false;
                        }
                    });

                    return false;
                }
            });
        }
        makeFrameSidebarActive(columnIndex, itemIndex);
    }
});


// 为侧边栏一级目录绑定点击事件
$('.frame_sidebar_nav').delegate('.js_sidebar_group', 'click', function () {
    confirmNavIsInClick();
    makeFrameSidebarActive($('.js_sidebar_group').index(this), 0);
});

// 为侧边栏二级目录绑定点击事件
$('.frame_sidebar_nav').delegate('.js_sidebar_item', 'click', function (event) {
    confirmNavIsInClick();
    $(this).addClass('frame_sidebar_nav_item_Active').siblings('.js_sidebar_item').removeClass('frame_sidebar_nav_item_Active');
    event.stopPropagation();
});
