// 这是星星
var Star = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
};

Star.prototype.update = function () {

};

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.checkCollision = function (player) {
    if(player.x==this.x&&player.y==(this.y-17)){
        score.number += 100;
        this.x = getRandomInt(0,4)*101;
        this.y = getRandomInt(0,2)*83+72;
    }
};

// 这是分数
var Score = function(x,y,number){
    this.x = x;
    this.y = y;
    //分数值
    this.number = number;
};

Score.prototype.update = function () {

};

Score.prototype.render = function () {
    //绘制分数文字
    ctx.strokeText("Score:"+this.number, this.x, this.y);
};

// 这是我们玩家的生命
var Life = function(x,y){
    this.x = x;
    this.y = y;
    //生命的图片
    this.sprite = 'images/heart.png';
};
Life.prototype.update = function(){

};
Life.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(this.x>=505){
        this.x = -101;
    }
    this.x += dt * this.speed;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var flag = true;
//#1此为游戏必须的函数，用来检测敌人与玩家的碰撞
Enemy.prototype.checkCollision = function (player) {
    if(player.y===this.y){
        if(player.x>=(this.x-81)&&player.x<=(this.x+81)){
            player.x = 202;
            player.y = 83*4+55;
            if(allLives.length>0){
                allLives.pop();
                if(allLives.length==0) {
                    alert("您失败了！");
                    window.location.reload();
                }
            }
        }
    }else if(player.y<0&&flag==true){
        flag = false;
        alert("您过关了！");
        window.location.reload();
    }
};

// 现在实现你自己的玩家类
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (movement){
    switch(movement){
        case 'left':
            if(this.x>=101){
                this.x -= 101;
            }
            break;
        case 'up':
            if(this.y>=55){
                this.y -= 83;
            }
            break;
        case 'right':
            if(this.x<404){
                this.x += 101;
            }
            break;
        case 'down':
            if(this.y<=320){
                this.y += 83;
            }
            break;
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [new Enemy(0,83*2+55,200),new Enemy(0,55,100),new Enemy(0,83*1+55,50)];

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(202,83*4+55);

// 把所有生命对象放进一个叫 allLives 的数组里面
var allLives = [new Life(404,40),new Life(436,40),new Life(468,40)];

// 把分数对象放进一个叫 score 的变量里面
var score = new Score(10,70,0);

var star = new Star(getRandomInt(0,4)*101,getRandomInt(0,2)*83+72);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//得到一个两数之间的随机整数
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
