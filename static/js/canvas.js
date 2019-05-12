var canvas;//定义全局画布
var context;//定义全局context
var img1=[];//储存图像数组，用于撤销
var canX;//画布左上角的x坐标
var canY;//画布左上角y坐标
$(function(){
    canvas = $('#cavs')[0];//获取画布的dom
    context = canvas.getContext('2d');//获取context
    canX=canvas.offsetLeft;//获取画布左上角的x坐标
    canY=canvas.offsetTop;//获取画布左上角的y坐标
    // var imgData=context.getImageData(0,0,canvas.width,canvas.height);
    // img1.push(imgData);
    var paint=Object.create(Line);//定义父类，初始化获取画线条的对象
    context.lineCap="round";//线条起始和结尾样式
    context.lineJoin="round";//线条转弯样式
    $('#Line').click(function(event) {//点击线条按钮，获取线条对象
        context.lineWidth = $('#thickness').val();
        paint=Object.create(Line);
        context.strokeStyle = $("#color").val();
        console.log(paint);
    });
    $('#Eraser').click(function(event) {
        context.lineWidth = $('#thickness').val();
        paint=Object.create(Eraser);
        context.strokeStyle = "#FFF";
        console.log(paint);
    });
    $('#Clear').click(function(event) {
        context.clearRect(0,0,canvas.width,canvas.height);
        //context的clearRect方法
    });
    $('#Cancel').click(function() {
        context.putImageData(img1.pop(),0,0);
    });
    paint.draw();
});
var Line={
    name:"line",
    draw:function(){
        var painting = false;//初始化设置为不可画状态
        var p_x;//画笔初始x坐标
        var p_y;//画笔初始y坐标
        // var canvas = $('#cavs')[0];//获取画布的dom
        // var context = canvas.getContext('2d');//获取绘制2d图形的context
        //初始化画笔颜色
        console.log(context.strokeStyle);
        $('#cavs').mousemove(function(e){//当鼠标在画布上移动时执行
            if(painting===true){//判断是否是可绘画状态
                var x = e.pageX;//鼠标当前x坐标
                var y = e.pageY;//鼠标当前y坐标
                context.lineTo(x-canX,y-canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
                context.stroke();
            }
        });
        $('#cavs').mousedown(function(e){//当鼠标按下时触发
            painting = true;//鼠标按下可以作画
            p_x = e.pageX;//画笔起始x坐标
            p_y = e.pageY;//画笔起始y坐标
            context.beginPath();//开始作画
            context.moveTo(p_x-canX,p_y-canY);//画笔开始位置
            $('#cavs').css('cursor','pointer');//将鼠标图形设置成小手
            //复制图像，为了撤销
            var imgData=context.getImageData(0,0,canvas.width,canvas.height);
            //加入数组
            img1.push(imgData);
        });
        $('#cavs').mouseup(function(e){
            painting = false;//鼠标松开，禁止作画
            context.closePath();//关闭画笔路径
            $('#cavs').css('cursor','');//消除鼠标小手

        });
        $('#cavs').mouseleave(function(e){//鼠标移出时，禁止作画
            painting = false;
            context.closePath();
            $('#cavs').css('cursor','');//消除鼠标小手
        });
        $("#color").change(function(event) {//当颜色改变时触发
            context.strokeStyle = $(this).val();//改变画笔颜色
        });
        $("#thick").change(function(event) {
            context.lineWidth = $(this).val();
        });
    }
}
var eraser={
    name:"eraser",
    draw:function(){
        var painting = false;//初始化设置为不可画状态
        var p_x;//画笔初始x坐标
        var p_y;//画笔初始y坐标
        console.log(context.strokeStyle);
        ontext.lineWidth = $("#thick").val();
        $('#cavs').mousemove(function(e){//当鼠标在画布上移动时执行
            if(painting===true){//判断是否是可绘画状态
                var x = e.pageX;//鼠标当前x坐标
                var y = e.pageY;//鼠标当前y坐标
                context.lineTo(x-canX,y-canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
                context.stroke();
            }
        });
        $('#cavs').mousedown(function(e){//当鼠标按下时触发
            painting = true;//鼠标按下可以作画
            p_x = e.pageX;//画笔起始x坐标
            p_y = e.pageY;//画笔起始y坐标
            context.beginPath();//开始作画
            context.moveTo(p_x-canX,p_y-canY);//画笔开始位置
            $('#cavs').css('cursor','pointer');//将鼠标图形设置成小手
            //复制图像，为了撤销
            var imgData=context.getImageData(0,0,canvas.width,canvas.height);
            //加入数组
            img1.push(imgData);
        });
        $('#cavs').mouseup(function(e){
            painting = false;//鼠标松开，禁止作画
            context.closePath();//关闭画笔路径
            $('#cavs').css('cursor','');//消除鼠标小手
        });
        $('#cavs').mouseleave(function(e){//鼠标移出时，禁止作画
            painting = false;
            context.closePath();
        });
        $("#thick").change(function(event) {//修改粗细时，进行赋值
            context.lineWidth = $(this).val();
        });
    }
}

