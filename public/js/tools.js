'use strict';

/**
 * @hughkli, Kayo 动态生成工具方法tools.html的DOM内容
 */
// 利用 SASS 方法的 item 数据拼接方法声明
var makeCompleteMethodWithItem = function(item, content) {
  var result = '',
      itemType = null;

  if (item.context.type === 'placeholder') {
    itemType = '%';
  } else {
    itemType = item.context.type + ' ';
    result = '@';
  }

  result = result + itemType + item.context.name;
  if (item.parameter) {
    result += '(';

    var paraList = item.parameter;
    for (var paraIndex = 0; paraIndex < paraList.length; paraIndex++) {
      var paraItem = paraList[paraIndex];
      if (paraIndex !== 0) {
        result += ', $';
      } else {
        result += '$';
      }
      result += paraItem.name;
      if (paraItem.defaultValue) {
        result = result + ': ' + paraItem.defaultValue;
      }
    }
    result += ')';
  }

	if (content) {
		result += ' {\n' + content + '}';
	} else {
		result += ' { ... }';
	}

  return result;
};

var siderHtml = [],     // 侧栏
    mainHtml = [];      // 主体

for (var i = 0, llength = comments.length; i < llength; i++) {
	var tool = comments[i],
      title = tool[0].group, // 使用第一个方法的分组作为该组标题
      id = 'qui_' + tool[0].context.name + 'Parent'; // 使用第一个方法的名称加 qui 前缀作为该组 id
	siderHtml.push('<li class="frame_sidebar_nav_item js_sidebar_group">');
	siderHtml.push('<a class="frame_sidebar_nav_link" href="#' + id + '">' + title + '</a>');

	siderHtml.push('<ul class="frame_sidebar_nav frame_sidebar_nav_Children">');
  for (var sidebarItemIndex = 0; sidebarItemIndex < tool.length; sidebarItemIndex++) {
    var sidebarItem = tool[sidebarItemIndex],
				sidebarItemId = 'qui_' + sidebarItem.context.name;
		siderHtml.push('  <li class="frame_sidebar_nav_item js_sidebar_item">');
		siderHtml.push('    <a class="frame_sidebar_nav_link" href="#' + sidebarItemId + '">' + sidebarItem.context.name + '</a>');
		siderHtml.push('  </li>');
	}
	siderHtml.push('</ul>');

	siderHtml.push('</li>');


  mainHtml.push('<div class="dm_column">');
  mainHtml.push('  <h2 class="dm_column_title" id="' + id + '">' + title + '</h2>');

  for (var contentItemIndex = 0; contentItemIndex < tool.length; contentItemIndex++) {
    var contentItem = tool[contentItemIndex],
				contentItemId = 'qui_' + contentItem.context.name;

    mainHtml.push('<div class="dm_column_item tool_stage_item" data-showDetail=false data-groupIndex="' + i + '" data-itemIndex="' + contentItemIndex + '">');
    mainHtml.push('<h3 class="dm_column_item_title" id="' + contentItemId + '">' + contentItem.context.name + '</h3>');
    mainHtml.push('<p class="tool_stage_item_desc">' + contentItem.description + '</p>');

    if (contentItem.throw) {
      mainHtml.push('<p class="tool_stage_item_desc"><strong>注意：</strong>' + contentItem.throw + '</p>');
    }

    // 参数列表
    if (contentItem.deprecated) {
      mainHtml.push('<p class="tool_stage_item_desc"><strong>不推荐使用：</strong>' + contentItem.deprecated + '</p>');
    }

    mainHtml.push('<div class="dm_column_item_info dm_column_item_info_Single">');
    mainHtml.push('  <div class="dm_column_item_info_code"><pre><code class="scss">' + makeCompleteMethodWithItem(contentItem) + '</code></pre></div>');
    mainHtml.push('</div>');

    // 参数列表
    if (contentItem.parameter) {
      mainHtml.push('<div class="tool_stage_para">');
      mainHtml.push('  <div class="tool_stage_para_title">参数列表</div>');
      mainHtml.push('  <div class="tool_stage_para_cnt">');

      var paraList = contentItem.parameter;
      for (var paraIndex = 0; paraIndex < paraList.length; paraIndex++) {
        var paraItem = paraList[paraIndex];
        mainHtml.push('<div class="tool_stage_para_item">');
        mainHtml.push('<div class="tool_stage_item_para_data"><strong>$' + paraItem.name + '</strong><span class="tool_stage_paraType">' + paraItem.type + '</span>');
        if (paraItem.defaultValue) {
          mainHtml.push('<span class="tool_stage_paraDefaultValue">Default: ' + paraItem.defaultValue + '</span>');
        }
        mainHtml.push('</div>');
        mainHtml.push('<div class="tool_stage_item_para_data">' + paraItem.description + '</div>');
        mainHtml.push('</div>');
      }
      mainHtml.push('  </div>');
      mainHtml.push('</div>');
    }

    // 例子
    if (contentItem.example) {
      var exampleList = contentItem.example;
      mainHtml.push('<div class="tool_stage_example">');
      mainHtml.push('  <div class="tool_stage_example_title">示例</div>');
      for (var exampleIndex = 0; exampleIndex < exampleList.length; exampleIndex++) {
        var exampleItem = exampleList[exampleIndex];
        mainHtml.push('  <div class="dm_column_item_info dm_column_item_info_Single">');
        mainHtml.push('    <div class="dm_column_item_info_code"><pre><code class="bash">' + exampleItem.code + '</code></pre></div>');
      }
      mainHtml.push('  </div>');
      mainHtml.push('</div>');
    }
    mainHtml.push('</div>');
  }

	mainHtml.push('</div>');

}

document.getElementById('toolSidebarNav').innerHTML = document.getElementById('toolSidebarNav').innerHTML + siderHtml.join('');
document.getElementById('toolMain').innerHTML = document.getElementById('toolMain').innerHTML + mainHtml.join('');

// 展开/收起方法实现详情
$('.tool_stage .dm_column_item_info_code').on('click', function() {
	var groupIndex = $(this).parent().parent().data('groupindex'),
			itemIndex = $(this).parent().parent().data('itemindex');

  if (typeof groupIndex !== 'undefined' && typeof itemIndex !== 'undefined') {
    // 序号允许为0，因此不能直接判断 groupIndex && itemIndex
    var item = comments[groupIndex][itemIndex],
        codeContent = null;

    if (!$(this).data('showDetail')) {
      var itemCode = comments[groupIndex][itemIndex].context.code.replace(/^\n/, '');
      codeContent = hljs.highlight('scss', makeCompleteMethodWithItem(item, itemCode));
      $(this).html('<pre><code class="scss hljs">' + codeContent.value + '</code></pre>');
      $(this).data('showDetail', true);
    } else {
      codeContent = hljs.highlight('scss', makeCompleteMethodWithItem(item));
      $(this).html('<pre><code class="scss hljs">' + codeContent.value + '</code></pre>');
      $(this).data('showDetail', false);
    }
  }
});

// 默认调用一次代码高亮方法
hljs.initHighlightingOnLoad();
