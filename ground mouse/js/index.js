var timer = null;
var hole = document.querySelectorAll(".hole");

// 开始游戏
function palyGame() {
    timer = setInterval(mouseout, 1000);
}

// 结束游戏
function endGame() {
    clearInterval(timer);
}

// 地鼠随机冒头  
function mouseout() {
    var i = Math.floor(Math.random() * 9);
    hole[i].lastElementChild.style.visibility = "visible";
    hole[i].firstElementChild.style.visibility = "hidden";
}
// 清除boom效果  
function clearboom() {
    for (var i = 0; i < hole.length; i++) {
        hole[i].firstElementChild.style.visibility = "hidden";
    }
}
for (var i = 0; i < hole.length; i++) {
    // 点到mouse时触发，将其隐藏，然后再将boom效果显示，然后定时器到了再隐藏boom效果
    hole[i].lastElementChild.onclick = function () {
        this.style.visibility = "hidden";
        this.parentElement.firstElementChild.style.visibility = "visible";
        setTimeout(clearboom, 250);
        document.querySelector(".score").innerHTML = Number(document.querySelector(".score").innerHTML) + 100;
        // 结束游戏所需要的分数 
        if (Number(document.querySelector(".score").innerHTML) == 2000) {
            alert("恭喜你，完成通关！厉害厉害，牛逼牛逼！")
            endGame();
        }
    };
}
// 锤子效果  
function knock() {
    document.querySelector("body").style.cursor = "url('img/hammerdown.ico'),auto";
    setTimeout(function () {
        document.querySelector("body").style.cursor = "url('img/hammer.ico'),auto";
    }, 300);
}