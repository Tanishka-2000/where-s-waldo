const home = document.querySelector('.home');
const game = document.querySelector('.game');
const dropDown = game.querySelector('.dropDown');
const image = game.querySelector('img');
const gameBoards = document.querySelector('.game-boards');
const boards = gameBoards.querySelectorAll('div');
const scores = document.querySelector('.scores');
const homeButtons = home.querySelectorAll('button');


let currentBoard, target;

function hideAll(){
    home.style.display = 'none';
    game.style.display = 'none';
    gameBoards.style.display = 'none';//grid
    scores.style.display = 'none';
    dropDown.style.display = 'none';
}

function changeGameBoard(e){
    currentBoard = e.target.className;
    startGame();
}

function startGame(){

    let imgSrc = './images/' + currentBoard + '.jpg';
    image.setAttribute('src', imgSrc);
    hideAll();
    game.style.display = 'block';
}

function handleClick(e){
    let x = e.offsetX;
    let y = e.offsetY;
    showDropDown({x,y});
    console.log({x,y});
}

function showDropDown(pos){
    let y = pos.y > (image.height - 200) ? image.height - 160 : pos.y + 52;
    let x = pos.x > (image.width - 200) ? image.width - 250 : pos.x + 20;
    dropDown.style.left = x + 'px';
    dropDown.style.top = y + 'px';
    dropDown.style.display = 'block';
}

boards.forEach(board => board.addEventListener('click', changeGameBoard));
game.addEventListener('click', handleClick);


// board1
//wizard: {x: 133, y:922}
// odlaw: {x:605 ,y:776}
// waldo: {x:1630 ,y:900}
// wenda: {x:934 ,y:510}


// board2
//wizard: {x: 1162, y: 1059}
// odlaw: {x: 1135, y: 790}
// waldo: {x: 535, y: 418}
// wenda: {x: 477, y: 884}

// board3
//wizard: {x: , y: } not available
// odlaw: {x: 94, y: 856}
// waldo: {x: 1534, y: 61}
// wenda: {x: 1689, y: 313}

// board4
//wizard: {x: 1488, y: 735}
// odlaw: {x: 135, y: 875}
// waldo: {x: 770, y: 791}
// wenda: {x: 563, y: 663}

// board5
//wizard: {x: 515, y: 445}
// odlaw: {x: 203, y: 447}
// waldo: {x: 1178, y: 478}
// wenda: {x: 1472, y: 507}


// board6
//wizard: {x: 1316, y: 839}
// odlaw: {x: 1057, y: 981}
// waldo: {x: 1339, y: 539}
// wenda: {x: 1126, y: 828}
