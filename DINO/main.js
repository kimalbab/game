var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var jumpTimer = 0;
var animation;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


var cactusImg = new Image();
cactusImg.src='png/cactus_s.png';

var dinoImg = new Image();
dinoImg.src='png/dino_s.png';

let dino={
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dinoImg, this.x, this.y)
    }
}

dino.draw();


class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
       //ctx.fillStyle = 'red';
       //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cactusImg, this.x, this.y)
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusList = [];

function dinoMove(){
    animation = requestAnimationFrame(dinoMove);
    timer ++;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if(timer % 300 === 0){
        var cactus = new Cactus();
        cactusList.push(cactus);
    }

    cactusList.forEach((a, i, o)=>{
        //x좌표가 0미만이면 리스트에서 제거
        if(a.x < 0){
            o.splice(i, 1)
        }
        
        a.x--;
        boom(dino, a);
        a.draw();
    })

    //공룡이 점프하게 만들기
    if(jump == true) {
        dino.y --;
        jumpTimer++;
    }

    if(jump == false) {
        if(dino.y < 200){
        dino.y++;
        }
    }

    if(jumpTimer > 100){
        jump = false;
        jumpTimer = 0;
    }


    dino.draw();
}

dinoMove();


//충돌체크! dino와 cactus의 x,y좌표를 뺐을 때 음수면 충돌한다.
function boom(dino, cactus){
    var minusX = cactus.x - (dino.x + dino.width);
    var minusY = cactus.y - (dino.y + dino.height);

    if(minusX < 0 && minusY < 0){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}


//jump에 대한 액션
var jump = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jump = true;
    }
})


