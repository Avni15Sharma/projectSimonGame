let flash;
let turn;
let player_turn;
let comp_turn;
let good;
let win;
let intervalId;
let comp_inp=[]
let player_inp=[]
const colors=["red","green","blue","yellow"]

function click_effect(btn_id){
    const elm=document.getElementById(btn_id)
    elm.classList.add('highlight')
    elm.classList.add('active')
    if(btn_id=="red"){
        playRedAudio()
    }else if(btn_id=="green"){
        playGreenAudio()
    }else if(btn_id=="blue"){
        playBlueAudio()
    }else if(btn_id=="yellow"){
        playYellowAudio()
    }
    setTimeout(()=>{
        remove_effect(btn_id)
    },100)
}
function remove_effect(btn_id){
    const elm=document.getElementById(btn_id)
    elm.classList.remove('active')
    elm.classList.remove('highlight')
}
function playRedAudio() { 
    let x = document.getElementById("redbtnaudio"); 
    x.play(); 
} 
function playGreenAudio() { 
    let x = document.getElementById("greenbtnaudio"); 
    x.play(); 
} 
function playBlueAudio() { 
    let x = document.getElementById("bluebtnaudio"); 
    x.play(); 
} 
function playYellowAudio() { 
    let x = document.getElementById("yellowbtnaudio"); 
    x.play(); 
} 

const red=document.getElementById("red")
red.addEventListener("click",()=>{
    if(player_turn){
        click_effect("red")
        player_inp.push(0)
        check()
    }
})
const green=document.getElementById("green")
green.addEventListener("click",()=>{
    if(player_turn){
        click_effect("green")
        player_inp.push(1)
        check()
    }    
})
const blue=document.getElementById("blue")
blue.addEventListener("click",()=>{
    if(player_turn){
        click_effect("blue")
        player_inp.push(2)
        check()
    }    
})
const yellow=document.getElementById("yellow")
yellow.addEventListener("click",()=>{
    if(player_turn){
        click_effect("yellow")
        player_inp.push(3)
        check()
    }    
})
function check(){
    if(player_inp[player_inp.length-1]!=comp_inp[player_inp.length-1]){
        good=false;
    }
    if(player_inp.length==20 && good){
        win=true;
        won()
        reset()
    }
    if(good==false){
        win=false;
        clearInterval(intervalId)
        lost()
        reset()
    }
    if(player_inp.length==turn && good && !win){
        turn++
        player_inp=[]
        comp_turn=true
        flash=0
        intervalId=setInterval(()=>{
            compTurn()
        },1000)
    }
}
function reset(){
    for(let i=0;i<20;i++){
        comp_inp[i]=Math.floor(Math.random()*4);
    }
    flash=0;
    turn=1;
    comp_turn=true;
    player_turn=false;
    player_inp=[]
    good=true;
    win=false;    
}
function startGame(){ 
    intervalId= setInterval(()=>{
        compTurn()
    },1000)
}
function compTurn(){
    if(flash==turn){
        clearInterval(intervalId)
        player_turn=true;
        player_inp=[]
    }else{
        player_turn=false
        click_effect(colors[comp_inp[flash]])
        flash++
    }
}

const start_btn=document.getElementById("start")
start_btn.addEventListener("click",()=>{
    reset()
    startGame()
})
const winPopup = document.getElementById("winPopup");
const closeWinPopup = document.getElementById("closeWinPopup");
const closeLosePopup = document.getElementById("closeLosePopup");
const losePopup = document.getElementById("losePopup")
function won() {
    winPopup.showModal(); 
}
function lost(){
    losePopup.showModal();
}
closeWinPopup.addEventListener("click", () => {
    winPopup.close(); 
});
closeLosePopup.addEventListener("click", () => {
    losePopup.close();
});

