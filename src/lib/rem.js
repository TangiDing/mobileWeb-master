var isIphone = window.navigator.userAgent.match(/iphone/i);
var dpr = isIphone ? window.devicePixelRatio : 1;
var scale = 1 / dpr;
var docEl = document.documentElement;
var rem;

// 1px问题处理
function setMetaContent(ele, scale) {
  ele.setAttribute("content", "width=device-width,"
    + "initial-scale=" + scale
    + ", maximum-scale=" + scale
    + ", minimum-scale=" + scale);
}
var metaEle = document.querySelector("meta[name='viewport']")
if (metaEle) {
  setMetaContent(metaEle, scale)
} else {
  var newMetaEle = document.createElement("meta");
  newMetaEle.name = "viewport";
  setMetaContent(newMetaEle, scale);
  if (document.head) {
    document.head.appendChild(newMetaEle)
  } else {
    var div = document.createElement("div");
    div.appendChild(newMetaEle);
    document.write(div.innerHTML)
  }
}

// css钩子，可以处理图片或者字体大小
docEl.setAttribute('data-dpr', dpr);

function setRem() {
  var viewportWidth = docEl.getBoundingClientRect().width;
  // 最大视口限制
  if(viewportWidth / dpr > 480) {
     viewportWidth = 480 * dpr;
  }
  rem = viewportWidth / 10;
  docEl.style.fontSize = rem + "px"
}

var tid;
window.addEventListener("resize", function () {
  clearTimeout(tid);
  tid = setTimeout(setRem, 300);
})

// 页面返回执行
window.addEventListener("pageshow", function (e) {
  if(e.persisted) {
    clearTimeout(tid);
    tid = setTimeout(setRem, 300);
  }
})


setRem()