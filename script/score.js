
export function resetScore(){
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
export function updateScore(){
  const redWins = document.querySelector('.wins-red');
  const blueWins = document.querySelector('.wins-blue');
  const redLoses = document.querySelector('.loses-red');
  const blueLoses = document.querySelector('.loses-blue');

  redWins.innerHTML = `wins: ${score.wins.red}`;
  blueWins.innerHTML = `wins: ${score.wins.blue}`;
  redLoses.innerHTML = `loses: ${score.loses.red}`;
  blueLoses.innerHTML = `loses: ${score.loses.blue}`;
}
import { score } from "./tic tac toe";
console.log('fako')