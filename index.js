let palyerText = document.getElementById('palyerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

// console.log(gameboard);

const O_Text = 'O';
const X_Text = 'X';

let current_player = X_Text;
let spaces = Array(9).fill(null);

// console.log(spaces);

const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let palyerWon = () => {

    for (const each of winningCombo) {
        const [a, b, c] = each;
        if (spaces[a] && (spaces[a] === spaces[b] && spaces[b] === spaces[c])) {
            return [a, b, c];
        }
    }
    // if()
    return false;

}

const drawCondition = () => {
    let c = 0;
    spaces.forEach(each => {
        if (each !== null) {
            c = c + 1;
        }
    });
    if (c === 9) {
        return true;
    }
    return false;
}

let boxClick = (e) => {
    const id = e.target.id;
    console.log(id);
    if (!spaces[id]) {
        spaces[id] = current_player;
        e.target.innerHTML = current_player;
        if (palyerWon() !== false) {
            let winningBlocks = palyerWon();
            palyerText.textContent = `${current_player} has Won`;
            const [a, b, c] = winningBlocks;
            boxes[a].style.backgroundColor = "rgb(102 103 106 / 73%)";
            boxes[b].style.backgroundColor = "rgb(102 103 106 / 73%)";
            boxes[c].style.backgroundColor = "rgb(102 103 106 / 73%)";
            spaces.fill(-1);
        } else {
            if (drawCondition()) {
                palyerText.textContent = `Draw Match`;
            }
        }
        if (current_player === X_Text) {
            current_player = O_Text;
        } else {
            current_player = X_Text;
        }
    }

}

let restart = () => {
    // console.log("hi");
    spaces.fill(null);
    boxes.forEach(each => {
        each.innerHTML = "";
        each.style.backgroundColor="";
    });
    current_player = X_Text;
    palyerText.textContent = "Tic Tac Toe";
    startGame();
}


let startGame = () => {
    boxes.forEach(each => each.addEventListener('click', boxClick))
}

restartBtn.addEventListener('click', restart);

startGame();

