import { isSetTiming, isSinglePlayer, isWinning, isResult, sign,signOpposite, clickingCase, haveChoosed, TimeoutID } from "./variable";

export function playStart(){
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
export function start(){
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
export function playing(gameis){
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
export function play(table){
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
export function pickComputerMove(table,signOpposite){
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
