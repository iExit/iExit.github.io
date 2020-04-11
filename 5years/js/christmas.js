	/**
		Profile:表白时间和打字机等效果配置文件;
		Author: Blumer;
		Date: 2019年8月6日;
		Email: geekclouds@163.com;
	*/
    $("#curs").click(function(){
        var str = '「陆晴」，我喜欢你\n';
        str += '我知道我不会甜言蜜语\n';
        str += '但是我会用行动证明一切\n';
        str += '我相信，陪伴是最好的誓言\n';
        str += '往后余生里，风雪是你\n';
        str += '春华是你，秋黄是你\n';
        str += '四季冷暖是你\n';
        str += '目光所至\n';
        str += '都是\n';
        str += '你';
        Printer.init(str, {
            //speed: 90,  //文字速度
            selector: 'canvas',
            //lnStr: 'root@demo ~/ # ',
            //"curSpeed" : 50,
            "speed" : 400,  //文字速度
            // "selector" : 'canvas', //选择器
            // "startIndex" : 0,   //从第几个字符开始打印
            // "endIndex" : 0,    //打印到第几个字符结束
            "hasCur" : true,   //是否显示光标
            // "curId" : 'cur',   //光标的ID
            // "curStr" : '_', //光标字符
            // "curStyle" : 'font-weight: bold;',  //光标的样式（CSS样式）
            "curSpeed" : 800, //光标速度（ms）
            // "lnStr": "" //行首字符
        }).print();
        $("#curs").attr("disabled","disabled");
        $(".contact").css('display','none');
    });   
   
    //满屏心
    // $(document).snowfall('clear');
    // $(document).snowfall({
    //     image: "./org/jquery-hb/images/huaban.png",
    //     flakeCount:60,
    //     minSize: 5,
    //     maxSize: 22
    // });
    //timer
    function SetTime(){
        var oDay = document.getElementById("t_d");
        var oHours = document.getElementById("t_h");
        var oMinutes = document.getElementById("t_m");
        var oSeconds = document.getElementById("t_s");
        var date1=new Date("Tus Dec 25 2018 00:00:00 GMT+0800"); //开始时间
        var date2=new Date(); //结束时间
        console.log(date2);
        var date3=date2.getTime()-date1.getTime() ;//时间差的毫秒数
		//计算出相差天数
        var days=Math.floor(date3/(24*3600*1000));
		//计算出小时数
        var leave1=date3%(24*3600*1000); //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
		//计算相差分钟数
        var leave2=leave1%(3600*1000); //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));
		//计算相差秒数
        var leave3=leave2%(60*1000); //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);
        //alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
        var LoveDay = new Date();



        var ms=0;
        var sec=seconds;
        var min=minutes;
        var hour=hours;
        var day = days;
        timer=setInterval(function(){
            oDay.innerHTML = day;
            oHours.innerHTML = hour;
            oMinutes.innerHTML = min;
            oSeconds.innerHTML = sec;
            //oDiv.innerHTML=time;
            ms=ms+50;
            if(ms>999){
                ms=0;
                sec++;
            }
            if(sec>59){
                sec=0;
                min++;
            }
            if(min>59){
                min=0;
                hour++;
            }
            if(hour>23){
                hour=0;
                day++;
            }

        },50)
    };
    function StopTimer(){
        clearInterval(timer);
    }
    //end timer
    //begin carousel
    window.onload = function(){
        SetTime();
        var oWrap = document.getElementById('wrap');
        var oImg = oWrap.getElementsByTagName('img');
        var oImgLength = oImg.length;
        var Deg = 360 / oImgLength;
        var nowX , nowY , lastX , lastY , minusX = 0, minusY = 0;
        var roY = 0 , roX = -10;
        var timer;

        for ( var i=0;i<oImgLength;i++ )
        {
            oImg[i].style.transform = 'rotateY('+ i*Deg +'deg) translateZ(350px)';
            oImg[i].style.transition = 'transform 1s '+ (oImgLength-1-i)*0.1 +'s';

        }

        mTop();

        window.onresize = mTop;

        function mTop(){
            var wH = document.documentElement.clientHeight;
            oWrap.style.marginTop = wH / 2 - 180 + 'px';
        }

        //拖拽：三个事件-按下 移动 抬起
        //按下
        document.onmousedown = function(ev){
            ev = ev || window.event;

            //鼠标按下的时候，给前一点坐标赋值，为了避免第一次相减的时候出错
            lastX = ev.clientX;
            lastY = ev.clientY;

            //移动
            this.onmousemove = function(ev){
                ev = ev || window.event;

                clearInterval( timer );

                nowX = ev.clientX; // clientX 鼠标距离页面左边的距离
                nowY = ev.clientY; // clientY ………………………………顶部………………

                //当前坐标和前一点坐标差值
                minusX = nowX - lastX;
                minusY = nowY - lastY;

                //更新wrap的旋转角度，拖拽越快-> minus变化大 -> roY变化大 -> 旋转快
                roY += minusX*0.2; // roY = roY + minusX*0.2;
                roX -= minusY*0.1;

                oWrap.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)';

                /*
                //生成div，让div跟着鼠标动
                var oDiv = document.createElement('div');
                oDiv.style.cssText = 'width:5px;height:5px;background:red;position:fixed;left:'+nowX+'px;top:'+nowY+'px';
                this.body.appendChild(oDiv);
                */

                //前一点的坐标
                lastX = nowX;
                lastY = nowY;

            };
            //抬起
            this.onmouseup = function(){
                this.onmousemove = null;
                timer = setInterval(function(){
                    minusX *= 0.95;
                    minusY *= 0.95;
                    roY += minusX*0.2; // roY = roY + minusX*0.2;
                    roX -= minusY*0.1;
                    oWrap.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)';

                    if ( Math.abs(minusX)<0.1 && Math.abs( minusY )<0.1 )
                    {
                        clearInterval( timer );
                    }
                    console.log( minusX );
                },13);
            };
            return false;
        }
    };
    //end carousel