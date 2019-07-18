var board = getStandartMatrix();



var Play =
{
    length: 3,
    width: 3,

    draw: function (matrix)
    {
        for (var i = 1; i <= this.width; i++)
        {

            for (var j = 1; j <= this.length; j++)
            {
                var GetId = "i_" + i + "_" + j;
                if (matrix[i-1][j-1] == "O")
                {
                    if (!document.getElementById(GetId).textContent)
                    {
                        document.getElementById(GetId).innerText = "O";
                    }
                }
                if (matrix[i - 1][j - 1] == "X") {
                    if (!document.getElementById(GetId).textContent) {
                        document.getElementById(GetId).innerText = "X";
                        // console.log(GetId);

                    }
                } else
                {
                    document.getElementById(GetId).innerText = "";
                }

            }
        }
    },


    getAllWinningCombinations: function (matrix)
    {
        var Combs = [];
        for (var i = 0; i < this.length; i++) {
            Combs.push(matrix[i]);
        }
        for (var j = 0; j < this.length; j++) {
            var Arr = [];
            Arr.push(matrix[0][j]);
            Arr.push(matrix[1][j]);
            Arr.push(matrix[2][j]);
            Combs.push(Arr);
        }
       var Arr = [];
        for (var i = 0; i < this.length; i++)
        {
            for (var j = 0; j < this.width; j++)
            {
                if (i == j)
                {
                    Arr.push(matrix[i][j]);
                }
            }

        }
        Combs.push(Arr);
        var Arr = [];

        for (var i = 0; i < this.length; i++)
        {
            for (var j = 0; j < this.length; j++)
            {
                if (i == this.length - j - 1 || j == this.length - i - 1)
                {
                    Arr.push(matrix[i][j]);
                }
            }
        }
        Combs.push(Arr);
        return Combs;
    }
}
function getStandartMatrix()
{
    var matrix = [];
    var k = 0;
    for (var i = 0; i <3; i++)
    {
        matrix[i] = [];
        for (var j = 0; j < 3; j++)
        {
            matrix[i][j] = k++;
        }
    }
    return matrix;
}

function CheckMatrix( Arrays )
{
    for (var i = 0; i < Arrays.length; i++)
    {
        if (CheckArray(Arrays[i]))
        {
            if (isNaN(Arrays[i][0])) { 
                board = getStandartMatrix();
                return Arrays[i][0] == "X" ? 1 : 0;
            }
        }
        if (IsMovesLeft(board))
        {
            board = getStandartMatrix();
            return -1;
        }

    }
}
function IsMovesLeft(matrix)
{
    for (var i = 0; i < matrix.length; i++)
    {
        for (var j = 0; j < matrix[i].length; j++)
        {
            if (isNaN(matrix[i][j])) return false;
        }
    }
    return true;
}

function CheckArray(Arr)
{
    for (var i = 0; i < Arr.length; i++)
    {
        if (Arr[0] != Arr[i]) return false;
    }
    return true;
}
var onClick = function (me)
{
    var info = me.id.split("_");

    if (board[info[1] - 1][info[2] - 1] != "O" && board[info[1] - 1][info[2] - 1] != "X") board[info[1] - 1][info[2] - 1] = "X";

    var winCombs = Play.getAllWinningCombinations(board);
    var Who = CheckMatrix(winCombs);

    Play.draw(board);

    console.log(board);

    var move = FindBestMove(board);
    console.log(move);



   // console.log(winCombs);

    setTimeout(function ()
    {
        console.log("vardanik");
        if (Who == -1) {

            board = getStandartMatrix();
            Play.draw(board);

            alert("Draw Shake Your Hands");
        } else if (Who == 1) {

            board = getStandartMatrix();
            Play.draw(board);

            alert("X Has Won");
        } else if (Who == 0)
        {

            board = getStandartMatrix();
            Play.draw(board);

            alert("O Has Won");
        }
    }, 500)


}
    function Minimax(matrix,step,IsTurn )
    {

        score = CheckMatrix(matrix);

        if (score == 0)
        {
            return 0;
        }
        if (score == 1)
        {
            return -10;
        }
        if (score == -1)
        {
            return 10;
        }

        if (IsTurn) {
            var best = -1000;

            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (!isNaN(matrix[i][j])) {
                        var temp = matrix[i][j];
                        matrix[i][j] = "O";

                        best = Math.max(best, Minimax(matrix, step + 1, IsTurn));

                    matrix[i][j] = temp;
                    }
                }
            }
        } else
        {
            var best = 1000;

            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    if (!isNaN(matrix[i][j])) {
                        var temp = matrix[i][j];
                        matrix[i][j] = "X";

                        best = Math.min(best, Minimax(matrix, step + 1, IsTurn));

                    }
                    matrix[i][j] = temp;
                }
            }

        }
}
function FindBestMove(matrix)
{
    var BestVal = -1000;
    var result = [];

    for (var i = 0; i < matrix.length; i++)
    {
        for (var j = 0; j < matrix.length; j++)
        {
            if (!isNaN(matrix[i][j]))
            {
                var temp = matrix[i][j];
                matrix[i][j] = "O";
                var MoveVal = Math.max(BestVal, Minimax(matrix, 0, false));

                if (MoveVal > BestVal)
                {
                    result[0] = i;
                    result[1] = j;
                }

            }
        }
    }
    return result;
}