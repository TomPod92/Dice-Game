//---------------------------------------------------
//---------------NEW GAME SET-UP --------------------
//---------------------------------------------------
var scores, round_score, active_player, game_playing, last_roll, final_score;
new_game();

//---------------------------------------------------
//---------------LETS PLAY BUTTON--------------------
//---------------------------------------------------
document.querySelector('.play').addEventListener('click', new_game)

//---------------------------------------------------
//---------------ROLL DICE --------------------------
//---------------------------------------------------
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (game_playing) {
        //1. Random number
        var dice = Math.floor(Math.random()*6)+1;

        //2. Display the random dice
        var dice_DOM = document.querySelector('.dice')
        dice_DOM.style.display = 'block';
        dice_DOM.src = 'dice-' + dice +'.png';
        
        //3. Updade the round score if the rolled number was not ONE
        if (last_roll === 6 && dice === 6) {
            scores[active_player]=0;
            document.querySelector('#score-' + active_player).textContent = '0';
            document.querySelector('.change1').classList.toggle('show');
            next_player();
            game_playing=false;
            setTimeout(game,1500);
            setTimeout(show1, 1500);
        } else if (dice > 1) {
            round_score += dice;
            document.querySelector('#current-' + active_player).textContent = round_score;
        } else {
            document.querySelector('.change').classList.toggle('show');
            next_player();
            game_playing=false;
            setTimeout(game,1500);
            setTimeout(show, 1500);
        }
        
        last_roll = dice;
    }
    
});

//---------------------------------------------------
//---------------HOLD BUTTON-------------------------
//---------------------------------------------------
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(game_playing) {
        //1. Add current score to global score
        scores[active_player] +=round_score;

        //2. Update user interface
        document.querySelector('#score-' + active_player).textContent = scores[active_player];

        //3. Check if active player won the game
        if (scores[active_player] >= final_score) {
            document.querySelector('#name-' + active_player).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + active_player + '-panel').classList.add('winner');
            document.querySelector('.player-' + active_player + '-panel').classList.toggle('active');
            game_playing = false;
        } else {
            next_player(); 
        } 
    }
    
});

//---------------------------------------------------
//---------------RESTART GAME BUTTON-----------------
//---------------------------------------------------
document.querySelector('.btn-restart').addEventListener('click', new_game);

//---------------------------------------------------
//---------------NEW GAME BUTTON---------------------
//---------------------------------------------------

//document.querySelector('.btn-new').addEventListener('click', )  //zrobic!!!!!!!!!!!!!

//---------------------------------------------------
//---------------RULES BUTTON---------------------
//---------------------------------------------------

document.querySelector('.rulesButton').addEventListener('click', function() {
    document.querySelector('.rules').classList.toggle('rulesShow');
})

//---------------------------------------------------
//---------------FUNCTION----------------------------
//---------------------------------------------------
function new_game() {
    //it got chainged again
    document.querySelector('.rules').classList.remove('rulesShow');
    scores = [0,0];
    round_score = 0;
    //var active_player = Math.round(Math.random());
    active_player = 0;
    game_playing=true;
    
    //setting player names
    var name_0 = document.querySelector('.player_1').value;
    var name_1 = document.querySelector('.player_2').value;
   
    if (name_0) document.querySelector('#name-0').innerHTML = name_0;
    else document.querySelector('#name-0').textContent = 'Player 1';

    if (name_1) document.querySelector('#name-1').textContent = name_1;
    else document.querySelector('#name-1').textContent = 'Player 2';

    //setting vinal value
    var total = document.querySelector('.final_score').value;
    
    if(total) final_score = total;
    else final_score = 100;

    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function next_player() {
        round_score = 0;
        document.getElementById('current-0').textContent = round_score;
        document.getElementById('current-1').textContent = round_score;
        
        active_player === 0 ? active_player = 1 : active_player = 0; //changing active player from 0 to 1 and from 0 to 1
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';        
}

function show() {
    document.querySelector('.change').classList.toggle('show');  
}

function show1() {
    document.querySelector('.change1').classList.toggle('show');  
}

function game() {
    game_playing=true;
}








//document.querySelector('#current-' + active_player).textContent = dice;
