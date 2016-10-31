<a href="http://liriliri.github.io/eruda/" target="_blank">
    <img src="http://7xn2zy.com1.z0.glb.clouddn.com/github_eruda2.jpg">
</a>

[中文](https://github.com/liriliri/eruda/blob/master/doc/Readme_CH.md)

# Eruda

[![npm version](https://badge.fury.io/js/eruda.svg)](https://badge.fury.io/js/eruda)

Console for Mobile Browsers.

![Eruda](http://7xn2zy.com1.z0.glb.clouddn.com/eruda_screenshot3.jpg)

## Why

Logging things out on mobile browser is never an easy stuff. I used to include
`window onerror alert` script inside pages to find out JavaScript errors, kind
of stupid and inefficient. Desktop browser DevTools is great, and I wish there
is a similar one on mobile side, which leads to the creation of Eruda.

## Demo

![Demo](http://7xn2zy.com1.z0.glb.clouddn.com/eruda_qrcode2.png)

Browse it on your phone: [http://liriliri.github.io/eruda/](http://liriliri.github.io/eruda/)

In order to try it for different sites, execute the script below on browser address bar.

```javascript
javascript:(function () { var script = document.createElement('script'); script.src="//liriliri.github.io/eruda/eruda.min.js"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();
```

## Features

* [Console](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#console): Display JavaScript logs.
* [Elements](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#elements): Check dom state.
* [Network](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#network): Show performance timing, ajax requests status.
* [Resource](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#resources): Show localStorage, cookie information.
* [Info](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#info): Show url, user agent info.
* [Snippets](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#snippets): Include snippets used most often.
* [Sources](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#sources): Html, js, css source viewer.
* [Features](https://github.com/liriliri/eruda/blob/master/doc/Tool_Api.md#features): Browser feature detections.

## Install

You can get it on npm.

```bash
npm install eruda --save
```

Add this script to your page.

```html
<script src="node_modules/eruda/eruda.min.js"></script>
<script>eruda.init();</script>
```

It's also available on [jsDelivr](http://www.jsdelivr.com/projects/eruda) and [cdnjs](https://cdnjs.com/libraries/eruda).

```html
<script src="//cdn.jsdelivr.net/eruda/1.0.5/eruda.min.js"></script>
<script>eruda.init();</script>
```

The JavaScript file size is quite huge(about 80kb gzipped) and therefore not
suitable to include in mobile pages. It's recommended to make sure eruda is
loaded only when eruda is set to true on url(http://example.com/?eruda=true),
for example:

```javascript
(function () {
    var src = 'node_modules/eruda/eruda.min.js';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();
```

## Configuration

When initialization, a configuration object can be passed in.

* container: Container element. If not set, it will append a element directly
under html root element.
* tool: Choose which default tools you want, by default all will be added.

```javascript
var el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
    container: el,
    tool: ['console', 'elements']
});
```

## Plugins

It is possible to enhance Eruda with more features by writing plugins. Check
source code of plugins below to learn how to write your own custom tool panels.

* [eruda-fps](https://github.com/liriliri/eruda-fps): Display page fps info.

> When writing plugins, you can use utilities exposed by Eruda, see
[docs](https://github.com/liriliri/eruda/blob/master/doc/Util_Api.md) here.

## Related Projects

* [eustia](https://github.com/liriliri/eustia): Generator of eruda's utility library.
* [freego](https://github.com/surunzi/freego): Http redirect proxy injecting eruda on every page.

## License

Eruda is released under the MIT license. Please see
[LICENSE](https://opensource.org/licenses/MIT) for full details.
