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
            alert(Arrays[i][0] + " Has Won");
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

    if (board[info[1] - 1][info[2] - 1] != "O" && board[info[1] - 1][info[2] - 1] !="X") board[info[1] - 1][info[2] - 1] = "X";

    var winCombs = Play.getAllWinningCombinations(board);

    console.log(board);
   // console.log(winCombs);

    Play.draw(board);
    setTimeout(CheckMatrix(winCombs), 10);

    if (!isNaN(CheckMatrix(winCombs))) {
        board = getStandartMatrix();
    }
}