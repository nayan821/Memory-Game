const matched = document.getElementById('matched-count');
const moves = document.getElementById('moves');
const header = document.getElementById('header');
const game = document.querySelector('.game');
const dialogBox = document.getElementById('dialog-box');
const dialogTitle = document.getElementById('dialog-title');
const dialogImage = document.getElementById('dialog-image');
const dialogDescription = document.getElementById('dialog-description');
const playButton = document.getElementById('play-button');




for (let i = 0; i < 4; i++) {
    game.innerHTML += '<div class="row"></div>';
}

const rows = document.querySelectorAll('.row');

rows.forEach(function (row) {

    for (let i = 0; i < 4; i++) {
        row.innerHTML += `<div class="card" ></div>`;
    }
})

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.innerHTML += `<div class="front-card"></div>
                        <div class="back-card" ></div>`;
})

const frontCards = document.querySelectorAll('.front-card');
const backCards = document.querySelectorAll('.back-card');

frontCards.forEach((card) => {
    card.innerHTML = '<img src="images/question.png" alt="image">';
})

let items = ['💎', '🎁', '🎄', '🎪', '⚽', '🏆', '📘', '🎃'];


let firstCard = false;;
let secondCard = false;
let firstCardText = '';
let secondCardText = '';
let matchComplete = 0;
let movesCount = 0;

playButton.addEventListener('click', function () {
    dialogBox.style.display = 'none';
    game.style.display = 'flex';
    header.style.display = 'flex';
    firstCard = false;
    secondCard = false;
    firstCardText = '';
    secondCardText = '';
    matchComplete = 0;
    movesCount = 0;
    moves.textContent = `Moves : ${movesCount}`;
    matched.textContent = `Matched : ${matchComplete} / ${items.length}`;
    cards.forEach(card => {
        card.classList.remove('flip');
    });
});


let newArray = [];
function generateNewArray() {
    let TempArray = [...items];

    for (let i = 0; i < items.length; i++) {
        const RandomIndex = Math.floor(Math.random() * TempArray.length);
        newArray.push(TempArray[RandomIndex]);
        TempArray.splice(RandomIndex, 1);
    }
}

generateNewArray();
generateNewArray();

for (let i = 0; i < 2 * items.length; i++) {
    backCards[i].innerHTML = newArray[i];
}

function onCardClick(card) {

    if (!card.classList.contains('flip')) {
        movesCount++;
        moves.textContent = `Moves : ${movesCount}`;
        card.classList.add('flip');

        if (!firstCard) {
            firstCard = card;
            firstCardText = firstCard.textContent;
        } else {
            secondCard = card;
            secondCardText = secondCard.textContent;

            if (firstCardText === secondCardText) {
                firstCard = false;
                matchComplete++;
                matched.textContent = `Matched : ${matchComplete} / ${items.length}`;

                if (matchComplete === items.length) {
                    game.style.display = 'none';
                    header.style.display = 'none';
                    dialogBox.style.display = 'flex';
                    dialogImage.src = 'images/winner.png';
                    dialogTitle.textContent = 'Congratulations!';
                    playButton.textContent = 'Play Again';
                    dialogDescription.textContent = `You have successfully completed this game in ${movesCount} moves.`;
                }
            } else {
                setTimeout(function () {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    firstCard = false;
                    secondCard = false;
                }, 1000);

            }
        }
    }
}

cards.forEach((card) => {
    card.onclick = function () {
        onCardClick(card);
    };
})
