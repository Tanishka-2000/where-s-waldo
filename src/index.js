import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc, addDoc, getDocs, query, orderBy, limit} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9xR5qffKq3ocJTH6HoljgUSQTYffDkKM",
  authDomain: "where-s-waldo-37a7f.firebaseapp.com",
  projectId: "where-s-waldo-37a7f",
  storageBucket: "where-s-waldo-37a7f.appspot.com",
  messagingSenderId: "614367294900",
  appId: "1:614367294900:web:0456fc55fa7b052d81aee1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//////////////////////////////////////////////////////

const home = document.querySelector('.home');
const homeButtons = home.querySelectorAll('button');
const boardHeading = home.querySelector('.board-heading');

const navBoardHeading = document.querySelector('.current-board');
const navHomeBtn = document.querySelector('.homeBtn');
const images = document.querySelectorAll('nav img');

const game = document.querySelector('.game');
const dropDown = game.querySelector('.dropDown');
const dropDownDivs = dropDown.querySelectorAll('div');
const image = game.querySelector('img');
const msgDiv = game.querySelector('.msg');
const formDiv = game.querySelector('.formDiv');
const form = formDiv.querySelector('form');

const gameBoards = document.querySelector('.game-boards');
const boards = gameBoards.querySelectorAll('div');
const scores = document.querySelector('.scores');
// cohst userList = scores.querySelector('.list');

let currentBoard = 'board1';
let target;
const found = [];
let start, end;

function hideAll(){
    home.style.display = 'none';
    game.style.display = 'none';
    gameBoards.style.display = 'none';//grid
    scores.style.display = 'none';
    dropDown.style.display = 'none';
}

function changeGameBoard(e){
    currentBoard = e.target.className;
    boardHeading.textContent = 'Game Board '+currentBoard.slice(-1);
    navBoardHeading.textContent = 'Game Board '+currentBoard.slice(-1);
    hideAll();
    home.style.display = 'block';
}

function resetControls(){
    target = {};
    found.length = 0;
    images.forEach(img => img.style.borderColor = 'red');
}

function startGame(){

    let imgSrc = './images/' + currentBoard + '.jpg';
    image.setAttribute('src', imgSrc);
    hideAll();
    game.style.display = 'block';
    start = new Date();
}

function handleClick(e){
    let x = e.offsetX;
    let y = e.offsetY;
    showDropDown({x,y});
    target = {x,y};
}

function showDropDown(pos){
    let y = pos.y > (image.height - 200) ? image.height - 220 : pos.y + 5;
    let x = pos.x > (image.width - 200) ? image.width - 220 : pos.x + 5;
    dropDown.style.left = x + 'px';
    dropDown.style.top = y + 'px';
    dropDown.style.display = 'block';
}

function checkPosition(e){
    dropDown.style.display = 'none';
    let name = e.target.className;
    // console.log(name);

    getDoc(doc(db, currentBoard, name))
    .then(docSnap => {
        let pos = docSnap.data();
        checkPoints(pos, target, name);
    });

    e.stopPropagation();
}

function checkPoints(posFromDb, posClicked, name){
    if ((posClicked.x > posFromDb.x-30) && (posClicked.x < posFromDb.x+30)
    && (posClicked.y > posFromDb.y-30) && (posClicked.y < posFromDb.y+30)){
            // console.log(true);
            found.push(name);
            success();
    }else{
        // console.log(false);
        failure();
    }
}

function success(){
    let name = found[found.length - 1]
    document.querySelector(`img[alt=${name}]`).style.borderColor = 'green';
    msgDiv.querySelector('h1').textContent =  'Congratulations, you found ' + name;
    msgDiv.style.display = 'block';

    setTimeout(function(){
        msgDiv.style.display = 'none';
    },1000);

    if(gameOver()){
         formDiv.style.display = 'flex';
     }
}

function failure(){
    msgDiv.querySelector('h1').textContent = 'Incorrect!';
    msgDiv.style.display = 'block';

    setTimeout(function(){
        msgDiv.style.display = 'none';
    },1000);
}

function gameOver(){
    end = new Date();
    let time = (end - start)/1000;
    form.querySelector('h1').textContent = 'Time taken: ' + time + 's';
    return ((currentBoard === 'board3' && found.length === 3) || (currentBoard !== 'board3' && found.length === 4));
}

function saveUser(e){
    e.preventDefault();
    let name = form.name.value;
    let time = (end - start)/1000;
    // form.querySelector('h1').textContent = 'Time taken: ' + time + 's';
    addDoc(collection(db,'scores'),{
        name: name,
        time: time,
    }).then(x => {
        console.log('saved');
        showHome();
    }).catch(e => console.log(e.message));
}

function selectBoard(){
    hideAll();
    gameBoards.style.display = 'grid';
}

function showScores(){
    hideAll();
    scores.style.display = 'block';
    getDocs(query(collection(db,'scores'), orderBy('time'), limit(10)))
    .then(querySnapshot => {
        let list = [];
        querySnapshot.docs.forEach(doc => {
            list.push({...doc.data()});
        });
        list.forEach(user => {
            let div = document.createElement('div');

            let h1 = document.createElement('h1');
            h1.textContent = user.name;
            div.appendChild(h1);

            let h2 = document.createElement('h1');
            h2.textContent = user.time;
            div.appendChild(h2);

            scores.appendChild(div);
        });

    })
}

function showHome(){
    hideAll();
    resetControls();
    home.style.display = 'block';
}

boards.forEach(board => board.addEventListener('click', changeGameBoard));
image.addEventListener('click', handleClick);
dropDownDivs.forEach(div => div.addEventListener('click', checkPosition));


navHomeBtn.addEventListener('click', showHome);

homeButtons[0].addEventListener('click', startGame);
homeButtons[1].addEventListener('click', selectBoard);
homeButtons[2].addEventListener('click', showScores);
form.addEventListener('submit', saveUser);

hideAll();
showHome();
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
