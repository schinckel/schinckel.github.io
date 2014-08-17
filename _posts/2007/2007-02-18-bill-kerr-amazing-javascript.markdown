--- 
wordpress_id: 1103
layout: post
title: "Bill Kerr: amazing javascript"
time: "13:08:40"
date: 2007-02-18 13:08:40
tags: 
- javascript
wordpress_url: http://schinckel.net/2007/02/18/bill-kerr-amazing-javascript/
---
[Bill Kerr: amazing javascript][1] This is a fairly cool script. It makes all of the images on a page fly around. What's neat is how smooth everything is. It wasn't too long ago that machines didn't have the power to do this. [try on this page][2]

   [1]: http://billkerr2.blogspot.com/2006/10/amazing-javascript.html
   [2]: javascript:R=0; x1=.1; y1=.05; x2=.25; y2=.24; x3=1.6; y3=.24; x4=300; y4=200; x5=300; y5=200; DI=document.getElementsByTagName('img'); DIL=DI.length; function A(){for(i=0; i-DIL; i++){DIS=DI[ i ].style; DIS.position='absolute'; DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+'px'; DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+'px'}R++}setInterval('A()',5); void(0);

