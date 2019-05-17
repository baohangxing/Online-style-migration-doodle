var canvas;//定义全局画布
var context;//定义全局context
var img1 = [];//储存图像数组，用于撤销
var canX;//画布左上角的x坐标
var canY;//画布左上角y坐标


var canvas2;//定义全局画布
var context2;//定义全局context
var img12 = [];//储存图像数组，用于撤销
var canX2;//画布左上角的x坐标
var canY2;//画布左上角y坐标


$(function () {
    canvas = $('#cavs')[0];//获取画布的dom
    context = canvas.getContext('2d');//获取context
    // canX=canvas.offsetLeft;//获取画布左上角的x坐标
    // canY=canvas.offsetTop;//获取画布左上角的y坐标

    // canX = 553;//获取画布左上角的x坐标
    // canY = 237;//获取画布左上角的y坐标

    canX = 640;//获取画布左上角的x坐标
    canY = 241;//获取画布左上角的y坐标
    // alert("画布左上角坐标："+canX+" "+canY);
    color = '#000';
    // var imgData=context.getImageData(0,0,canvas.width,canvas.height);
    // img1.push(imgData);
    var paint = Object.create(Line);//定义父类，初始化获取画线条的对象
    context.lineCap = "round";//线条起始和结尾样式
    context.lineJoin = "round";//线条转弯样式
    $('#Line').click(function (event) {//点击线条按钮，获取线条对象
        context.lineWidth = $('#thickness').val();
        paint = Object.create(Line);
        context.strokeStyle = color;
        console.log(paint);
    });
    $('#Eraser').click(function (event) {
        context.lineWidth = $('#thickness').val();
        paint = Object.create(Eraser);
        context.strokeStyle = "#FFF";
        console.log(paint);
    });
    $('#Clear').click(function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context的clearRect方法
    });


    $('#Cancel').click(function () {
        context.putImageData(img1.pop(), 0, 0);
    });
    paint.draw();

    //copy

    canvas2 = $('#cavs2')[0];//获取画布的dom
    context2 = canvas2.getContext('2d');//获取context
    // canX2=canvas2.offsetLeft;//获取画布左上角的x坐标
    // canY2=canvas2.offsetTop;//获取画布左上角的y坐标

    // canX2 = 555;//获取画布左上角的x坐标
    // canY2 = 237;//获取画布左上角的y坐标

    canX2 = 640;//获取画布左上角的x坐标
    canY2 = 241;//获取画布左上角的y坐标

    // alert("画布左上角坐标："+canX2+" "+canY2);
    color2 = '#000';
    // var imgData=context.getImageData(0,0,canvas.width,canvas.height);
    // img1.push(imgData);
    var paint2 = Object.create(Line2);//定义父类，初始化获取画线条的对象
    context2.lineCap = "round";//线条起始和结尾样式
    context2.lineJoin = "round";//线条转弯样式
    $('#Line2').click(function (event) {//点击线条按钮，获取线条对象
        context2.lineWidth = $('#thickness2').val();
        paint2 = Object.create(Line2);
        context2.strokeStyle = color2;
        console.log(paint2);
    });
    $('#Eraser2').click(function (event) {
        context2.lineWidth = $('#thickness2').val();
        paint2 = Object.create(Eraser2);
        context2.strokeStyle = "#FFF";
        console.log(paint2);
    });
    $('#Clear2').click(function (event) {
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        //context的clearRect方法
    });
    $('#Cancel2').click(function () {
        context2.putImageData(img12.pop(), 0, 0);
    });
    paint2.draw();


});
var Line = {
    name: "line",
    draw: function () {
        var painting = false;//初始化设置为不可画状态
        var p_x;//画笔初始x坐标
        var p_y;//画笔初始y坐标
        // var canvas = $('#cavs')[0];//获取画布的dom
        // var context = canvas.getContext('2d');//获取绘制2d图形的context
        //初始化画笔颜色
        $('#cavs').mousemove(function (e) {//当鼠标在画布上移动时执行
            if (painting === true) {//判断是否是可绘画状态
                var x = e.pageX;//鼠标当前x坐标
                var y = e.pageY;//鼠标当前y坐标
                // console.log("鼠标当前坐标" + x + " " + y);
                context.lineTo(x - canX, y - canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
                context.stroke();
            }
        });
        $('#cavs').mousedown(function (e) {//当鼠标按下时触发
            painting = true;//鼠标按下可以作画
            p_x = e.pageX;//画笔起始x坐标
            p_y = e.pageY;//画笔起始y坐标
            context.beginPath();//开始作画
            context.moveTo(p_x - canX, p_y - canY);//画笔开始位置
            $('#cavs').css('cursor', 'pointer');//将鼠标图形设置成小手
            //复制图像，为了撤销
            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            //加入数组
            img1.push(imgData);
        });
        $('#cavs').mouseup(function (e) {
            painting = false;//鼠标松开，禁止作画
            context.closePath();//关闭画笔路径
            $('#cavs').css('cursor', '');//消除鼠标小手

        });
        $('#cavs').mouseleave(function (e) {//鼠标移出时，禁止作画
            painting = false;
            context.closePath();
            $('#cavs').css('cursor', '');//消除鼠标小手
        });
        $("#color").change(function (event) {//当颜色改变时触发
            context.strokeStyle = $(this).val();//改变画笔颜色
        });
        $("#colorred").mousedown(function (event) {//当颜色改变时触发
            context.strokeStyle = '#f00';//改变画笔颜色
        });
        $("#colorgreen").mousedown(function (event) {//当颜色改变时触发
            context.strokeStyle = '#00FF00';//改变画笔颜色
        });
        $("#coloryellow").mousedown(function (event) {//当颜色改变时触发
            context.strokeStyle = '#FFFF00';//改变画笔颜色
        });
        $("#colorblack").mousedown(function (event) {//当颜色改变时触发
            context.strokeStyle = '#000';//改变画笔颜色
        });
        $("#thick").change(function (event) {
            context.lineWidth = $(this).val();
        });
    }
}
var eraser = {
    name: "eraser",
    draw: function () {
        var painting = false;//初始化设置为不可画状态
        var p_x;//画笔初始x坐标
        var p_y;//画笔初始y坐标
        console.log(context.strokeStyle);
        ontext.lineWidth = $("#thick").val();
        $('#cavs').mousemove(function (e) {//当鼠标在画布上移动时执行
            if (painting === true) {//判断是否是可绘画状态
                var x = e.pageX;//鼠标当前x坐标
                var y = e.pageY;//鼠标当前y坐标
                context.lineTo(x - canX, y - canY);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
                context.stroke();
            }
        });
        $('#cavs').mousedown(function (e) {//当鼠标按下时触发
            painting = true;//鼠标按下可以作画
            p_x = e.pageX;//画笔起始x坐标
            p_y = e.pageY;//画笔起始y坐标
            context.beginPath();//开始作画
            context.moveTo(p_x - canX, p_y - canY);//画笔开始位置
            $('#cavs').css('cursor', 'pointer');//将鼠标图形设置成小手
            //复制图像，为了撤销
            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            //加入数组
            img1.push(imgData);
        });
        $('#cavs').mouseup(function (e) {
            painting = false;//鼠标松开，禁止作画
            context.closePath();//关闭画笔路径
            $('#cavs').css('cursor', '');//消除鼠标小手
        });
        $('#cavs').mouseleave(function (e) {//鼠标移出时，禁止作画
            painting = false;
            context.closePath();
        });
        $("#thick").change(function (event) {//修改粗细时，进行赋值
            context.lineWidth = $(this).val();
        });
    }
}


var Line2 = {
    name: "line2",
    draw: function () {
        var painting2 = false;//初始化设置为不可画状态
        var p_x2;//画笔初始x坐标
        var p_y2;//画笔初始y坐标
        // var canvas = $('#cavs')[0];//获取画布的dom
        // var context = canvas.getContext('2d');//获取绘制2d图形的context
        //初始化画笔颜色
        $('#cavs2').mousemove(function (e) {//当鼠标在画布上移动时执行
            if (painting2 === true) {//判断是否是可绘画状态
                var x = e.pageX;//鼠标当前x坐标
                var y = e.pageY;//鼠标当前y坐标
                //console.log("鼠标当前坐标"+x+" "+y);
                context2.lineTo(x - canX2, y - canY2);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
                context2.stroke();
            }
        });
        $('#cavs2').mousedown(function (e) {//当鼠标按下时触发
            painting2 = true;//鼠标按下可以作画
            p_x2 = e.pageX;//画笔起始x坐标
            p_y2 = e.pageY;//画笔起始y坐标
            context2.beginPath();//开始作画
            context2.moveTo(p_x2 - canX2, p_y2 - canY2);//画笔开始位置
            $('#cavs2').css('cursor', 'pointer');//将鼠标图形设置成小手
            //复制图像，为了撤销
            var imgData = context2.getImageData(0, 0, canvas2.width, canvas2.height);
            //加入数组
            img12.push(imgData);
        });
        $('#cavs2').mouseup(function (e) {
            painting2 = false;//鼠标松开，禁止作画
            context2.closePath();//关闭画笔路径
            $('#cavs2').css('cursor', '');//消除鼠标小手

        });
        $('#cavs2').mouseleave(function (e) {//鼠标移出时，禁止作画
            painting2 = false;
            context2.closePath();
            $('#cavs2').css('cursor', '');//消除鼠标小手
        });
        $("#color2").change(function (event) {//当颜色改变时触发
            context2.strokeStyle = $(this).val();//改变画笔颜色
        });
        $("#colorred2").mousedown(function (event) {//当颜色改变时触发
            context2.strokeStyle = '#f00';//改变画笔颜色
        });
        $("#colorgreen2").mousedown(function (event) {//当颜色改变时触发
            context2.strokeStyle = '#00FF00';//改变画笔颜色
        });
        $("#coloryellow2").mousedown(function (event) {//当颜色改变时触发
            context2.strokeStyle = '#FFFF00';//改变画笔颜色
        });
        $("#colorblack2").mousedown(function (event) {//当颜色改变时触发
            context2.strokeStyle = '#000';//改变画笔颜色
        });
        $("#thick2").change(function (event) {
            context2.lineWidth = $(this).val();
        });
    }
}
var eraser2 = {
    name: "eraser2",
    draw: function () {
        var painting2 = false;//初始化设置为不可画状态
        var p_x2;//画笔初始x坐标
        var p_y2;//画笔初始y坐标
        console.log(context2.strokeStyle);
        ontext2.lineWidth = $("#thick2").val();
        $('#cavs2').mousemove(function (e) {//当鼠标在画布上移动时执行
            if (painting2 === true) {//判断是否是可绘画状态
                var x2 = e.pageX;//鼠标当前x坐标
                var y2 = e.pageY;//鼠标当前y坐标
                context2.lineTo(x2 - canX2, y2 - canY2);//确定线的结束位置，canvas.offsetLeft画板离浏览器左侧的距离，canvas.offsetTop画板离浏览器上部的距离
                context2.stroke();
            }
        });
        $('#cavs2').mousedown(function (e) {//当鼠标按下时触发
            painting2 = true;//鼠标按下可以作画
            p_x2 = e.pageX;//画笔起始x坐标
            p_y2 = e.pageY;//画笔起始y坐标
            context2.beginPath();//开始作画
            context2.moveTo(p_x2 - canX2, p_y2 - canY2);//画笔开始位置
            $('#cavs2').css('cursor', 'pointer');//将鼠标图形设置成小手
            //复制图像，为了撤销
            var imgData = context2.getImageData(0, 0, canvas2.width, canvas2.height);
            //加入数组
            img12.push(imgData);
        });
        $('#cavs2').mouseup(function (e) {
            painting2 = false;//鼠标松开，禁止作画
            context2.closePath();//关闭画笔路径
            $('#cavs2').css('cursor', '');//消除鼠标小手
        });
        $('#cavs2').mouseleave(function (e) {//鼠标移出时，禁止作画
            painting2 = false;
            context2.closePath();
        });
        $("#thick2").change(function (event) {//修改粗细时，进行赋值
            context2.lineWidth = $(this).val();
        });
    }
}

