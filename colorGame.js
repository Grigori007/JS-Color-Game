console.log("Connected...");

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var tryAgainSpan = document.getElementById("message");
var colorDisplayHeader = document.querySelector(".color-display");
var newColorsButton = document.getElementById("new-colors");
var hardModeButton = document.getElementById("hard-mode");
var easyModeButton = document.getElementById("easy-mode");

var drawnColors = [];
var mysteryColor = null;
var isEasyModeOn = false;

paintSquares("#232323");
initializeGame(6);
hardModeButton.classList.add("selected");

newColorsButton.addEventListener("click", () => {
    if (isEasyModeOn){
        paintSquares("#232323");
        resetGame(3);
    } else {
        resetGame(6);
    }
});

hardModeButton.addEventListener("click", () => {
    if(isEasyModeOn){
        hardModeButton.classList.add("selected");
        easyModeButton.classList.remove("selected");
        isEasyModeOn = false;
        resetGame(6);
    }
});

easyModeButton.addEventListener("click", () => {
    if(!isEasyModeOn){
        easyModeButton.classList.add("selected");
        hardModeButton.classList.remove("selected");
        isEasyModeOn = true;
        paintSquares("#232323");
        resetGame(3);
    }
});

function initializeGame(numOfActiveSqrs){
    for (var i = 0; i < numOfActiveSqrs; i++){
        var randomizedColor = randomColor();
        squares[i].style.backgroundColor = randomizedColor;
        drawnColors.push(randomizedColor);
        squares[i].addEventListener("click", function(){
            if(this.style.backgroundColor === mysteryColor){
                paintSquaresAndBg(mysteryColor, numOfActiveSqrs);
                tryAgainSpan.textContent = "Correct!";
                newColorsButton.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#232323";
                tryAgainSpan.textContent = "Try again";
            }
        });
    }
    setMysteryColor(numOfActiveSqrs);
    displayMysteryColor();
}

function randomColor(){
    var o = Math.round;
    var r = Math.random;
    var s = 255;
    return "rgb(" + o(r() * s) + ", " + o(r() * s) + ", " + o(r() * s) +")";
}

function setMysteryColor(numOfActiveSqrs){
    var drawnIndex = Math.floor(Math.random() * numOfActiveSqrs) + 0; // 0 -> starting index
    mysteryColor = drawnColors[drawnIndex];
}

function displayMysteryColor(){
    colorDisplay.textContent = mysteryColor.toString();
}

function paintSquaresAndBg(color, numOfActiveSqrs){
    colorDisplayHeader.style.backgroundColor = color;
    for (var i = 0; i < numOfActiveSqrs; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function paintSquares(color){
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    });
}

function resetGame(numOfActiveSqrs){
    drawnColors = [];
    newColorsButton.textContent = "New colors";
    tryAgainSpan.textContent = "";
    initializeGame(numOfActiveSqrs);
}

function colorLerp(){
    
}