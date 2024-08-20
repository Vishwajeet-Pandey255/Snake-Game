let canvas = document.querySelector('canvas');

let pen=canvas.getContext('2d');
pen.fillStyle='red'
// pen.fillRect(0,0,50,50);  //Corrdinates X,Y,Height,Weight  for rectanguler shape
// pen.clearRect(0,0,50,50);

let cell=20;
let scell=[[0,0]]

let gameover = false
let count = 0;
let randomcell = generateRandomCell()
let id=setInterval(()=>{         //Hoeisting Concept
    draw()
    update()
    },100)


let direction='right';
document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowDown') {
        direction='down'
    }
    else if(e.key==='ArrowLeft'){
        direction='left'
    }
    else if(e.key==='ArrowUp'){
        direction='up'
    }
    else{
        direction='right'
    }
})

function draw(){
    if(gameover){
        clearInterval(id)
        pen.font='100px sans-sarif'
        pen.fillText('game over',200,250)
        return;
    }
    pen.clearRect(0,0,800,500);  //x,y,width,height
    for(let i of scell) {
        pen.fillRect(i[0],i[1],cell,cell);
    }
    pen.fillStyle='yellow'
    pen.fillRect(randomcell[0],randomcell[1],cell,cell)
    pen.font='50px sans-sarif'
    pen.fillText(`${count}`,190,100)
    pen.fillText('Score :',40,100)
    pen.fillStyle='red'
}
draw()

function update(){
    let headX= scell[scell.length-1][0]
    let headY= scell[scell.length-1][1]

    // let newHeadX=headX+cell;
    // let newHeadY=headY

    if(direction==='up'){
        newHeadX=headX;
        newHeadY=headY-cell
        if(newHeadY<0){
            gameover=true
        }
    }
    else if(direction==='down'){
        newHeadX=headX;
        newHeadY=headY+cell;
        if(newHeadY===500){
            gameover=true
        }
    }
    else if(direction==='left'){
        newHeadX=headX-cell;
        newHeadY=headY
        if(newHeadX<0){
            gameover=true;
        }
    } else {
        newHeadX=headX+cell;
        newHeadY=headY;
        if(newHeadX===800){
            gameover=true;
        }
    }   



    scell.push([newHeadX,newHeadY])
    // scell.shift()

    if(randomcell[0]===newHeadX  && randomcell[1]===newHeadY){
        randomcell = generateRandomCell()
        count++
    }
    else {
        scell.shift()
    }
}
update()


function generateRandomCell(){
    return[
       Math.floor( Math.random()*800/cell)*cell  ,
       Math.floor(Math.random()*500/cell)*cell
    ]
}

