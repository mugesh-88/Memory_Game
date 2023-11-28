const tilesConatainer = document.querySelector(".tiles");
const colors = ["aqua","aquamarine","crimson","blue","dodgerblue","gold","greenyellow","teal"];

const colorsPicklist=[...colors,...colors];
const tileCount = colorsPicklist.length;

//Game State
let revealedCount=0;
let activeTile=null;
let awaitingEndOfMove =false;

function buildTile(color){
    const tileElement=document.createElement("div");
    tileElement.classList.add("tile");
    tileElement.setAttribute("data-color",color);

    tileElement.addEventListener("click",()=>{
        if(awaitingEndOfMove){
            return;
        }
        
        tileElement.style.backgroundColor=color;

        if(!activeTile){
            activeTile=tileElement;
            return;
        }

        const colorToMatch=activeTile.getAttribute("data-color");

        if(colorToMatch===color){
            activeTile=null;
            awaitingEndOfMove=false;
            revealedCount+=2;
            if(revealedCount === tileCount){
                setTimeout(()=>{
                    //alert("You win.Refresh to Play Again");
                    const reset = document.querySelector(".refresh");
                    reset.classList.add("reset");
                    reset.innerHTML="You won. Click here to play again";
                },1500);
            }
            return;
        }

        awaitingEndOfMove =true;
        setTimeout(()=>{
            tileElement.style.backgroundColor=null;
            activeTile.style.backgroundColor=null;
            awaitingEndOfMove=false;
            activeTile=null;
        },1000);
    });

    return tileElement;
}

//Tile Build-up
for(let i=0;i<tileCount;i++){
    const randomIndex=Math.floor(Math.random()*colorsPicklist.length);
    const color= colorsPicklist[randomIndex];
    colorsPicklist.splice(randomIndex,1);
    const tile=buildTile(color);
    //console.log(color+"\n"+colorsPicklist);
    tilesConatainer.appendChild(tile);
}
