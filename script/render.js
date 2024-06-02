import { start, playStart, play, playing } from "./playing";
import { isSinglePlayer, isResult, sign, signOpposite, TimeoutID, isSetTiming, isWinning, haveChoose, clickingCase } from "./variable";

export function choose(table){
  resultElement.innerHTML += `<div class="choose"><button       class="replay-button">Replay</button><button class="quit-button">Quit</button></div>`;
  const replayButton = document.querySelector('.replay-button');
  const quitButton = document.querySelector('.quit-button');
  replayButton.addEventListener('click', ()=>{
     replay(table); })
  quitButton.addEventListener('click', ()=> quit(table));
}
export function result(table,sign) {
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

export function replay(table){
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

export function quit(table){
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