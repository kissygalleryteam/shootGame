/*! shootGame - v1.0 - 2013-09-24 1:04:25 AM
* Copyright (c) 2013 xiaowuming; Licensed  */
KISSY.add("gallery/shootGame/1.0/index",function(a,b,c){function d(a,b){var c=this;d.superclass.constructor.call(c,b);var c=this;c.Jnode=a,c.config=b,c._init()}var e=b.all,f=void 0;return a.extend(d,c,{_maxHit:1,_init:function(){var b=this,c=e(b.Jnode),d=c.all("li");b.reset();var g=b.config.maxHit;if(g>d.length-10)return a.log("---===\u51fb\u4e2d\u6570\u5927\u4e8e\u6216\u63a5\u8fd1\u4e8e\u6700\u5927\u6570\u91cf\uff0c\u65e0\u6cd5\u7ee7\u7eed\uff01===---"),void 0;b._maxHit=g,b.map={},b.col=parseInt(c.width()/d.width(),10),b.row=Math.ceil(d.length/b.col);var h=-1;a.each(d,function(a,c){var d=c%b.col;0==d&&h++;var e=h,g=e+"-"+d;a.i=c,b.map[g]=a,a.onclick=function(){b.reset(),a.className+=" on cur";var c,h=b.getRange(a,e,d,g),i=b._random(h,b._maxHit-1),j=i.length,k=[a];for(c=0;j>c;c++){var l=b.map[i[c]];l!=f&&(l.className+=" on",k.push(l))}b._onclick(a,k)}})},getRange:function(a,b,c,d){var e=this,f=e.map,g=e.col,h=e.row,i=0,j=1;if(e._maxHit>1)for(j=1;100>j;j++){var k=2*j+1;if(k*k>=e._maxHit){i=j;break}}var l=b-i,m=c-i,n=b+i,o=c+i,p=2*i+1;p>g?(i+=Math.ceil((p-g)*p/g),m=0,o=g-1):(0>m&&(o+=-m,m=0),o>=g&&(m-=o-g+1,o=g)),p>h?(i+=Math.ceil((p-h)*p/h),l=0,n=h-1):(0>l&&(n+=-l,l=0),n>=h&&(l-=n-h+1,n=h));for(var q=[],k=l;n+1>k;k++)for(var r=m;o+1>r;r++){var s=k+"-"+r;d!=s&&h>k&&g>r&&k>-1&&r>-1&&f[s]&&q.push(s)}return q},_random:function(a,b){var c,d=[];for(c=0;b>c;c++){var e=Math.floor(Math.random()*a.length);d.push(a[e]),a.splice(e,1)}return d},reset:function(){e(this.Jnode).all(".on").removeClass("on").removeClass("cur")},_onclick:function(a,b){this.config.onShootComplete!=f&&this.config.onShootComplete(a,b)}},{ATTRS:{}}),d},{requires:["node","base"]});