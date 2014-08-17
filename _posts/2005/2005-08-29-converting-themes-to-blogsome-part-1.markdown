--- 
wordpress_id: 398
layout: post
title: Converting Themes to Blogsome, Part 1
time: "22:01:46"
date: 2005-08-29 22:01:46
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/08/29/converting-themes-to-blogsome-part-1/
---
This is the first post in a series that will deal with Blogsome theme conversions. Part 2 can be found at [Blogsome Themes, part 2][1].  To begin with, you will need the following things: 

  * A blog created with [Blogsome][2]. I suggest that if you already have a blog that has posts on it, you create a new one, just to tweak until the theme is just right. That way, your real blog will continue to work, no matter what. I'll assume you have a Blogsome blog to test on, and know a bit about the backend (Dashboard, and where to find the various options/tools).
  * The files required for your theme. [Alex King][3] has a great [list of themes][4], and runs competitions occasionally, so go visit there if you want to find one, and don't have one already.
  * [Firefox][5], with the [EditCSS][6] extension installed, or the [EditCSS][7] bookmark
  * Patience

You should also bookmark the following sites:

  * The [WordPress Codex][8], especially [Template Tags][9]
  * The [Smarty documentation][10]
  * The Blogsome [Forums][11]

I will use the following conventions in this document: 

  * Button: a button that you click on. Will look different in each browser - usually it looks like the buttons in your Operating System, but not always.
  * Links that you need to click on will be **bold**.
  * Code that you modify will either look like `this` or this
  * Filenames will look like `this`.
  * Important, or unusual terms will be _italic_.

Converting a WordPress theme to Blogsome is not always easy, but is very rewarding, and you may learn something along the way. Finally, whilst I have gone to a lot of effort to ensure everything in this document is correct, I take no responsibility for any data loss. You should not have been working on your 'proper' blog anyway;). 

### Starting: Upload Image Files

Okay, let's get started. The first thing you will want to do is upload all of your image files to your Blogsome blog. This is a much more time consuming process on Blogsome, as there is no automated way to do it. Under normal WordPress installations, you can usually FTP into the server, and dump all of the files you need. We need to click on the **Upload** button in the backend, and then on the Browse... button. Navigate to where the images you have as part of the theme are on your computer, and select the first one. Click the Upload button. When the page loads, record the information it gives you in a place you won't lose it. Blogsome doesn't provide the ability to look at lists of images, so if you forget it, you'll need to try by trial and error to find it. Most of the images will have names that aren't mangled by Blogsome's server, so you should end up with a list of files like: `/images/header.jpg /images/search.png /images/logo.gif` What files you have will really depend on the theme you are using. There are some standard file names, but don't expect them to be the same as everywhere else! 

### Update Style Sheet

You now are ready to insert your _Style Sheet_ data. In the backend, click on **Manage**, and then on **Files**. Scroll down to the bottom of the page, and click on **Site Style Sheet**. After a few seconds, your Style Sheet will appear in the text editing box. We need to replace the entire contents of the text view with the contents of the theme's stylesheet. This could have one of several names: typically it will end in `.css`, and more than likely it will be the only one. `wp-layout.css`, `stylesheet.css` and `style.css` are all likely candidates. We now need to examine the Style Sheet, and replace all instances of image filenames with their equivalent URL on your server. You can use relative URLs, so if you find something that looks like: 
    
{% highlight css linenos %}
        background:url(img/content_bg.gif) repeat;
{% endhighlight %}

You will want to make it look like: 
    
{% highlight css linenos %}
        background:url(/images/content_bg.gif) repeat;
{% endhighlight %}

You need to ensure you get every filename - otherwise the correct images will not appear! When you are done, you must save your changes. The Update Template! button will do this nicely. Righto! That's the easy parts done. Next time, you will learn which _template files_ Blogsome uses, and what data needs to go into each of them. You will also learn how to convert a _PHP function_ to _Smarty Tags_. The next part of this article can be found at [Blogsome Themes, part 2][1]. 

   [1]: http://schinckel.net/2005/09/06/blogsome-themes-part-2/
   [2]: http://www.blosome.com
   [3]: http://www.alexking.org
   [4]: http://www.alexking.org/index.php?content=software/wordpress/themes.php
   [5]: http://www.getfirefox.org
   [6]: https://addons.mozilla.org/extensions/moreinfo.php?application=firefox&category=Developer%20Tools&numpg=10&id=179
   [7]: javascript:(function()%7Bfunction%20init()%7Bvar%20newline=unescape(%22%25%22+%220A%22),importCount=0,L=%5B%5D;dead=false;oldCSS=null;x=opener;ta=document.f.ta;ta.select();if(x.editStyles)%7Bta.value=x.editStyles.innerHTML;update();return;%7Dta.value=%22/*%20Type%20CSS%20rules%20here%20and%20they%20will%20be%20applied%22+newline+%22to%20pages%20from%20'%22+location.host+%22'%22+newline+%22immediately%20as%20long%20as%20you%20keep%20this%20window%20open.%20*/%22+newline+newline;function%20add(s)%7Bif(!s.disabled)%7Bvar%20y=%7Bsheet:s,readable:true,label:%22Imported%22,inline:false,shorturl:%22%22,fulltext:%22%22%7D;try%7Bfor(var%20k=0,m;m=s.cssRules%5Bk%5D;++k)if(m.type==3)add(m.styleSheet);%7Dcatch(er)%7By.readable=false;%7DL.push(y);if(s.ownerNode)%7By.label=s.ownerNode.tagName.toUpperCase()+%22-tag%22;if(!s.ownerNode.getAttribute(%22src%22)&&!s.ownerNode.href)y.inline=true;%7Dif(y.inline)%7By.label=%22Inline%20%22+y.label;y.fulltext=fix(s.ownerNode.innerHTML);%7Delse%20if(s.href.substr(0,13)==%22data:text/css%22)%7By.shorturl=%22%20contained%20in%20a%20data:%20URL%22;y.fulltext=fix(unescape(s.href.slice(14)));%7Delse%7B++importCount;y.importtext=%22@import%20%5C%22%22+s.href+%22%5C%22;%22;y.shorturl=%22%20%22+s.href.split('/').reverse()%5B0%5D;if(!y.readable)%7By.fulltext=%22/*%20Out-of-domain;%20imported%20above.%20*/%22;%7Delse%20if(s.href.substr(0,5)!=%22http:%22)%7By.fulltext=%22/*%20Non-http;%20imported%20above.%20*/%22;%7Delse%7Bvar%20loadingText=%22/*%20Loading%20(%22+(L.length-1)+%22)%20*/%22;y.fulltext=loadingText;var%20p=new%20XMLHttpRequest();p.onload=function(e)%7Bta.value=ta.value.replace(y.importtext+newline,%22%22);y.fulltext=p.responseText;ta.value=ta.value.replace(loadingText,fix(y.fulltext));ta.value=ta.value.replace(firstNote+newline,%22%22);%7D;p.open(%22GET%22,s.href);p.send(null);%7D%7D%7D%7Dfunction%20fix(s)%7Bwhile((s%5B0%5D==newline)&&s.length%3E1)s=s.slice(1);while((s%5Bs.length-1%5D==newline)&&s.length%3E1)s=s.substr(0,s.length-1);s=s.replace(/@import.*;/ig,function()%7Breturn%20%22/*%20%22+RegExp.lastMatch+%22%20*/%22;%7D);return%20s;%7Dfor(var%20i=0,ss;ss=x.document.styleSheets%5Bi%5D;++i)add(ss);var%20imports=%22%22,main=%22%22;var%20firstNote=%22/****%20Style%20sheets%20whose%20contents%20could%20be%20loaded%20were%20****/%22+newline+%22/****%20imported%20instead.%20%20Rule%20order%20may%20be%20incorrect%20%20%20****/%22+newline+%22/****%20as%20a%20result.%20****/%22+newline;if(importCount)%7Bta.value+=firstNote;%7Dfor(var%20i=0;ss=L%5Bi%5D;++i)%7Bif(ss.importtext)%7Bimports+=ss.importtext+newline;%7Dmain+=%22/****%20%22+ss.label+%22%20style%20sheet%22+ss.shorturl+%22%20****/%22+newline;main+=newline;main+=ss.fulltext;main+=newline;main+=newline;main+=newline;%7Dta.value+=imports+newline+main;update();%7Dfunction%20update()%7Btry%7Bif(!x%7C%7Cx.closed)%7Bta.style.backgroundColor=%22%23ddd%22;return;%7Dx.editStyles;%7Dcatch(er)%7Bta.style.backgroundColor=%22%23fdc%22;setTimeout(update,150);dead=true;return;%7Dif(dead)%7Bdead=false;ta.style.backgroundColor=%22%22;oldCSS=null;%7Dif(!x.editStyles)%7Bvar%20newSS;newSS=x.document.createElement(%22style%22);newSS.type=%22text/css%22;x.document.getElementsByTagName(%22head%22)%5B0%5D.appendChild(newSS);x.editStyles=newSS;oldCSS=null;for(var%20i=0,ss;ss=x.document.styleSheets%5Bi%5D;++i)ss.disabled=true;%7Dif(oldCSS!=ta.value)%7BoldCSS=ta.value;x.editStyles.innerHTML=ta.value;%7DsetTimeout(update,150);%7Dy=open('','','resizable,scrollbars=yes,width=550,height=520');y.document.write('%3Ctitle%3EEdit%20Styles%3C/title%3E%3Cstyle%3E.ec%20%7B%20width:%20100%25;%20height:%20100%25;%20border:%20none;%20margin:%200px;%20padding:%200px;%20%7D%3C/style%3E%3Cbody%20class=%22ec%22%3E%3Cform%20name=%22f%22%20style=%22margin:%200px;%22%20class=%22ec%22%3E%3Ctextarea%20name=%22ta%22%20wrap=%22soft%22%20style=%22margin:%200px;%20border:%200px;%20width:100%25;%20height:100%25;%22%20class=%22ec%22%3E%3C/textarea%3E%3Cscript%3E'+update+init+'init();%3C'+'/script%3E');y.document.close();%7D)()
   [8]: http://codex.wordpress.org
   [9]: http://codex.wordpress.org/Template_Tags
   [10]: http://smarty.php.net/manual/en/
   [11]: http://www.blogsome.com/forum/index.php

