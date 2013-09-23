## 综述

shootGame是。

* 版本：1.0
* 作者：xiaowuming
* demo：[http://gallery.kissyui.com/shootGame/1.0/demo/index.html](http://gallery.kissyui.com/shootGame/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/shootGame/1.0/index', function (S, ShootGame) {
         var shootGame = new ShootGame(Jnode,config);
    })

## API说明
* 参数1：Kissy选择器，如：'#test' || $('#test')
* 参数2：配置项
	maxHit: 最大命中数量，如:1|2
	onShootComplete：当射击完成 如function(a,b){
		a:当前命中的中心点的元素(curDom)
		b:使用命中点的元素数组([dom1,dom2,dom3])
	}


