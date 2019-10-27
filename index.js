$(function () {

  var initHeight = 200, // 初始高度
    usedWidth = 0, // 当前行已占用宽度
    winWidth = $(window).width() - 20, // 可视区的宽(减去滚动条的宽)
    num = 0, // 当前行图片数量
    img = []; // 图片

  var wrapper = $(".wrapper");


  // 初始化
  (function () {
    for (var i = 0; i < 30; i++) {
      addPic();
    }
  }())

  // 页面滚动事件
  $(window).scroll(function () {
    // 如果文档高度 - 滚动条距离 < 1500,则添加图片
    if ($(document).height() - $(window).scrollTop() < 1500) {
      addPic();
    }
  })

  // 窗口可视区宽度改变事件
  $(window).resize(function () {
    // 当可视区宽度改变时重新排列图片，并回到顶部
    if (winWidth !== $(window).width()) {
      winWidth = $(window).width(); // 重新获取可视区的宽
      $(document).scrollTop(0);
      usedWidth = 0; // 重新设置当前行已占用宽度
      num = 0; // 重新设置当前行图片数量
      for (var i = 0; i < img.length; i++) {
        setPic(i);
      }
    }
  })

  // 添加新图片
  function addPic() {
    var len = img.length;
    var width = parseInt(Math.random() * 100 + 100); // 图片的宽，100 - 200 之间随机数
    var height = parseInt(Math.random() * 100 + 100); // 图片的高，100 - 200 之间随机数
    var url = "http://placekitten.com/" + width + "/" + height; // 图片的url
    img[len] = $("<img src='" + url + "'>"); // 创建图片
    img[len].w = width; // 当前图片的宽
    img[len].h = height; // 当前图片的高
    wrapper.append(img[len]); // 插入图片
    setPic(len);
  }

  // 排列图片
  function setPic(index) {
    var canUseWidth = winWidth - 17 - num * 4; //当前行可用宽度（可视区宽度 - margin）
    var width = img[index].w * initHeight / img[index].h; // 当height为initHeight时，当前图片将占用的宽度
    var lastWidth = canUseWidth - usedWidth; // 当前行剩余宽度
    // 如果该图片不是第一张图片并且当前行有足够宽度放下这张图片
    if (num && width < lastWidth) {
      num++;
      usedWidth += width; // 更新已占有宽度
    } else {
      var height = initHeight * canUseWidth / usedWidth; // 重新设置当前行高度
      // 遍历当前行
      for (var i = index - num; i < index; i++) {
        img[i].height(height); // 设置图片高
        img[i].width(img[i].w * height / img[i].h); // 设置图片宽
      }
      num = 1;
      usedWidth = width; // 更新已用宽
    }
  }

})