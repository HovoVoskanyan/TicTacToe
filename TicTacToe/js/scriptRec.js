var board = GenerateStandartMatrix();
var point = 0;
//console.log(board);
Math.
var onClick= function (me)
{
    var info = me.id.split('_');
    
    if(board[info[1]-1][info[2]-1]!="X" && board[info[1]-1][info[2]-1]!="O" )
    {
        
        board[info[1]-1][info[2]-1]="X";
        //ongoing[info[1]-1][info[2]-1]="X";
        
    }
   // console.log("the board",board);
    var ongoing=GenerateStandartMatrix();
   // console.log("start",ongoing);
    for(var i=0;i<board.length;i++)
    {
        for(var j=0;j<board.length;j++)
        {
            if(board[i][j]=="X"||board[i][j]=="O")
            {
                ongoing[i][j]=board[i][j] ;
                //console.log("vayhorsareev",ongoing);

            }else{
                ongoing[i][j]=4;
                //console.log("vayhosadawedaareev",ongoing);

            }
        }
    }
    if(point==0)
    {
        board[1][1]=="X"?board[0][2]="O":board[1][1]="O";
        point++;
    }else
    {
        //console.log("ongoing",ongoing);
       // console.log("board",board);
       // console.log("This is ongoing matrix" );
        var bestMove = FindBestMove(ongoing);
       // console.log("Optimal move is  "+bestMove); 
        board[bestMove[0]][bestMove[1]]="O";
        point++;
    }
    DrawMatrix(board);
}


function FindBestMove(MyMatrix)
{
    var BestVal = -1000;
    var results =[];
   // console.log(MyMatrix);
    for(var i=0; i<MyMatrix.length;i++)
    {
        for(var j=0;j<MyMatrix.length;j++)
        {
            if(!isNaN(MyMatrix[i][j]))
            {
                temp = MyMatrix[i][j];
                MyMatrix[i][j]="O";
                var moveValue=MiniMax(MyMatrix,0,false);
               // console.log("this is move Value");
               // console.log(moveValue);

                MyMatrix[i][j]=temp;
                if(moveValue>BestVal)
                {
                    results=[];
                    BestVal=moveValue;
                    results.push(i);
                    results.push(j);
                   // console.log(results);
                }
            }
        }
    }
    console.log("the value of the best move is  "+BestVal);
    return results;
}


function MiniMax(matrix1,step,myMove)
{
   
    var score = Evaluate(matrix1);
    console.log(matrix1,"This is matrix")
    console.log(step,score);
    //  if(step>3)
    //  {
    //      return 5;
    //  }
    if(score == 10)
    {
        return score;
    }
    if(score == -10)
    {
        return score;
    }
    if(score == 0)
    {
        return score;
    }
    //console.log(matrix1);
   // return 
    if(myMove)
    {
        var best = -1000;
       // console.log(matrix1,"bababa");
        for(var i=0;i<matrix1.length;i++)
        {
            for(var j=0;j<matrix1.length;j++)
            {
                if(!isNaN(matrix1[i][j]))
                {
                    var temp= matrix1[i][j];
                    matrix1[i][j] = "O";
                    return;
                   best=Math.max(best,MiniMax(matrix1,step+1,!myMove));
                   matrix1[i][j] =temp;
                   // console.log(matrix1);
                }
            }
        }
        return best;
    }
    else 
    {
        var best =1000;
        for(var i=0;i<matrix1.length;i++)
        {
            for(var j=0;j<matrix1.length;j++)
            {
               var temp = matrix1[i][j];
                matrix1[i][j]="X";
                best = Math.min(best,MiniMax(matrix1,step+1,!myMove));
                //console.log(matrix1);
                matrix1[i][j]=temp;
            }
        }
        return best;
    }

}

function isMovesLeft(board) 
{ 
    for (var i = 0; i<3; i++) 
    {
        for (var j = 0; j<3; j++) 
        {
            if (!isNaN(board[i][j])) 
            {
                return true; 
            }
        }
    }
    return false; 
} 
function Evaluate(matrixprop)
{
    if(MatrixCheck(matrixprop)==0)
        {
           
            return 10;
        }else if(MatrixCheck(matrixprop)==1)
        {
            
            return -10;
   
        }else if(MatrixCheck(matrixprop)==-1)
        {
           
           return 0;
        }     
}

function GenerateStandartMatrix()
{
   var k =0;
    var board=[];
   for(var i =0;i<3;i++)
   {
       board[i]=[];
       for(var j =0;j<3;j++)
       {
           
           board[i][j]=k;
           k++;
       }
   }
  // console.log(board);
   return board;
}

function DrawMatrix(matrix)
 {
    for(var i =1;i<=3;i++)
    {
        for(var j =1;j<=3;j++)
        {
            var getID ="i_"+i+"_"+j;
            if(matrix[i-1][j-1]=="O")
            {
                if(!document.getElementById(getID).textContent)
                {
                    document.getElementById(getID).innerText="O";
                    setTimeout(function(){},0);
                }
            }
            if(matrix[i-1][j-1]=="X")
            {
                if(!document.getElementById(getID).textContent)
                {
                    document.getElementById(getID).innerText="X";
                    //console.log(matrix);
                    setTimeout(function(){},0);
                }
                
            }
            if(matrix[i-1][j-1]!="X" && matrix[i-1][j-1]!="O")
            {
                document.getElementById(getID).innerText="";
                setTimeout(function(){},0);
            }
        }
    }
 }


 function getAllWinningCombinations(matrix2)
 {
    var Combs =[];
    var colums =[];
   // Combs.push("toxer");

    for(var i=0;i<matrix2.length;i++)
    {
        Combs.push(matrix2[i]);
    }
  //  Combs.push("syuner");
    for(var i =0; i<matrix2.length;i++)
    {
        colums=[];
       colums.push(matrix2[0][i]);
       colums.push(matrix2[1][i]);
       colums.push(matrix2[2][i]);

      // console.log("etzibily");
        //console.log(colums);

        Combs.push(colums);

    }
   // Combs.push("ankyunagcer");
    //console.log(GetDiagonal(3,0));
    //console.log(GetDiagonal(0,3));
    Combs.push(GetDiagonal(3,0,matrix2),GetDiagonal(0,3,matrix2));
    
    return Combs;
 }
 function CheckArray(array)
 {
     var Istrue=true;
     for(var i = 0;i<array.length;i++)
     {
        // console.log("asdad");
         if(array[0]!=array[i])
         {
            // console.log(array[0]+array[i]);
            Istrue=false;
         }
     }
     return Istrue;
 }

 function GetDiagonal(start,end,matrix)
{
    var Arr=[];
    if(start<end)
    {
        for( var x=start;x<end;x++)
        {
            Arr.push(matrix[x][x]);
        }
       
    }else
    {
        for(var x=0;x<matrix.length;x++)
        {
            Arr.push(matrix[start-1-x][x]);
        }
        
    }
    return Arr;

}

function XorO (Arr)
 {
    if(Arr[0]=='O')
    {
        
        return 0;
    }else if(Arr[0]=='X')
    {
        return 1;
    }
 }

 function CheckArray(array)
 {
     var Istrue=true;
     for(var i = 0;i<array.length;i++)
     {
        // console.log("asdad");
         if(array[0]!=array[i])
         {
            // console.log(array[0]+array[i]);
            Istrue=false;
         }
     }
     return Istrue;
 }

 function MatrixCheck(matrix)
 {
    //var Arr = [];
    
    for(var i=0;i<getAllWinningCombinations(matrix).length;i++)
    {
        if(CheckArray(getAllWinningCombinations(matrix)[i]))
        {
            return XorO(getAllWinningCombinations(matrix)[i]);
        }
    }
       // Arr=[];

        var draw =true;
        for(var i=0;i<matrix.length;i++)
        {
            for(var j=0;j<matrix.length;j++)
            {
                if(!isNaN(matrix[i][j])) draw =false;
            }
        }
        if(draw) return -1;
    }