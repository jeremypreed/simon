var SFX=['res/tone01.mp3','res/tone02.mp3','res/tone03.mp3','res/tone04.mp3','res/tone05.mp3'];
var pattern = new Array();
var speed = 800;
var turn=0;
var playing = false;
var button;

//sfx
function sfx(x) {
	var sound = new Audio();
	sound.src = SFX[x];
	sound.play();
}

function init(){
	pattern = [];
	pattern.push(Math.floor((Math.random() * 4)));
	document.getElementById('count').value = ('0'+pattern.length).slice(-2);
	readPattern();
};

function start(){
	playing = true;
	init();
}

function readPattern(){
	playing = false;
	var i = 0;
	function nextColor(){
	   setTimeout(function(){  
			lightUp(pattern[i]);
			i++;
			if (i < pattern.length) { nextColor(); } 
			else {
				document.getElementById('count').value = ('0'+pattern.length).slice(-2);
				playing = true; }
	   }, speed)
	}
	nextColor();
}

function lightUp(_btn){
	switch(_btn){
		case 0:
			button = document.getElementById('green');
			break;
		case 1:
			button = document.getElementById('red');
			break;
		case 2:
			button = document.getElementById('yellow');
			break;
		case 3:
			button = document.getElementById('blue');
			break;		
	}
	
	button.style.opacity = 1;
	sfx(_btn);
	
	setTimeout(function(){
		button.style.opacity = .75;
		if (turn>=pattern.length){
			turn=0;
			pattern.push(Math.floor((Math.random() * 4)));
			readPattern();
		}
	},speed-(speed/5));
}

function check(_btn){
	if (playing) {
		if (_btn==pattern[turn]){
			lightUp(_btn);
			turn++;
		} else {
			turn=0;
			sfx(4);
			readPattern();
		}
	}
}

function fixbutton(){
	document.getElementById('green').style.opacity = .75;
	document.getElementById('red').style.opacity = .75;
	document.getElementById('yellow').style.opacity = .75;
	document.getElementById('blue').style.opacity = .75;
}