//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = document.querySelector(".playerX"),
selectOBtn = document.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector(".btn"),
moodAnim = resultBox.querySelector(".mood-anim"),
xturnId = document.querySelector(".xturn-id"),
oturnId = document.querySelector(".oturn-id")


let yourId;

window.onload = () => {
    //once window loaded

    for(let i=0; i < allBox.length; i++){ //add onclick attribute in all available section's spans
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerX button clicked
        playBoard.classList.add("show"); //show the play board on playerX button clicked
        xturnId.innerHTML = `<i class="fa-solid fa-user fa-beat" style="color: #9F1871;"></i>`;
        oturnId.innerHTML = `<i class="fa-solid fa-computer" style="color: #9F1871;"></i>`;
        //console.log("You select X");
        yourId = "X";
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerO button clicked
        playBoard.classList.add("show"); //show the play board on playerO button clicked
        players.setAttribute("class","players active player"); //adding three class names in player elements
        oturnId.innerHTML = `<i class="fa-solid fa-user fa-beat" style="color: #9F1871;"></i>`;
        xturnId.innerHTML = `<i class="fa-solid fa-computer" style="color: #9F1871;"></i>`;
        //console.log("You select O");
        yourId = "O";
    }
}

let playerXIcon = "fa-solid fa-xmark"; //cross icon
let playerOIcon = "fa-solid fa-o"; //circle icon
let playerSign = "X"; //suppose player will be X
let runBot = true;

//user click function
function clickedBox(element){

    //console.log(element);
    if(players.classList.contains("player")){ //if player element has contains .player
        playerSign = "O"; //if player will be O then we'll change the sign
        element.innerHTML = `<i class="${playerOIcon}"><i>`; //adding circle icon tag inside user clickeed element
        players.classList.remove("active");
        xturnId.querySelector('i').classList.add('fa-beat');//beat the icon of player
        oturnId.querySelector('i').classList.remove('fa-beat');
        element.setAttribute("id", playerSign);
        
    }else{
        element.innerHTML = `<i class="${playerXIcon}"><i>`; //adding cross icon tag inside user clickeed element
        players.classList.add("active");
        //console.log(playerSign);
        element.setAttribute("id", playerSign);
        xturnId.querySelector('i').classList.remove('fa-beat');
        oturnId.querySelector('i').classList.add('fa-beat');//beat the icon of player
    }
    selectWinner(); //calling the winner
    playBoard.style.pointerEvents = "none";//once user select any box then user cannot select any other box until random box select
    element.style.pointerEvents = "none"; //once user select any box then that box cannot be selected again
    let randomDelayTime = ((Math.random() * 1000) + 400).toFixed(); //generating random delay time so bot will delay randomly to select box
    
    setTimeout(() => {
        bot(runBot); //calling bot function
    }, randomDelayTime); //passing random delay time
}

//bot click function
function bot(runBot){
    if(runBot){ //if runbot is true then run the following codes
        //first change the playerSign. so if user has X value in id then bot will have O
        playerSign = "O";
        let array = []; //creating empty array to store unselected box index 
        for(let i=0; i<allBox.length; i++){
            if(allBox[i].childElementCount == 0){ //if span has no any child element
                array.push(i); //inserting unclicked or unselected box index
                //console.log(i+" has no children");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
    
        // console.log(array);
        //console.log(randomBox);
        if(array.length > 0){
            //allBox[randomBox].innerHTML=
            if(players.classList.contains("player")){ //if player element has contains .player
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"><i>`; //adding cross icon tag inside user clickeed element
                players.classList.add("active");
                xturnId.querySelector('i').classList.remove('fa-beat');
                oturnId.querySelector('i').classList.add('fa-beat');//beat the icon of player
                //if user is O then the box id will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"><i>`; //adding circle icon tag inside user clickeed element
                players.classList.remove("active");
                xturnId.querySelector('i').classList.add('fa-beat');//beat the icon of player
                oturnId.querySelector('i').classList.remove('fa-beat');
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); //calling the winner
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";//once user select any box then user cannot select any other box until random box select
        playerSign="X"; //passing X value
    }
}

//select the winner
function getClass(idname){
    return document.querySelector(".box"+idname).id; //returning id name
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign ){
        return true;
    }
}

function selectWinner(){ //if one of the combination of them matched then select the winner
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) ){
        //console.log(playerSign + " is the winner" );
        runBot=false; // once match won then stop the bot
        bot(runBot);
        setTimeout( () => {
            //delaying result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        //lets show the result box
        //wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
        if(yourId == playerSign){
            wonText.innerHTML = `You won the game!`;
            moodAnim.classList.add("show");
            moodAnim.innerHTML = `<img src="g_trophy.gif" alt="Computer man" style="width:150px;height:150px;">`;
        }else{
            wonText.innerHTML = `Computer won the game!`;
            moodAnim.classList.add("show");
            moodAnim.innerHTML = `<img src="g_trophy.gif" alt="Computer man" style="width:150px;height:150px;">`;
        }
        

    }else{
        // if match has drawn
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "" ){
            runBot=false; // once match won then stop the bot
            bot(runBot);
            setTimeout( () => {
                //delaying result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            //lets show the result box
            wonText.textContent = `Match has been drawn!`;
            moodAnim.classList.add("show");
            moodAnim.innerHTML = `<img src="g_sad.gif" alt="Computer man" style="width:150px;height:150px;">`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); // reload the current page
}



