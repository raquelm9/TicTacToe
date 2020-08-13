var tokenOne = "O";
var tokenTwo = "X";
var currentPlayer = tokenOne;
var table = [[".",".","."],[".",".","."],[".",".","."]];



// Write the token in browser

function play(id, x, y){
    
    var button = document.getElementById(id);
    
    if (button.innerText === "") {
        var playerToken = changePlayer()
        button.innerText = playerToken;

        var positionX = x
        var positionY = y
        updateTable(positionX, positionY, playerToken)
    }
}

// changing token based on players
function changePlayer() {
    if (currentPlayer === tokenOne) {
        currentPlayer = tokenTwo;
    } else {
        currentPlayer = tokenOne;
    } return currentPlayer;
}

// Update original table
function updateTable(positionX, positionY, Token) {
    
    for (var i = 0 ; i < table.length ; i++) {

        if (i === positionX) {

            for (var j = 0; j < table[i].length; j++){

                if (j === positionY){
                    table[i][j] = Token;
                    
                }
            }
        }        
        
    }
    // console.log(table);
    findWinner(table);
}
    
// Finding Horizontal Winners
function horizontalWinner(table){

    for (var i = 0 ; i < table.length ; i++) {

        var array = table[i];
        var countWinnerO = 0;
        var countWinnerX = 0;

        for (var j = 0; j < array.length; j++){

            if (array[j] === "X"){
                countWinnerX=countWinnerX+1;
                if (countWinnerX === 3){
                return("winner X")
                }

            } else if (array[j] === "O"){
                countWinnerO=countWinnerO+1;
                if (countWinnerO === 3){
                return("winner O")
                }
            }
        }
    }
        
}      
   
// Finding Vertical Winners
function verticalWinner(table){
    
    for (var i = 0 ; i < table.length ; i++) {
        
        var countWinnerO = 0;
        var countWinnerX = 0;

        for (var j = 0; j < table[i].length-1; j++) {

            if (table[j][i] === "X"){

                if (table[j][i] === table[j+1][i]){
                    countWinnerX = countWinnerX + 1;

                    if ((countWinnerX === 2)){
                        return("winner X")
                    } 

                }
            }

            if (table[j][i] === "O"){

                if (table[j][i] === table[j+1][i]){
                    countWinnerO = countWinnerO + 1;

                    if ((countWinnerO === 2)){
                        return("winner O")
                    } 
                }
            }

        }
    }       
} 

// Finding Diagonal Winners
function diagonalWinner(table){

    for (var i = 0 ; i < table.length ; i++) {

        var countWinnerO = 0;
        var countWinnerX = 0;

        for (var j = 0; j < table[i].length; j++){

            if (((table[0][0] === "X")&(table[1][1] === "X")&(table[2][2] === "X"))||((table[0][2] === "X")&(table[1][1] === "X")&(table[2][0] === "X"))) {
                
                return("winner X")

            } else if (((table[0][0] === "O")&(table[1][1] === "O")&(table[2][2] === "O"))||((table[0][2] === "O")&(table[1][1] === "O")&(table[2][0] === "O"))){
               
                return("winner O")
            }
        }
    }
        
}  

// Finding Tie Result
function findTie(table){

    var count = 0

    for (var i = 0 ; i < table.length ; i++) {

        for (var j = 0; j < table[i].length; j++){

            if (table[i][j] !== "."){
                count = count + 1;
            }
        }
    } 
  if (count === 9){
      return("tie");
  }
}


function findWinner(table){
    var horizontalW = horizontalWinner(table);
    var verticalW = verticalWinner(table);
    var diagonalW = diagonalWinner(table);
    var tie = findTie(table);
 

    if ((horizontalW === "winner X") || (verticalW === "winner X")|| (diagonalW === "winner X")){
        alertWinner("Winner X")
    } else if ((horizontalW === "winner O") || (verticalW === "winner O")|| (diagonalW === "winner O")){
        alertWinner("Winner O")
    } else if (tie === "tie") {
        alertWinner("Tie");
    }
}

function restartGame() {
    $('#resetGameModal').modal('toggle')

    table = [[".",".","."],[".",".","."],[".",".","."]];
    console.log(table);

    for (var i = 0; i < 9; i++) {
        $(`#btn_${i}`).text("")
    }
    

}

function alertWinner(winnerText) {
    $('#resetGameModal .modal-body').text(winnerText);
    $('#resetGameModal').modal('toggle');
}