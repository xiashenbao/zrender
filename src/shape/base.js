/**
 * zrender : shape基类
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * desc:    zrender是一个轻量级的Canvas类库，MVC封装，数据驱动，提供类Dom事件模型。
 * author:  Kener (@Kener-林峰, linzhifeng@baidu.com)
 * 
 * 可配图形属性：
   {   
       // 基础属性，详见各shape
       shape  : {string},       // 必须，shape类标识，需要显式指定
       id     : {string},       // 必须，图形唯一标识，可通过zrender实例方法newShapeId生成
       zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
       invisible : {boolean},   // 默认为false，是否可见
       
       // 变换
       position : {array},  // 默认为[0, 0], shape的坐标
       rotation : {number|array},  // 默认为[0, 0, 0]，shape绕自身旋转的角度，不被translate 影响, 后两个值为旋转的origin
       scale : {array},         // 默认为[1, 1, 0, 0], shape纵横缩放比例，不被translate影响, 后两个值为缩放的origin
       
       // 样式属性，详见各shape，默认状态样式属性
       style  : {Object},
       
       // 样式属性，详见各shape，高亮样式属性，当不存在highlightStyle时使用默认样式扩展显示
       highlightStyle : {Object},
       
       // 交互属性，zrender支持，非图形类实现
       hoverable : {boolean},   // 默认为true，可悬浮响应，默认悬浮响应为高亮显示，可在onbrush中捕获并阻塞高亮绘画
       clickable : {boolean},   // 默认为false，可点击响应，影响鼠标hover时图标是否为可点击样式，为false则阻断点击事件抛出，为true可在onclick中捕获
       draggable : {boolean},   // 默认为false，可拖拽响应，默认拖拽响应改变图形位置，可在ondrift中捕获并阻塞默认拖拽行为

       // 事件属性
       onbrush : {Function}, // 默认为null，当前图形被刷画时回调，可用于实现自定义绘画
                 // 回传参数为：
                 // @param {2D Context} context 当前canvas context
                 // @param {Object} shape 当前shape
                 // @param {boolean} isHighlight 是否高亮
                 // @return {boolean} 回调返回true则不执行默认绘画 
       ondrift : {Function}, // 默认为null，当前图形被拖拽改变位置时回调，可用于限制拖拽范围
                 // 回传参数为：
                 // @param {Object} shape 当前shape
                 // @param {number} dx x方向变化
                 // @param {number} dy y方向变化
       onclick : {Function}, // 默认为null，当前图形点击响应，回传参数为：
                 // @param {Object} eventPacket 对象内容如下： 
                 // @param {string} eventPacket.type 事件类型，EVENT.CLICK
                 // @param {event} eventPacket.event 原始dom事件对象
                 // @param {Object} eventPacket.target 当前图形shape对象      
                 // @return {boolean} 回调返回true则阻止抛出全局事件
                               
       onmousewheel : {Function}, // 默认为null，当前图形上鼠标滚轮触发，回传参数格式同onclick，其中：
                      // 事件类型为confit.EVENT.MOUSEWHEEL
                      // @return {boolean} 回调返回true则阻止抛出全局事件
       
       onmousemove : {Function}, // 默认为null，当前图上形鼠标（或手指）移动触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEMOVE
                     // @return {boolean} 回调返回true则阻止抛出全局事件
       
       onmouseover : {Function}, // 默认为null，鼠标（或手指）移动到当前图形上触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEOVER
                     // @return {boolean} 回调返回true则阻止抛出全局事件
       
       onmouseout : {Function}, // 默认为null，鼠标（或手指）从当前图形移开，回传参数格式同onclick，其中：
                    // 事件类型为confit.EVENT.MOUSEOUT
                    // @return {boolean} 回调返回true则阻止抛出全局事件              
       
       onmousedown : {Function}, // 默认为null，鼠标按钮（或手指）按下，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.MOUSEDOWN
                     // @return {boolean} 回调返回true则阻止抛出全局事件   
       
       onmouseup : {Function}, // 默认为null，鼠标按钮（或手指）松开，回传参数格式同onclick，其中：
                   // 事件类型为confit.EVENT.MOUSEUP
                   // @return {boolean} 回调返回true则阻止抛出全局事件   
       
       ondragstart : {Function}, // 默认为null，开始拖拽时触发，回传参数格式同onclick，其中：
                     // 事件类型为confit.EVENT.DRAGSTART
                     // @return {boolean} 回调返回true则阻止抛出全局事件
                   
       ondragend : {Function}, // 默认为null，拖拽完毕时触发，回传参数格式同onclick，其中：
                   // 事件类型为confit.EVENT.DRAGEND
                   // @return {boolean} 回调返回true则阻止抛出全局事件
       
       ondragenter : {Function}, // 默认为null，拖拽图形元素进入目标图形元素时触发
                     // 回传参数格式同onclick，其中：
                     // @param {string} eventPacket.type 事件类型，EVENT.DRAGENTER
                     // @param {Object} eventPacket.target 目标图形元素shape对象
                     // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                     // @return {boolean} 回调返回true则阻止抛出全局事件
       
       ondragover : {Function}, // 默认为null，拖拽图形元素在目标图形元素上移动时触发，
                    // 回传参数格式同onclick，其中：
                    // @param {string} eventPacket.type 事件类型，EVENT.DRAGOVER
                    // @param {Object} eventPacket.target 目标图形元素shape对象
                    // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                    // @return {boolean} 回调返回true则阻止抛出全局事件 
       
       ondragleave : {Function}, // 默认为null，拖拽图形元素离开目标图形元素时触发，
                     // 回传参数格式同onclick，其中：
                     // @param {string} eventPacket.type 事件类型，EVENT.DRAGLEAVE
                     // @param {Object} eventPacket.target 目标图形元素shape对象
                     // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                     // @return {boolean} 回调返回true则阻止抛出全局事件     
                       
       ondrop : {Function}, // 默认为null，拖拽图形元素放在目标图形元素内时触发，
                // 回传参数格式同onclick，其中：
                // @param {string} eventPacket.type 事件类型，EVENT.DRAG
                // @param {Object} eventPacket.target 目标图形元素shape对象
                // @param {Object} eventPacket.dragged 拖拽图形元素shape对象
                // @return {boolean} 回调返回true则阻止抛出全局事件
   }
 */
define(
    function(require) {

        var self,
            matrix = require('../tool/matrix'),
            vector = require('../tool/vector');
        /**
         * 派生实现通用功能 
         * @param {Object} clazz 图形类
         */
        function derive(clazz) {
            var methods = [             // 派生实现的基类方法
                    'brush',
                    'setContext',
                    'drawText',
                    'getHighlightStyle',
                    'getHighlightZoom',
                    'drift',
                    'isCover',
                    'updateTransform'
                ],   
                len = methods.length,
                proto = clazz.prototype,
                i = 0,
                method;
                
            for (; i < len; i++) {
                method = methods[i];
                if (!proto[method]) {
                    proto[method] = self[method];
                }
            }
        };
        
        /**
         * 画刷
         * @param ctx       画布句柄
         * @param e         形状实体
         * @param isHighlight   是否为高亮状态
         */
        function brush(ctx, e, isHighlight) {
            var style = {};
            for (var k in e.style) {
                style[k] = e.style[k];
            }
            
            if (this.brushTypeOnly) {
                style.brushType = this.brushTypeOnly;
            }
            
            if (isHighlight) {
                // 根据style扩展默认高亮样式
                style = this.getHighlightStyle(style, e.highlightStyle || {});
            }
            
            if (this.brushTypeOnly == 'stroke') {
                style.strokeColor = style.strokeColor || style.color;                 
            }
   
            ctx.save();
            this.setContext(ctx, style);
            
            //设置transform
            var m = this.updateTransform( e );
            ctx.transform( m[0], m[1], m[2], m[3], m[4], m[5] );


            ctx.beginPath();
            this.buildPath(ctx, style);
            if (this.brushTypeOnly != 'stroke') {
                ctx.closePath();
            }
            
            switch (style.brushType) {
                case 'fill':
                    ctx.fill();
                    break;
                case 'stroke':
                    ctx.stroke();
                    break;
                case 'both':
                    ctx.stroke();
                default:
                    ctx.fill();
            }
            
            if (style.text) {
                // 字体颜色策略
                style.textColor = style.textColor 
                                  || e.style.color 
                                  || e.style.strokeColor;
                                  
                if (style.textPosition == 'inside') {
                    ctx.shadowColor = 'rgba(0,0,0,0)';   // 内部文字不带shadowColor
                }
                this.drawText(ctx, style);
            }
            
            ctx.restore();
            return;
        }
        
        /**
         * 画布通用设置 
         * @param ctx       画布句柄
         * @param style     通用样式 
         */
        function setContext(ctx, style) {
            // 简单判断不做严格类型检测
            if (typeof style.color != 'undefined') {
                ctx.fillStyle = style.color;
            } 
            
            if (typeof style.strokeColor != 'undefined') {
                ctx.strokeStyle = style.strokeColor;
            }
            
            if (typeof style.opacity != 'undefined') {
                ctx.globalAlpha = style.opacity;
            }
            
            if (typeof style.lineCap != 'undefined') {
                console.log(style.lineCap)
                ctx.lineCap = style.lineCap;
            }
            
            if (typeof style.lineJoin != 'undefined') {
                ctx.lineJoin = style.lineJoin;
            }
            
            if (typeof style.miterLimit != 'undefined') {
                ctx.miterLimit = style.miterLimit;
            }
            
            if (typeof style.lineWidth != 'undefined') {
                ctx.lineWidth = style.lineWidth;
            } 
            
            if (typeof style.shadowBlur != 'undefined') {
                ctx.shadowBlur = style.shadowBlur;
            }
            
            if (typeof style.shadowColor != 'undefined') {
                ctx.shadowColor = style.shadowColor;
            }
            
            if (typeof style.shadowOffsetX != 'undefined') {
                ctx.shadowOffsetX = style.shadowOffsetX;             
            }
             
            if (typeof style.shadowOffsetY != 'undefined') {
                ctx.shadowOffsetY = style.shadowOffsetY;
            }
            
            // 变换后各种事件坐标，拖拽变换，hover，大小判断都需要升级，考虑做成shape级上支持
            /* 
            if (typeof style.translate != 'undefined'
                && style.translate.length == 2
            ) {
                ctx.translate(style.translate[0], style.translate[1]);
            }
            
            if (typeof style.scale != 'undefined'
                && style.scale.length == 2
            ) {
                ctx.scale(style.scale[0], style.scale[1]);
            }
            
            // 相对于坐标原点的变换，需要原地旋转得配合translate
            if (typeof style.rotate != 'undefined') {
                ctx.rotate(style.rotate);
            }
            */
            /*
             * 变换，支持不好
             * @param {number} xZoom  变换矩阵m11
             * @param {number} rotate 变换矩阵m12
             * @param {number} slant  变换矩阵m21
             * @param {number} yZoom  变换矩阵m22
             * @param {number} x      变换原点x坐标
             * @param {number} y      变换原点y坐标
            if (typeof style.transform != 'undefined'
                && style.transform.length == 6
            ) {
                ctx.transform(
                    style.transform[0],
                    style.transform[1],
                    style.transform[2],
                    style.transform[3],
                    style.transform[4],
                    style.transform[5]
                );
            }
            */
        }
        
        /**
         * 附加文本
         * @param {Context2D} ctx Canvas 2D上下文
         * @param {Object} style 样式
         */
        function drawText(ctx, style) {
            ctx.fillStyle = style.textColor;
            // 文本与图形间空白间隙
            var dd = 10;
            var al;         // 文本水平对齐
            var bl;         // 文本垂直对齐
            var tx;         // 文本横坐标
            var ty;         // 文本纵坐标
            
            var textPosition = style.textPosition       // 用户定义
                               || this.textPosition     // shape默认
                               || 'top';                // 全局默认
           
            if ((textPosition == 'inside'
                || textPosition == 'top'
                || textPosition == 'bottom'
                || textPosition == 'left'
                || textPosition == 'right')
                && this.getRect // 矩形定位文字的图形必须提供getRect方法
            ) { 
                var rect = this.getRect(style);
                
                switch (textPosition) {
                    case "inside":
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height / 2;
                        al = 'center';
                        bl = 'middle';
                        if (style.brushType != 'stroke'
                            && style.textColor == style.color
                        ) {
                            ctx.fillStyle = '#fff';
                        }
                        break;
                    case "left":
                        tx = rect.x - dd;
                        ty = rect.y + rect.height / 2;
                        al = 'end';
                        bl = 'middle';
                        break;
                    case "right":
                        tx = rect.x + rect.width + dd;
                        ty = rect.y + rect.height / 2;
                        al = 'start';
                        bl = 'middle';
                        break;
                    case "top":
                        tx = rect.x + rect.width / 2;
                        ty = rect.y - dd;
                        al = 'center';
                        bl = 'bottom';
                        break;
                    case "bottom":
                        tx = rect.x + rect.width / 2;
                        ty = rect.y + rect.height + dd;
                        al = 'center';
                        bl = 'top';
                        break;
                }
            }
            else if ((textPosition == 'start' 
                     || textPosition == 'end')
                     && typeof style.pointList != 'undefined'
            ) {
                var pointList = style.pointList;
                if (pointList.length < 2) {
                    // 少于2个点就不画了~
                    return;
                }
                var length = pointList.length;
                switch (textPosition) {
                    case "start":
                        al = pointList[0][0] < pointList[1][0]  
                             ? 'end' : 'start';
                        bl = pointList[0][1] < pointList[1][1]  
                             ? 'bottom' : 'top';
                        tx = pointList[0][0];
                        ty = pointList[0][1];
                        break;
                    case "end":
                        al = pointList[length - 2][0] 
                             < pointList[length - 1][0]   
                             ? 'start' : 'end';
                        bl = pointList[length - 2][1] 
                             < pointList[length - 1][1]   
                             ? 'top' : 'bottom';
                        tx = pointList[length - 1][0];
                        ty = pointList[length - 1][1];
                        break;
                }
                dd -= 4;
                tx -= (al == 'end' ? dd : -dd);
                ty -= (bl == 'bottom' ? dd : -dd);
            }
           
            if (typeof tx != 'undefined' && typeof ty != 'undefined') {
                if (style.textFont) {
                    ctx.font = style.textFont;
                }
                ctx.textAlign = style.textAlign || al;
                ctx.textBaseline = style.textBaseLine || bl;
                
                ctx.fillText(style.text, tx, ty);
            }
        }
        
        /**
         * 根据默认样式扩展高亮样式
         * @param ctx Canvas 2D上下文
         * @param {Object} style 默认样式
         * @param {Object} highlightStyle 高亮样式
         */
        function getHighlightStyle(style, highlightStyle) {
            var color = require('../tool/color');
            var highlightColor = color.getHighlightColor();
            if (style.brushType != 'stroke') {
                // 带填充则用高亮色加粗边线
                style.strokeColor = highlightColor;
                style.lineWidth = (style.lineWidth || 1) 
                                  + this.getHighlightZoom();
                style.brushType = 'both';
            }
            else {
                // 描边型的则用原色加工高亮
                style.strokeColor = highlightStyle.strokeColor 
                                    || color.mix(
                                           style.strokeColor, highlightColor
                                       );
            }
            
            // 可自定义覆盖默认值
            for (var k in highlightStyle) {
                style[k] = highlightStyle[k];
            } 
            
            return style
        }
         
        /**
         * 高亮放大效果参数
         * 当前统一设置为6，如有需要差异设置，通过this.type判断实例类型 
         */
        function getHighlightZoom() {
            return this.type != 'text' ? 6 : 2;
        };
      
        /**
         * 默认漂移
         * @param e 图形实体
         * @param dx 横坐标变化
         * @param dy 纵坐标变化
         */
        function drift(e, dx, dy){
            e.position[0] += dx;
            e.position[1] += dy;
        };
            
        /**
         * 默认区域包含判断
         * @param e 图形实体
         * @param x 横坐标
         * @param y 纵坐标 
         */
        function isCover(e, x, y) {
            var area = require('../tool/area');
            //对鼠标的坐标也做相同的变换
            var m = e._transform;
            if( m ){
                var newPos = matrix.mulVector([], matrix.inverse( [], matrix.expand(m) ), [x, y, 1]); 
            }else{
                newPos = [x, y];
            }
            return area.isInside(e.shape, e.style, newPos[0], newPos[1]);
        }
        
        function updateTransform( e ){
            var _transform = e._transform || matrix.create();
            matrix.identity( _transform );
            if( e.scale){
                var originX = e.scale[2] || 0,
                    originY = e.scale[3] || 0;
                if( originX || originY ){
                    matrix.translate(_transform, _transform, [-originX, -originY] );
                }
                matrix.scale( _transform, _transform, e.scale );
                if( originX || originY ){
                    matrix.translate(_transform, _transform, [originX, originY] );
                }
            }
            if( e.rotation ){
                if( e.rotation.constructor === Array ){
                    var originX = e.rotation[1] || 0,
                        originY = e.rotation[2] || 0;
                    if( originX || originY ){
                        matrix.translate(_transform, _transform, [-originX, -originY] );
                    }
                    matrix.rotate( _transform, _transform, e.rotation[0] );
                    if( originX || originY ){
                        matrix.translate(_transform, _transform, [originX, originY] );
                    }   
                }else{
                    matrix.rotate( _transform, _transform, e.rotation );
                }
            }
            if( e.position ){
                matrix.translate(_transform, _transform, e.position );
            }
            // 保存这个变换矩阵
            e._transform = _transform;

            return _transform;   
        }
        
        self = {
            derive : derive,
            brush : brush,
            setContext : setContext,
            drawText : drawText,
            getHighlightStyle : getHighlightStyle,
            getHighlightZoom : getHighlightZoom,  
            drift : drift,
            isCover : isCover,

            updateTransform : updateTransform
        }
        
        return self;
    }
);