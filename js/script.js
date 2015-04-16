(function($){
  var toTop = $('#toTop').offset().top - $(window).height() + 20;

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="http://v.t.sina.com.cn/share/share.php?title=' + encodedUrl + '" class="fa fa-weibo article-share-google" target="_blank" title="新浪微博"></a>',
            '<a href="http://share.renren.com/share/buttonshare?link=' + encodedUrl + '" class="fa fa-renren article-share-facebook" target="_blank" title="人人网"></a>',
            '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '" class="fa fa-qq article-share-twitter" target="_blank" title="QQ空间"></a>',
            '<a href="http://v.t.qq.com/share/share.php?title=' + encodedUrl + '" class="fa fa-tencent-weibo article-share-twitter" target="_blank" title="腾讯微博"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Profile card
  $(document).on('click', function () {
    $('#profile').removeClass('card');
  }).on('click', '#profile-anchor', function (e) {
    e.stopPropagation();
    $('#profile').toggleClass('card');
  }).on('click', '.profile-inner', function (e) {
    e.stopPropagation();
  });

  // To Top
  $(document).on('scroll', function () {
    if ($(document).width() >= 800) {
      if($(this).scrollTop() > toTop) {
        $('#toTop').addClass('fix');
        $('#toTop').css('left', $('#sidebar').offset().left);
      } else {
        $('#toTop').removeClass('fix');
      }
    } else {
      $('#toTop').addClass('fix');
      $('#toTop').css('right', 20);
    }
  }).on('click', '#toTop', function () {
    $(document).scrollTop(0);
  });

})(jQuery);



function WeiXinShareBtn() { 
 if (typeof WeixinJSBridge == "undefined") { 
 alert("请先通过微信搜索 wow36kr 添加36氪为好友，通过微信分享文章 "); 
 } else { 
 WeixinJSBridge.invoke('shareTimeline', { 
 "title": "36氪", 
 "link": "http://www.36kr.com", 
 "desc": "关注互联网创业", 
 "img_url": "http://www.36kr.com/assets/images/apple-touch-icon.png" 
 }); 
 } 
 }