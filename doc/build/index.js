/*
combined files : 

kg/shootGame/2.0.0/index

*/
/**
 * @射击类游戏基础组件 
 * @author xiaowuming<xiaowuming@gmail.com>
 * @module shootGame
 **/
KISSY.add('kg/shootGame/2.0.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    var undef = undefined;
    /**
     * 
     * @class ShootGame
     * @constructor
     * @extends Base
     */
    function ShootGame(Jnode,config) {
        var self = this;
        //调用父类构造函数
        ShootGame.superclass.constructor.call(self, config);
        
        var self = this;
		self.Jnode = Jnode;
		self.config = config;
		self._init();
    }
    S.extend(ShootGame, Base, /** @lends ShootGame.prototype*/{
		//最大击中数
		_maxHit:1,
		/**
		 * 初始化
		 */
		_init:function(){
			var self = this,
				box = $(self.Jnode),
				items = box.all('li');
			
			self.reset();
			
			var maxHit = self.config.maxHit;
			//击中数大于最大数量
			if(maxHit > items.length-10){
				S.log('---===击中数大于或接近于最大数量，无法继续！===---');
				return;
			}
			
			self._maxHit = maxHit;
			//li集合
			self.map = {};
			//每排数量
			self.col = parseInt(box.width()/items.width(),10);
			//每列数量
			self.row = Math.ceil(items.length/self.col);
			//行的起始
			var _row = -1;
			//遍历
			S.each(items,function(item,i){
				//当前列
				var curCol = i%self.col;
				if(curCol == 0){
					_row++; 
				}
				//计算当前行
				var curRow = _row,
					//当前Item的唯一标识符
					key = curRow+'-'+curCol;
					
				item.i = i;

				self.map[key] = item;
				//当触发点击事件
				item.onclick = function(){
					self.reset();
					item.className += ' on cur';
					var whiteList = self.getRange(item,curRow,curCol,key);
					
					var hitList = self._random(whiteList,self._maxHit-1),
						n,
						len = hitList.length;
					
					var hits = [item];
					for(n=0;n<len;n++){
						var dom = self.map[hitList[n]];
						if(dom != undef){
							dom.className += ' on';
							hits.push(dom);
						}
					}
					
					self._onclick(item,hits);
				};		
			});
		},
		/**
		 * 获取范围
		 * 计算可以被选择的范围，根据这些范围可以设置样式和事件
		 * curDom 当前点击的对象
		 * curRow 当前行
		 * curCol 当前列
		 * key 当前Item的唯一标识符
		 **/
		getRange:function(curDom,curRow,curCol,key){
			var self = this,
				map = self.map,
				col = self.col,
				row = self.row;

			//应取圈数
			var circle = 0,
				n = 1;
			if(self._maxHit > 1){
				for(n = 1;n<2.0.0;n++){
					var t = n*2+1;
					if(t * t >= self._maxHit){
						circle = n;
						break;
					}
				}
			}

			var top = curRow-circle,
				left = curCol-circle,
				bottom = curRow + circle,
				right = curCol + circle;

			var maxCircle = circle*2+1;
			if(maxCircle > col){
				circle += Math.ceil((maxCircle-col)*maxCircle/col);
				left = 0;
				right = col-1;
			}else{
				if(left<0){
					right += -left;
					left = 0;
				}
				if(right >= col){
					left -= right - col + 1;
					right = col;
				}
			}

			if(maxCircle > row){
				circle += Math.ceil((maxCircle-row)*maxCircle/row);
				top = 0;
				bottom = row-1;
			}else{
				if(top<0){
					bottom += -top;
					top = 0;
				}
				if(bottom >= row){
					top -= bottom - row + 1;
					bottom = row;
				}
			}


			//可被击中的列表//白名单
			var whiteList = [];
			for(var t=top;t<bottom+1;t++){
				for(var l=left;l<right+1;l++){
					var _key = t+'-'+l;
					if(key != _key && t<row && l<col && t>-1 && l>-1 && map[_key]){
						whiteList.push(_key);
					}					
				}
			}

			return whiteList;
		},
		/**
		 * 从数组中随机获取指定数量的组
		 * @param {Object} list
		 * @param {Object} count
		 */
		_random:function(list,count){
			var res = [],
				i;
			for (i=0;i<count;i++){ 
				var index=Math.floor(Math.random()*list.length); //随机取一个位置 
				res.push(list[index]);
				list.splice(index,1);
			}
			return res; 
		},
		/**
		 * 重置
		 */
		reset:function(){
			$(this.Jnode).all('.on').removeClass('on').removeClass('cur');
		},
		/**
		 * 当点击事件发送时
		 * @param {Object} curDom
		 * @param {Object} hitList
		 */
		_onclick:function(curDom,hitList){
			if(this.config.onShootComplete != undef){
				this.config.onShootComplete(curDom,hitList);
			}
		}
		
    }, {ATTRS : /** @lends ShootGame*/{

    }});
    return ShootGame;
}, {requires:['node', 'base']});




