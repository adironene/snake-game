const snake_temp = document.getElementById("snake");  
const snake_game = snake_temp.getContext("2d");  
const background = new Image();  
background.src = "images/background.png";  
const foodImg = new Image();  
foodImg.src = "images/food.png";  
const buffer = 32;  

let snake = [];  

let food = {  
    x : Math.floor(Math.random()*17+1) * buffer,  
    y : Math.floor(Math.random()*15+3) * buffer  
}  
snake[0] = {  
    x : 9 * buffer,  
    y : 10 * buffer  
};  
  
let score = 0;  
let d;  
  
document.addEventListener("keydown",direction);  
  
function direction(event){  
    let key = event.keyCode;  
    if(key == 40 && d != "UP"){  
    d = "DOWN"; 
    }else if(key == 83 && d != "UP"){  
        d = "DOWN";  
    }else if(key == 38 && d != "DOWN"){  
        d = "UP";  
    }else if(key == 87 && d != "DOWN"){  
        d = "UP";  
    }else if( key == 37 && d != "RIGHT"){  
        d = "LEFT";  
    }else if( key == 65 && d != "RIGHT"){  
        d = "LEFT";  
    }else if(key == 39 && d != "LEFT"){  
        d = "RIGHT";   
    }else if(key == 68 && d != "LEFT"){  
        d = "RIGHT";  
    }
}  
 
function draw(){  
      
    snake_game.drawImage(background,0,0,640,640);  
      
    for( let i = 0; i < snake.length ; i++){  
        snake_game.fillStyle = ( i == 0 )? "blue" : "blue";  
        snake_game.fillRect(snake[i].x,snake[i].y,buffer,buffer);  
          
        snake_game.strokeStyle = "red";  
        snake_game.strokeRect(snake[i].x,snake[i].y,buffer,buffer);  
    }   
 
    snake_game.drawImage(foodImg, food.x, food.y, 40, 40);  
    let snakeY = snake[0].y;let snakeX = snake[0].x;
    if( d == "DOWN") snakeY += buffer;  
    if( d == "UP") snakeY -= buffer;
    if( d == "LEFT") snakeX -= buffer;    
    if( d == "RIGHT") snakeX += buffer;  
    if(snakeX == food.x && snakeY == food.y){  
        score++;  
        food = {  
            x : Math.floor(Math.random()*17+1) * buffer,  
            y : Math.floor(Math.random()*15+3) * buffer  
        }  
 
    }else{  
        snake.pop();  
    }  
 
    let newHead = {  
        x : snakeX,  
        y : snakeY  
    }   
 
    if(snakeX < buffer || snakeX > 17 * buffer || snakeY < 3*buffer || snakeY > 17*buffer || collided(newHead,snake)){  
        clearInterval(game);  
        alert("you have earned "+ score + " points. Congrats!");
        location.reload();
    }  
      
    snake.unshift(newHead);  
      
    snake_game.font = "45px Changa one";  
    snake_game.fillStyle = "white";  
    snake_game.fillText(score,2*buffer,1.6*buffer);  
}  

function collided(head,array){  
    for(let i = 0; i < array.length; i++){  
        if(head.x == array[i].x && head.y == array[i].y){  
            return true;  
        }  
    }  
    return false;  
}  
 
let game = setInterval(draw,100); 
