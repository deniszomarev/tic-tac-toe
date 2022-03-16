let flag = false;
const cells = document.querySelectorAll(".cell");
let counter = 0;
let audio = new Audio("./assets/mp3/hand-slap_f1bh4oed.mp3");
let results = JSON.parse(localStorage.getItem("results")) || [];
setTable();

function startGame() {
  counter = 0;
  document.querySelector(".result").innerHTML = "";
  cells.forEach((el) => (el.innerHTML = ""));
  cells.forEach((el) => (el.style.color = "yellow"));
  cells.forEach((el) => el.addEventListener("click", setCell));
}
startGame();

function setCell(event) {
  audio.play();
  if (event.target.innerHTML) {
    return;
  }
  event.target.innerHTML = flag == true ? "O" : "X";
  flag = !flag;
  getResult();
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getResult() {
  let temp = [];
  counter++;
  for (let i = 0; i < 8; i++) {
    temp[0] = cells[winningConditions[i][0]].innerHTML;
    temp[1] = cells[winningConditions[i][1]].innerHTML;
    temp[2] = cells[winningConditions[i][2]].innerHTML;
    if (temp[0] == temp[1] && temp[1] == temp[2] && temp[0] != "") {
      cells.forEach((el) => el.removeEventListener("click", setCell));
      cells[winningConditions[i][0]].style.color = "green";
      cells[winningConditions[i][1]].style.color = "green";
      cells[winningConditions[i][2]].style.color = "green";
      flag = false;
      document.querySelector(
        ".result"
      ).innerHTML = `${temp[0]} WIN!<br> Number of moves is ${counter}`;
      let date = new Date();
      results.push({
        figure: temp[0],
        moves: counter,
        date: date.toUTCString(),
      });
      setTable();
      setTimeout(startGame, 4000);
    } else if (counter == 9) {
      cells.forEach((el) => (el.style.color = "red"));
      flag = false;
      document.querySelector(".result").innerHTML = `Draw!`;
      setTimeout(startGame, 4000);
    }
  }
}

function setTable() {
  const array = document.querySelectorAll("tr:not(:first-child)");
  results.sort((a, b) => a.moves - b.moves);
  if (results.length > 10) {
    results.pop();
  }
  results.forEach((el, index) => {
    array[index].children[0].innerHTML = index + 1;
    array[index].children[1].innerHTML = el.figure;
    array[index].children[2].innerHTML = el.moves;
    array[index].children[3].innerHTML = el.date;
  });
  localStorage.setItem("results", JSON.stringify(results));
}
