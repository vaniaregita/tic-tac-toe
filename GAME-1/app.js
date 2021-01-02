// HTML Elements
const resetDiv = document.querySelector('.reset');
const statusDiv = document.querySelector('.winning-message')
const boxDivs = document.querySelectorAll('.innerbox');

// game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;

// functions
function handleWin(letter){
  gameIsLive = false;
  winner = letter;
  statusDiv.innerHTML = `${winner} has won!`;
};

function checkGameStatus(){       // everytime user clicks on box check status of game
  const tl = boxDivs[0].classList[1];
  const tm = boxDivs[1].classList[1];
  const tr = boxDivs[2].classList[1];
  const ml = boxDivs[3].classList[1];
  const mm = boxDivs[4].classList[1];
  const mr = boxDivs[5].classList[1];
  const bl = boxDivs[6].classList[1];
  const bm = boxDivs[7].classList[1];
  const br = boxDivs[8].classList[1];

  const winningCombinations = [
            [tl, tm, tr],
            [ml, mm, mr],
            [bl, bm, br],
            [tl, ml, bl],
            [tm, mm, bm],
            [tr, mr, br],
            [tl, mm, br],
            [tr, mm, bl]
  ];

  if(tl && tm && tr && ml && mm && mr && bl && bm && br) {
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is Tied!';
  }

  for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (a && a === b && a === c) {
                handleWin(a);
            }
  }
}


// event handlers
function handleReset(){
  xIsNext = true;
  winner = null;
  statusDiv.innerHTML = '';
  for (const boxDiv of boxDivs){
    boxDiv.classList.remove('x');
    boxDiv.classList.remove('o');
  }
  gameIsLive = true;
}

function handleBoxClick(e){
  const classList = e.target.classList; // refers to clicked innerbox element

  // ensures element is empty (no x or o)
  if(!gameIsLive || classList[2] === 'x' || classList[2] === 'o') {
    return;
  }

  if(xIsNext){ // shortend for xIsNext===True
    classList.add('x');
    checkGameStatus();
    xIsNext = !xIsNext;
  }
  else{
    classList.add('o');
    checkGameStatus();
    xIsNext = !xIsNext;
  }
}

// event listeners
resetDiv.addEventListener('click', handleReset);

for (const boxDiv of boxDivs){
  boxDiv.addEventListener('click', handleBoxClick);
}
