const gameBoard =   document.getElementById("gameBoard");

// context of snake game playing area
const context = gameBoard.getContext('2d');
const width =   gameBoard.width;
const height =  gameBoard.height;


const scoreValue = document.getElementById("scoreValue");
const highScoreValue = document.getElementById("highScoreValue")
// height and width of food
const unit = 25;
let foodX;
let foodY;
// for moving snake xdir , y dir
let xVel = 25;
let yVel = 0;
let score =0;
let active = true;
let started = false;

let highScore = localStorage.getItem("highScore") || 0;

function updateScore()
{
    scoreValue.textContent = score;
    highScoreValue.textContent = highScore;
   
}

function updateHighscore()
{
    console.log("outside highscore" , score,highScore)
    if(score > highScore)
    {
        console.log("inside highscore")
        highScore=score;
        localStorage.setItem("highScore",highScore);
        highScoreValue.textContent = highScore;
    }
}





// for snake we want contionous block from x and y axis
// so store in array
let snake = [
     {x:unit*3 , y:0},
     {x:unit*2 , y:0} ,
     {x:unit*1 , y:0} ,
     {x: 0, y:0}
]

window.addEventListener("keydown" , keyPress);

function keyPress(event)
{

    if(!started)
    {
        started = true;
        nextTick();
    }
  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;
// xVel !== unit => which means not going in right side
  if(event.keyCode === left && xVel != unit )
  {
    xVel =- unit;
    yVel =0

  }
 else if(event.keyCode === right && xVel != -unit)
  {
    xVel =+ unit;
    yVel =0

  }
  else if(event.keyCode === up  && yVel !== unit)
  {
    xVel = 0;
    yVel =- unit;

  }
  else if(event.keyCode === down && yVel !== -unit)
  {
    xVel = 0;
    yVel =+ unit;
  }


}
 

startGame();


function startGame()
{
    updateHighscore();
    context.fillStyle = "#406D0F";
    // fillRect(xStart ,yStart ,width ,height)
    context.fillRect(0,0,width,height);
     createFood();
    displayFood();
    drawSnake();

}


function clearBoard()
{
    context.fillStyle = "#406D0F";
    // fillRect(xStart ,yStart ,width ,height)
    context.fillRect(0,0,width,height);

}

function drawSnake()
{
    console.log("drawSnake")
    context.fillStyle='#152072';

    // to seperate snake blocks
    context.strokeStyle ="#406D0F"
    // snakeEachPart => we have x coordinated and y coordinates of snake
    snake.forEach( (snakeEachPart) => { 
        context.fillRect(snakeEachPart.x ,snakeEachPart.y , unit ,unit);
        context.strokeRect(snakeEachPart.x, snakeEachPart.y , unit ,unit);
        
    });

}


function moveSnake()
{
    const head = {  x : snake[0].x+xVel  , 
                    y : snake[0].y + yVel
    }
    // To add front head
    snake.unshift(head);
    // if food => x dir and snake x=> dir collide
    //  similarly for y dir
    // snake increases height
    if(snake[0].x  === foodX  && snake[0].y === foodY)
    {
        // to create food
        createFood();
        score = score + 1;
        
        
    }
    else
    {
        // remove last part
        snake.pop();
    }

}




function createFood()
{
    // here snakeboard is sepearted 25 , 25 units 
    //  so we want to createfood in terms of multiple of 25
    foodX = Math.floor(  (Math.random() * width ) / unit ) * unit;

    foodY = Math.floor(  (Math.random() * height ) / unit ) * unit;
    

}

function displayFood()
{
    console.log("display")
    context.fillStyle="red";
    context.fillRect(foodX,foodY,unit,unit);  
}
//  clear board 
function nextTick()
{
    console.log("active" ,active )
    if(active === true)
    {
        setTimeout(() =>{

            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkCollision();
            
            checkGameOver();
            updateScore();
        
            
            nextTick();

    
        } , 200)
    

    }

    else{
        clearBoard(); 
        updateScore();
        updateHighscore();
        console.log("game over" ,active )
        context.font = "bold 50px serif";
        context.fillStyle ="white";
        context.textAlign = "center";
        context.fillText("Game Over!!" , width/2 ,height/2);
    }
      
    


}

function checkCollision()
{
    for(let i=1; i<snake.length;i++)
    {
        if(snake[i].x === snake[0].x  && snake[i].y === snake[0].y)
        {
            console.log("colllide")
            // snake hits body parts
            active=false;
            return;
        }
    }
}


function checkGameOver()
{
    if(snake[0].x < 0 ||snake[0].x >=  width || snake[0].y < 0  || snake[0].y >= height)
        
    {
        active = false
    }
    
}