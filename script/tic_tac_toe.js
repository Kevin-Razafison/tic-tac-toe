const gameContainer = document.querySelector('.game-container');
const divPlay = document.querySelector('.play');
const resultElement = document.querySelector('.result');
const signContainer = document.querySelector('.sign');
const gameMod =document.querySelector('.gameMod');
const scoreElement = document.querySelector('.score');

let isSetTiming= false;
let isSinglePlayer;
let isWinning = false;
let haveChoosed = false;
let isResult = false;
let sign;
let signOpposite;

let score = {
   wins: {
      blue: 0,
      red: 0,
   },
   loses: {
      blue : 0,
      red: 0,
   }
};

let scoreElementTemp = scoreElement.innerHTML;
scoreElement.innerHTML = '';
let signTemp = signContainer.innerHTML;
signContainer.innerHTML = '';
let gameTemp = gameContainer.innerHTML;
gameContainer.innerHTML = '';
let divPlaytemp = divPlay.innerHTML;
let gameModTemp = gameMod.innerHTML;
gameMod.innerHTML = '';

playStart();
function playStart(){
   const playButton = document.querySelector('.button-play');
   playButton.addEventListener('click', ()=>{
      divPlay.innerHTML = '';
      gameMod.innerHTML = gameModTemp;
      const multiplayerButton = document.querySelector('.multiplayer-button');
      const SinglePlayerButton = document.querySelector('.singleplayer-button');
      multiplayerButton.addEventListener('click',()=>{
         isSinglePlayer = false;
         start();
      })
      SinglePlayerButton.addEventListener('click',()=>{
         isSinglePlayer = true;
         start();
      })

   }); 
}
function start(){
   gameMod.innerHTML = '';
   signContainer.innerHTML = signTemp;
   const signButtonO = document.querySelector('.sign-button-O');
   const signButtonX = document.querySelector('.sign-button-X');
   if(haveChoosed === false){
      signButtonO.addEventListener('click', ()=> {
         sign = `<span class="O"><center>O</center></span>`;
         signOpposite = `<span class="X"><center>X</center></span>`;
         signContainer.innerHTML = '';
         haveChoosed = true;
         playing(gameTemp);
      });
      signButtonX.addEventListener('click', ()=> {
         sign = `<span class="X"><center>X</center></span>`;
         signOpposite = `<span class="O"><center>O</center></span>`;
         haveChoosed = true;
         signContainer.innerHTML = '';
         playing(gameTemp);
      });
   }
}
function playing(gameis){
   gameContainer.innerHTML = gameis;
   scoreElement.innerHTML =scoreElementTemp; 
   const first = document.querySelector('.first-case');
   const second = document.querySelector('.second-case');
   const third = document.querySelector('.third-case');
   const fourth = document.querySelector('.fourth-case');
   const fifth = document.querySelector('.fifth-case');
   const sixth = document.querySelector('.sixth-case');
   const seventh = document.querySelector('.seventh-case');
   const eigth = document.querySelector('.eigth-case');
   const ninth = document.querySelector('.ninth-case');
   let table=[[first,second,third],
               [fourth,fifth,sixth],
               [seventh,eigth,ninth]];
   play(table);
   choose(table);
   const resetButton = document.querySelector('.Score-reset-button');

   resetButton.addEventListener('click',()=>{
   resetScore();
})
}
let TimeoutID = 0;
let clickingCase;
function play(table){
   table.forEach(value =>{
      value.forEach(val =>{
            val.addEventListener('click', clickingCase = () =>{
               if(isWinning === false){
               if(val.innerHTML ===  ''){
                  if(isSinglePlayer === true){
                     if(isSetTiming === false){
                        val.innerHTML = sign;
                        result(table ,sign);
                        isSetTiming = true;
                        if(isResult=== false){
                        TimeoutID = setTimeout(()=>{
                               pickComputerMove(table, signOpposite);
                               result(table ,signOpposite);
                               isSetTiming = false;    
                           }, 1000)
                        }
                         }else if(isSetTiming === true && isResult === false){
                           isSetTiming = false;
                           val.innerHTML = signOpposite;
                           result(table, signOpposite);
                           clearTimeout(TimeoutID);
                        }
                     }else {
                        if(isSetTiming === false){
                           val.innerHTML = sign;
                           result(table,sign);
                           isSetTiming = true;
                        }else{
                           val.innerHTML = signOpposite;
                           result(table,signOpposite);
                           isSetTiming = false;
                        }
                     }
                 }
               }
            })
      })
   })
   
}

function choose(table){
   resultElement.innerHTML += `<div class="choose"><button       class="replay-button">Replay</button><button class="quit-button">Quit</button></div>`;
   const replayButton = document.querySelector('.replay-button');
   const quitButton = document.querySelector('.quit-button');
   replayButton.addEventListener('click', ()=>{
      replay(table); })
   quitButton.addEventListener('click', ()=> quit(table));
}

function result(table,sign) {
   let i;
   let j;
   let index = 0;
  for(i = 0; i< 3; i++){
    j=0;
    if((table[i][j].innerHTML === sign) &&
    (table[i][j].innerHTML === table[i][j+1].innerHTML) && 
    (table[i][j+1].innerHTML === table[i][j+2].innerHTML)){
      if(sign === `<span class="O"><center>O</center></span>`){
         resultElement.innerHTML = `<span class="O-affiche"><center>O</center></span><p>: WIN</p>`;
         score.wins.red +=1; score.loses.blue +=1;
         isSinglePlayer = false;
      }else{
         resultElement.innerHTML = `<span class="X-affiche"><center>X</center></span><p>: WIN</p>`;
         score.wins.blue += 1; score.loses.red += 1;
         isSinglePlayer = false;
      }
      isWinning = true;
   }
}

for(j = 0; j<3; j++){
    i = 0;
    if(table[i][j].innerHTML === table[i+1][j].innerHTML && 
      table[i+1][j].innerHTML === table[i+2][j].innerHTML &&
      table[i][j].innerHTML === sign){
         if(sign === `<span class="O"><center>O</center></span>`){
            resultElement.innerHTML = `<span class="O-affiche"><center>O</center></span> <p>: WIN</p>`;
            score.wins.red +=1; score.loses.blue +=1;
            isSinglePlayer = false;
            isResult = true;
         }else{
            resultElement.innerHTML = `<span class="X-affiche"><center>X</center></span><p>: WIN</p>`;
            score.wins.blue += 1; score.loses.red += 1;
            isSinglePlayer = false;
            isResult =true;
         }
         isWinning = true;
   }
}

  i = 0;
  j = 0;
  if(((table[i][j].innerHTML === table[i+1][j+1].innerHTML)&& 
    (table[i+1][j+1].innerHTML === table[i+2][j+2].innerHTML)&& 
    (table[i][j].innerHTML===table[i+2][j+2].innerHTML)&&
    (table[i][j].innerHTML === sign))||
    ((table[i][j+2].innerHTML === table[i+2][j].innerHTML)&&
    (table[i+1][j+1].innerHTML === table[i+2][j].innerHTML)&&
    (table[i][j+2].innerHTML===table[i+1][j+1].innerHTML)&&
    (table[i][j+2].innerHTML === sign))){
      if(sign === `<span class="O"><center>O</center></span>`){
         resultElement.innerHTML = `<span class="O-affiche"><center>O</center></span> <p>: WIN</p>`;
         score.wins.red +=1; score.loses.blue +=1;
         isSinglePlayer = false;
         isResult = true;
      }else{
         resultElement.innerHTML = `<span class="X-affiche"><center>X</center></span><p>: WIN</p>`;
         score.wins.blue += 1; score.loses.red += 1;
         isSinglePlayer = false;
         isResult = true;
      }      
      isWinning = true;
  }

  for(i = 0; i<3; i++){
   for(j =0; j<3; j++){
      if(table[i][j].innerHTML !== ''){
         index += 1;
      }
   }
  }
  if(isWinning === true){
   updateScore();
   choose(table);
   isResult = true; 
  }
  if(!isWinning){
   if(index === 9){
      isWinning = true;
      isSinglePlayer = false;
      isResult = true;
      resultElement.innerHTML='<p class="tie">Tie</p>';
      choose(table);
      }
   }
}

function replay(table){
   for(let i =0 ; i<3 ; i++){
      for(let j =0; j<3; j++){
         table[i][j].innerHTML = '';
      }
   }
   isResult = false;
   isWinning = false;
   isSinglePlayer = true;
   isSetTiming = false;
   resultElement.innerHTML = '';
   playing(gameTemp);
   updateScore();
}

function quit(table){
   for(let i =0 ; i<3 ; i++){
      for(let j =0; j<3; j++){
         table[i][j].innerHTML = '';
      }
   }
   haveChoosed = false;
   resultElement.innerHTML = '';
   isWinning = false;
   gameTemp = gameContainer.innerHTML;
   gameContainer.innerHTML = ''; 
   scoreElement.innerHTML = '';
   divPlay.innerHTML = divPlaytemp;
   isSetTiming= false;
   isSinglePlayer = true;
   playStart();
   resetScore();
}
function pickComputerMove(table,signOpposite){
   let randomNumber = Math.random();

   if(randomNumber>0 && randomNumber< 1/9){
      if(table[0][0].innerHTML === '') {
         table[0][0].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>1/9 && randomNumber< 2/9){
      if(table[0][1].innerHTML === '') {
         table[0][1].innerHTML= signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>2/9 && randomNumber< 3/9){
      if(table[0][2].innerHTML === '') {
         table[0][2].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>3/9 && randomNumber< 4/9){
      if(table[1][0].innerHTML === '') {
         table[1][0].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>4/9 && randomNumber< 5/9){
      if(table[1][1].innerHTML === '') {
         table[1][1].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>5/9 && randomNumber< 6/9){
      if(table[1][2].innerHTML === '') {
         table[1][2].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>6/9 && randomNumber< 7/9){
      if(table[2][0].innerHTML === '') {
         table[2][0].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>7/9 && randomNumber< 8/9){
      if(table[2][1].innerHTML === '') {
         table[2][1].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
    }else if(randomNumber>8/9 && randomNumber< 1){
      if(table[2][2].innerHTML === '') {
         table[2][2].innerHTML = signOpposite;
      }else{
         pickComputerMove(table,signOpposite);
      }
   }
}

function resetScore(){
   score = {
      wins: {
         blue: 0,
         red: 0,
      },
      loses: {
         blue : 0,
         red: 0,
      }
   };
   updateScore();
}
function updateScore(){
   const redWins = document.querySelector('.wins-red');
   const blueWins = document.querySelector('.wins-blue');
   const redLoses = document.querySelector('.loses-red');
   const blueLoses = document.querySelector('.loses-blue');

   redWins.innerHTML = `wins: ${score.wins.red}`;
   blueWins.innerHTML = `wins: ${score.wins.blue}`;
   redLoses.innerHTML = `loses: ${score.loses.red}`;
   blueLoses.innerHTML = `loses: ${score.loses.blue}`;
}