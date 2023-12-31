// ==UserScript==
// @name         爆杀网络阴阳人
// @namespace    http://tampermonkey.net/
// @version      0.34
// @description  屏蔽那些阴阳怪气的言论！还世界一个清净。
// @author       K@M0me
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @source      https://github.com/MakinoharaShoko/NoYYGQ
// @include     https://www.bilibili.com/*
// @include     https://www.zhihu.com/*
// @include     https://space.bilibili.com/*
// @include     https://tieba.baidu.com/*
// @include     https://www.weibo.com/*
// @include     https://weibo.com/*
// @require file://d://project//NoYYGQ/block.json 
 
// @grant        none
// ==/UserScript==
'use strict';
let blackList = [];
fetch("https://raw.githubusercontent.com/meowrain/NoYYGQ/main/block.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    blackList = data.blockedWords;
    console.log(blackList);
  }).catch((err) => {
    console.log(err);
  });
 
const siteList = ['.j_th_tit','.d_post_content j_d_post_content','.t_con', '.p_content', '.lzl_cnt', '.CommentRichText', '.RichContent-inner', '.text', '.text-con', '.WB_text W_f14', '.WB_text', '.reply-content'];
(function () {
  function debounce(fn, wait) {
    const timeout = null;
    return function () {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
  }
  // 处理函数
  function handle() {
    for (let j = 0; j < siteList.length; j++) {
      document.querySelectorAll(siteList[j]).forEach(function (item) {
        const str = item.textContent;
        for (let i = 0; i < blackList.length; i++) {
          const r = new RegExp(blackList[i]);
          const res = r.test(str);
          if (res) {
            // 找到就删除该信息流
            console.log(blackList[i] + " FOUND");
            item.style.borderRadius = "4px";
            item.style.color = "rgba(0,0,0,0)";
            item.style.background = `rgba(0,92,175,0.3)`;
            // item.remove();
            item.addEventListener("mouseover", function (event) {
              item.style.color = "black";
              item.style.background = "none";
            });
            item.addEventListener("mouseout", function (event) {
              item.style.borderRadius = "4px";
              item.style.color = "rgba(0,0,0,0)";
              item.style.background = `rgba(0,92,175,0.3)`;
            });
          }
        }
      });
    }
  }
  // 滚动事件
  window.addEventListener("scroll", debounce(handle, 1000));
})();