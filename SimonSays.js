const topLeft = document.querySelector('.top-left-Face');
const topRight = document.querySelector('.top-right-Face');
const bottomLeft = document.querySelector('.bottom-left-Face');
const bottomRight = document.querySelector('.bottom-right-Face');
// const midLeft = document.querySelector('.mid-left-Face');
// const midRight = document.querySelector('.mid-right-Face');
// const rand = document.querySelector('.active');

let score = 0;
let HiScore = 0;
let time = 0;
let prevTime =-5;
let canClick = false;

//returns a random Face within Face array
const getRandom = () => {
    const Faces = [topLeft,topRight,bottomLeft,bottomRight];
    return Faces[parseInt(Math.random() * Faces.length)];
}

let sequence = [];
let sequenceToGuess = [...sequence];

//show players which face to click
const pulse = Face => {
    return new Promise((resolve) => {
        Face.className += ' active'; //sets current divs css class to active
        setTimeout(() => {
            Face.className = Face.className.replace(' active',''); //removes active attribute

            //difficulty increases with score/time
            if(score <= 5){setTimeout(() => {resolve();}, 700);}

            else if(score > 5 && score <=9 ){setTimeout(() => {resolve();}, 600);}

            else if(score > 9){setTimeout(() => {resolve();}, 300);}

            else{{setTimeout(() => {resolve();}, 200);}}

        },1000);
    });
}

document.getElementById('score').innerHTML = score; //set initial score
document.getElementById('time').innerHTML = time; //set initial time
document.getElementById('HiScore').innerHTML = HiScore; //set initial score

//main game function, checks if player returns correct sequence
const FaceClicked = FaceClicked => {
    if(!canClick) return;
    // console.log(Face);
    const expectedPanel = sequenceToGuess.shift();//pops the first elements from the array

    if(expectedPanel === FaceClicked){
        prevTime +=8; //give player extra time
        if(sequenceToGuess.length === 0){
            //new round
            sequence.push(getRandom()); //increase sequence
            sequenceToGuess = [...sequence];
            gameStart();
            score++;
            HiScore = score;
            document.getElementById('score').innerHTML = score;
            clearTimeout(timeout)
        }
    }
    else{
        //end game
        gameWarning();
    }
}

//set border color to red
function flashAll(ele){
    document.getElementById('power').style.backgroundColor = 'red'; //set power to red
    let check = document.getElementById(ele).style.borderColor;
    if(check === 'red'){
        document.getElementById(ele).style.borderColor = 'black';
    }
    else{
        document.getElementById(ele).style.borderColor = 'red';
    }
}
let x = 1;
function gameWarning () {
    GameOverFlashing = setInterval(function () {
        x++;
        // console.log(x);
        //flashes all buttons borders to red 5 times
        flashAll('TL');
        flashAll('TR');
        flashAll('BL');
        flashAll('BR');
        flashAll('Center circle');
        if (x === 11) {
            clearInterval(GameOverFlashing);
            x =1;
        }
    }, 500);
    restartGame();
}

const gameStart = async () => {
    canClick = false;
    for(const Face of sequence){ //iterates through faces to be clicked
        await pulse(Face);
    }
    timeout = setTimeout(function (){
        gameWarning();
    },5000);

    canClick = true;
}

setInterval(function (){time++},1000);

function restartGame() {
    document.getElementById('button').disabled = false;
    score =0;
    document.getElementById('power').style.backgroundColor = 'red';
    document.getElementById('score').innerHTML = score;
    document.getElementById('HiScore').innerHTML = HiScore;
    clearInterval(myInterval); //stop timer
    clearInterval(time);
    clearTimeout(timeout);
    canClick = false;
    // restart the array sequences
    clearSequence();
}

function clearSequence(){
    // restart the array sequences
    for(let i =0;i<=sequence.length;i++){
        // console.log(sequence.shift());
        sequence.shift();
    }
    for(let i =0;i<sequenceToGuess.length-1;i++){
        // console.log(sequenceToGuess.shift());
        sequenceToGuess.shift();
    }
}
function powerClick(){ //start button clicked
    clearSequence();//
    sequence = [getRandom()];
    sequenceToGuess = [...sequence];
    document.getElementById('button').disabled = true;
    document.getElementById('power').style.backgroundColor = 'green';
    time=0;
    myInterval = setInterval(function (){ document.getElementById('time').innerHTML = time;},1000); //clock timer
    // document.getElementById('time').innerHTML = time;

    setTimeout(() => {
        gameStart(); //game starts after 3 seconds
    },4000);
}






