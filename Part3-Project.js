var player1 = prompt('Player One: Enter Your Name')
var player1Color = 'rgb(42, 255, 166)'

var player2 = prompt('Player Two: Enter Your Name')
var player2Color = 'rgb(240, 156, 88)'

var game_on = true
var table = $('#board tr')

function reportWin(rowNum, colNum) {
    console.log('You won starting at this row and column:');
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color)
}

function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}

var nameChange = false

function checkBottom(colIndex) {
  nameChange = false
    var colorReport = returnColor(5, colIndex)
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex)
        if (colorReport === 'rgb(255, 255, 255)') {
          nameChange = true
          return row
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one===two && one===three && one===four && one !== 'rgb(255, 255, 255)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 4; col++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
          console.log('horiz');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  // Check for Vertical Wins
  function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 3; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
          console.log('vertical');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  // Check for Diagonal Wins
  function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
          console.log('diag');
          reportWin(row,col);
          return true;
        }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
          console.log('diag');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }

  // Check for draw
  function drawCheck() {
    var draw = true
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 6; row++) {
        var color = returnColor(row, col)
        if (color === 'rgb(255, 255, 255)') {
          draw = false
        }
      }
    }
    if (draw === true) {
      return true
    }
  }

function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 7; row++) {
        $('h3').fadeOut('slow');
        $('h2').fadeOut('slow');
        $('h1').text(winningPlayer + ' has won!')
      }
    }
    game_on = false
}

// Start with Player 1
var currentPlayer = 1
var currentName = player1
var currentColor = player1Color

$('#info').text(player1 + '\'s turn.')

$('#board button').on('click', function(){
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col)
    
    changeColor(bottomAvail, col, currentColor)

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName)
        $('#board button').unbind();
    }

    drawResult = drawCheck();
    if (drawResult === true) {
      for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
          $('h3').fadeOut('slow');
          $('h2').fadeOut('slow');
          $('h1').text('Draw!')
        }
      }
    }
    
    if (nameChange === true) {
      currentPlayer = currentPlayer * -1

      if (currentPlayer === 1) {
          currentName = player1
          $('#info').text(currentName + '\'s turn')
          currentColor = player1Color
      } else{
          currentName = player2
          $('#info').text(currentName + '\'s turn')
          currentColor = player2Color
      }
    }
})