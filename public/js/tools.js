'use strict';

/**
 * @hughkli, Kayo 动态生成工具方法tools.html的DOM内容
 */

// 利用 SASS 方法的 item 数据拼接方法声明
var makeCompleteMethodWithItem = function(item) {
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
  result += ' { ... }';

  return result;
};

var siderHtml = [],     // 侧栏
    mainHtml = [];      // 主体

for (var i = 0, llength = comments.length; i < llength; i++) {
	var tool = comments[i],
      title = tool[0].group, // 使用第一个方法的分组作为该组标题
      id = 'qui_' + tool[0].context.name; // 使用第一个方法的名称加 qui 前缀作为该组 id
	siderHtml.push('<li class="frame_sidebar_nav_item">');
	siderHtml.push('<a class="frame_sidebar_nav_link" href="#' + id + '">' + title + '</a>');
	siderHtml.push('</li>');


  mainHtml.push('<div class="dm_column">');
  mainHtml.push('  <h2 class="dm_column_title" id="' + id + '">' + title + '</h2>');

  for (var itemIndex = 0; itemIndex < tool.length; itemIndex++) {
    var item = tool[itemIndex];
    mainHtml.push('<div class="dm_column_item tool_stage_item">');
    mainHtml.push('<h3 class="dm_column_item_title">' + item.context.name + '</h3>');
    mainHtml.push('<p class="tool_stage_item_desc">' + item.description + '</p>');
    mainHtml.push('<div class="dm_column_item_info dm_column_item_info_Single">');
    mainHtml.push('  <div class="dm_column_item_info_code"><xmp class="prettyprint">' + makeCompleteMethodWithItem(item) + '</xmp></div>');
    mainHtml.push('</div>');

    // 参数列表
    if (item.parameter) {
      mainHtml.push('<div class="tool_stage_para">');
      mainHtml.push('  <div class="tool_stage_para_title">参数列表</div>');
      mainHtml.push('  <div class="tool_stage_para_cnt">');

      var paraList = item.parameter;
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
    if (item.example) {
      var exampleList = item.example;
      mainHtml.push('<div class="tool_stage_example">');
      mainHtml.push('  <div class="tool_stage_example_title">示例</div>');
      for (var exampleIndex = 0; exampleIndex < exampleList.length; exampleIndex++) {
        var exampleItem = exampleList[exampleIndex];
        mainHtml.push('  <div class="dm_column_item_info dm_column_item_info_Single">');
        mainHtml.push('    <div class="dm_column_item_info_code"><xmp class="prettyprint">' + exampleItem.code + '</xmp></div>');
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
