let words = ["datalists","overseas","input","index", "styles",];
let rows =9;
let columns=9;
var board;
window.onload = function(){
    showTheSearchWords();
    setWordSearchBoard();//pick any row and any cell and if in horizontal line or vertical line there exists empty gridCells whose count is words[i].length then add those word
    fillUpEmptyGridCells();//fill up the empty grid cells
    
}

function showTheSearchWords(){
    const displayContainer = document.querySelector(".words-list");
    let text = "<ul>";
    let length = words.length;
    let ul = document.createElement("ul");
    for(let i=0;i<length;i++)
    {
        let li = document.createElement("li");
        li.innerHTML= words[i];
        li.classList.add(`${words[i]}`);
        ul.appendChild(li);
    }
    displayContainer.appendChild(ul);
}
let wordSearch = document.querySelector(".search-container");
function setWordSearchBoard(){
    board=[];
    for(let i=0;i<rows;i++)
    {
        let rows=[];
        for(let j=0;j<columns;j++)
        {
            rows.push(' ');
            let gridCell = document.createElement("div");
            gridCell.id = i+"id"+j;
            gridCell.classList.add("grid-cell");
            gridCell.setAttribute("onmousedown","mouseDownFunction(this)");
            gridCell.setAttribute("onmouseover","mouseOverFunction(this)");
            gridCell.setAttribute("onmouseup","mouseLeaveFunction(this)");


            wordSearch.append(gridCell);

        }
        board.push(rows);
    }

    addletters();

}

function addletters(){
    let wordsLength = words.length;
    let i=0;
    while(i<wordsLength)//for every word in words do the below and increment i only when word[i] is put on grid
    {
        let randomrow = Math.floor(Math.random()*rows);
        let randomColumn = Math.floor(Math.random()*columns);
        if(board[randomrow][randomColumn]== " ")//if fails then loops until any one row and column is " "
        {
            if(checkIfExists(words[i],randomrow,randomColumn,0,1)==true)
            {
                addThelettersHorizontally(randomrow , randomColumn,words[i],columns);
                i++;
                continue; //if condition is satified stop the current loop 
            }
            if(checkIfExists(words[i],randomrow,randomColumn,1,0)==true)
            {
                addThelettersVertically( randomrow,randomColumn,words[i],rows);
                i++;
                continue;
            }
        }
    }
}

function addThelettersHorizontally(row,column,word,length){
    console.log("lette")
    let w=0;
    for(let i=column;i<columns;i++)
    {
            if(w<word.length)
            {
            let gridCell = document.getElementById(row+"id"+i);
            gridCell.textContent= word[w].toUpperCase();
            board[row][i]=gridCell.textContent;
            w+=1;
            }
        }
    
}
//randomly pick any row and any column , and from that row and that column check if horizontally there exists word[i].length empty grid cells . Consider words.length is 4 and randomRow is 2 and randomcolumn is 3 now we check if from board[2][3] we check if empty grid cells exists .if  exists then from [2][3] start adding the letter in grids (for horizontal)
function checkIfExists(word , r, c, i ,j){
    let count=1;
    let wordlength = word.length;

    while(r>=0 && c>=0 && r<rows && c<columns && board[r][c]== " ")
    {

        if(wordlength<=count)
        {
            return true;
        }
       count++;
       r+=i;
       c+=j;
       
    }
    return false;
}

function addThelettersVertically(row,column,word,length){
    let w=0;
    for(let i=row;i<rows;i++)
    {
            if(w<word.length)
            {
            let gridCell = document.getElementById(i+"id"+column); //i+column because we are moving vertically so i is same and column changes
            gridCell.textContent= word[w].toUpperCase();
            board[i][column]=gridCell.textContent;
            w+=1;
            }
        }
}

function fillUpEmptyGridCells(){
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<columns;j++)
        {
            if(board[i][j]==" ")
            {
                let index = Math.floor(Math.random()*26);
                index = 65+index;//uppercase 97-lowercase
                let gridCell = document.getElementById(i+"id"+j);
                gridCell.textContent= String.fromCharCode(index);
                board[i][j]=gridCell.textContent; 
            }
        }
    }
}

let selectedWord = [];
let clicking = false;
function mouseDownFunction(event)
{
    clicking=true;//when user first clicks the gridcell make a flag as true which indicates the user started to search and add that to []
    if(!selectedWord.includes(event.id))
    {
        event.classList.add("active")
        selectedWord.push(event.id);  
    }
    console.log(selectedWord);

}

function mouseOverFunction(event){
    if(clicking==true)//to which ever gridcell user hovers add that to []
    {
        if(!selectedWord.includes(event.id))
        {
            event.classList.add("active")
            selectedWord.push(event.id);  
        }
    }

}


function mouseLeaveFunction(event){
    clicking=false;
    let length = selectedWord.length;
    let text = "";
    for(let i=0;i<length;i++)
    {
        let gridCells = selectedWord[i].split("id");
        text+=board[gridCells[0]][gridCells[1]];
    }
    if(words.includes(text.toLowerCase()))
    {
        let grids = document.querySelectorAll(".grid-cell");
        grids.forEach((grid)=>{
            grid.classList.contains("active")? grid.classList.add("found"):"";
        });
        let word = document.querySelector(`.${text.toLowerCase()}`);
        console.log(word);
        word.classList.add("linethrough");
    }
    else{
        let grids = document.querySelectorAll(".grid-cell");
        grids.forEach((grid)=>{
            grid.classList.contains("active")? grid.classList.remove("active"):"";
        });
    }
    text="";
    selectedWord=[];
}

document.addEventListener("mousemove",function(e)
{
    const container = wordSearch.getBoundingClientRect();
    if(e.clientX  < container.left || e.clientX > container.right || e.clientY < container.top || e.clientY > container.bottom)
    {
       selectedWord=[];
    }
})