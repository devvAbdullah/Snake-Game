//getting canvas
let canvas = document.getElementById("canvas");
//setting dimensions
let ctx = canvas.getContext("2d");
//setting rows
let rows = 15;
//setting coloumns
let coloumns = 15;
//size of one block
let block_size = 25;
//setting width and height
canvas.height = rows * block_size;
canvas.width = coloumns * block_size;

// snake

let snakex = block_size * 7;
let snakey = block_size * 5;

//snake body AN EMPTY ARRAY TO  store the positions of snake body 
let snake_body = [];

// snake food
//postioon x and y axis :
let foodx = block_size * 10;
let foody = block_size * 7;

// to move snake position
let movex = 0;
let movey = 0;

//restart button 
let btn = document.getElementById("btn");


//can play or not 
let play= true ;

// score 
let score = 0 
//getting score div from htnl 
let scre = document.getElementById("score");

//high score :
let highs=document.getElementById("highscore");
let hscore=localStorage.getItem("highscore");

/* ************************************************************************ */
//creating function run when window load

window.onload = function () {
  place_food();
  document.addEventListener("keydown", move_snake);
  setInterval(draw, 200);
};
let draw = () => {
  //creating rectangle with filled color grey
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (play==true){

      
      //creating food with filled color yellow
      ctx.fillStyle = "yellow";
      ctx.fillRect(foodx, foody, block_size, block_size);
      
      //chechking if the snake ate the food
      if (foodx == snakex && foody == snakey) {
          snake_body.push([foodx, foody]); //to increase the length of the snake
          place_food();
          score=score+1;
          // to store high score 
          if(score>hscore){
            
            localStorage.setItem("highscore",score);

          };
        };
  //to move the snake body (change position of snake body)
  for(let i =snake_body.length-1 ; i>0;i--){
    snake_body[i]=snake_body[i-1];
    
  };
  //to add snake head cordinates 
  if(snake_body.length!=0){
    snake_body[0]=[snakex,snakey]
  };
  
  //creating snake with filled color black
  ctx.fillStyle = "Black";
  //moving snake multilpying it with block size so that it moves a block
  snakex = snakex + movex * block_size;  
  snakey = snakey + movey * block_size;
  ctx.fillRect(snakex, snakey, block_size, block_size);
  //to draw sanke body
  for (let i = 0; i < snake_body.length; i++) {
    //creating snake body
      ctx.fillStyle = "white";
      ctx.fillRect(snake_body[i][0], snake_body[i][1], block_size, block_size);
    };
};
//condition to check if the snkae hit the walls to over the game 
if(snakex<0 || snakex>350 || snakey<0 || snakey>350 ){
    play=false ;
    document.getElementById("gameover").style.display="block";
    scre.innerHTML=`Score= ${score}`;
    let newhighscore =localStorage.getItem("highscore");
    highs.innerHTML=`Highscore=${newhighscore}`;
    
    
  };
  //checking  if the snake hits its body  to over the game
  for(let i=0;i<snake_body.length;i++){
    
    if(snakex==snake_body[i][0] && snakey==snake_body[i][1]){
      play=false ;
      document.getElementById("gameover").style.display="block";
      scre.innerHTML=`Score = ${score}`;
      let newhighscore =localStorage.getItem("highscore");
      highs.innerHTML=`Highscore=${newhighscore}`;
     
      

      
        };
    };
};
//creating place food function to randomly generate food
function place_food() {
  foodx = Math.floor(Math.random() * coloumns) * block_size;
  foody = Math.floor(Math.random() * rows) * block_size;
};

//function to move the snake uppward
function move_snake(e) {
  //check the key value and checks the value of movey if its true it runs othervise move to next part
  if (e.code == "ArrowUp" && movey != 1) {
    //The e.code property returns a string that represents
    //the key value of the pressed key. In this case, it checks if the key value is equal to “arrowup”
    movex = 0;
    movey = -1;
  }
  ////check the key value and checks the value of movey if its true it runs othervise move to next part
  else if (e.code == "ArrowDown" && movey != -1) {
    movex = 0;
    movey = 1;
  }
  //check the key value and checks the value of movex if its true it runs othervise move to next part
  else if (e.code == "ArrowLeft" && movex != 1) {
    movex = -1;
    movey = 0;
  }
  //check the key value and checks the value of movex if its true it runs othervise move to next part
  else if (e.code == "ArrowRight" && movex != -1) {
    movex = 1;
    movey = 0;
  }

};
//restart button 
function restart()
{
  location.reload();
};