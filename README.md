# jQuery实现木桶布局
---
### 大概思路：
设定一个初始高度，
获取每张图片的原始宽高，在不改变宽高比的条件下根据设定的初始高度计算每行可以放下多少张图片，当这一行放不下图片时，根据行的宽度和图片的总宽度的更改此行图片的高度，使之能刚好充满当前行，并将图片放到下一行，以此类推。

待完善：改变可视区width时，则需重新排列图片

>获取图片方法：  
网址：[http://placekitten.com](http://placekitten.com)  
使用方法：http://placekitten.com/宽/高/（彩色） 或 http://placekitten.com/g/宽/高/ （黑白）  
例如：[http://placekitten.com/200/300](http://placekitten.com/200/300)
---
### 详细代码：
#### 一、变量声明，获取元素
```
  var initHeight = 200, // 初始高度
    usedWidth = 0, // 当前行已占用宽度
    winWidth = $(window).width(), // 可视区的宽
    img = []; // 图片
  var wrapper = $(".wrapper");
```
#### 二、需要用到的方法
##### 1.获取图片的width、height和url
```
  function getImg() {
    var info = {}; // 图片信息（kwidth, height, url）
    info.width = parseInt(Math.random() * 400 + 100); // 生成 100 - 500 之间随机数
    info.height = parseInt(Math.random() * 400 + 100); // 生成 100 - 500 之间随机数
    info.url = "http://placekitten.com/" + info.width + "/" + info.height;
    return info;
  }
```
##### 2.判断图片位置、高度，并向页面中添加图片
```
  function addPic() {
    var tr = img.length; // 行数
    var td = tr ? img[tr - 1].length : 0; //当前行图片数
    var info = getImg(); //图片信息
    var canUseWidth = winWidth - 40 - td * 4; //当前行可用宽度（可视区宽度 - margin）
    image = $("<img src='" + info.url + "'>"); // 创建图片
    var width = info.width * initHeight / info.height; // 当height为initHeight时，当前图片将占用的宽度
    var lastWidth = canUseWidth - usedWidth; // 当前行剩余宽度
    // 如果该图片不是第一张图片并且当前行有足够宽度放下这张图片
    if (usedWidth && width < lastWidth) {
      usedWidth += width; // 更新已占有宽度
      img[tr - 1][td] = image; // 把当前图片存到img中
      img[tr - 1][td].w = info.width; // 当前图片的宽
      img[tr - 1][td].h = info.height; // 当前图片的高
    } else {
      var height = initHeight * canUseWidth / usedWidth; // 重新设置当前行高度
      // 遍历当前行
      $.each(img[tr - 1], function (index, item) {
        item.height(height); // 设置图片高
        item.width(item.w * height / item.h); // 设置图片宽
        wrapper.append(item); // 插入图片
      })
      usedWidth = width; // 更新已用宽
      img[tr] = [];
      img[tr][0] = image; // 把当前图片存到img中
    }
  }
```
##### 3.初始化，像页面中添加30张图片
```
  (function () {
    for (var i = 0; i < 30; i++) {
      addPic();
    }
  }())
```
#### 三、事件
##### 1.页面滚动事件，如果文档高度 - 滚动条距离 < 1500,则添加图片
```
  $(window).scroll(function () {
    if ($(document).height() - $(window).scrollTop() < 1500) {
      addPic();
    }
  })
```