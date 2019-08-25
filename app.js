let _play      = _refresh = false;
let _work      = true;
let _workTime  = _minutes = 25;
let _breakTime =  5;
let _seconds   = '00';
let chronometerCall = '';
const audio         = new Audio('StartrekViewscreen.mp3');
const btnWorkUp     = document.getElementById('workUp');
const btnWorkDown   = document.getElementById('workDown');
const btnBreakUp    = document.getElementById('breakUp');
const btnBreakDown  = document.getElementById('breakDown');
const btnPlayPause  = document.getElementById('playpause');
const btnRefresh    = document.getElementById('refresh');

btnWorkUp.addEventListener   ("click", ()  => buttonWorkUp());
btnWorkDown.addEventListener ("click", ()  => buttonWorkDown());
btnBreakUp.addEventListener  ("click", ()  => buttonBreakUp());
btnBreakDown.addEventListener("click", ()  => buttonBreakDown());
btnPlayPause.addEventListener("click", ()  => buttonPlayPause());
btnRefresh.addEventListener  ("click", ()  => buttonRefresh());

function buttonWorkUp() {
	if (_workTime > 44) { return; }
	_workTime ++;
	document.getElementById("workTime").innerHTML = _workTime;
	if (_work) {
		_minutes = _workTime;
		document.getElementById("timer").innerHTML = _minutes + ':' + _seconds;
	}
};

function buttonWorkDown() {
	if (_workTime < 11) { return; }
	_workTime --;
	document.getElementById("workTime").innerHTML = _workTime;
	if (_work) {
		_minutes = _workTime;
		document.getElementById("timer").innerHTML = _minutes + ':' + _seconds;
	}
};

function buttonBreakUp() {
	if (_breakTime > 14) { return; }
	_breakTime ++;
	document.getElementById("breakTime").innerHTML = _breakTime;
	if (!_work) {
		_minutes = _breakTime;
		document.getElementById("timer").innerHTML = _minutes + ':' + _seconds;
	}
};

function buttonBreakDown() {
	if (_breakTime < 2) { return; }
	_breakTime --;
	document.getElementById("breakTime").innerHTML = _breakTime;
	if (!_work) {
		_minutes = _breakTime;
		document.getElementById("timer").innerHTML = _minutes + ':' + _seconds;
	}
};

function buttonPlayPause() {
	if (_play) {
		btnPlayPause.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
		_play = false;
		clearInterval(chronometerCall)
	} else {
		btnPlayPause.innerHTML = '<span class="glyphicon glyphicon-pause"></span>';
		chronometerCall = setInterval(chronometer, 1000)
		_play = true;
	}
	_refresh = false;
};

function buttonRefresh() {
	clearInterval(chronometerCall)
	_play = false;
	btnPlayPause.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
	if (_refresh || chronometerCall == '') {
		_refresh = false;
		_minutes = _workTime = 25;
		_breakTime = 5;
		document.getElementById("workTime").innerHTML = _workTime;
		document.getElementById("breakTime").innerHTML = _breakTime;
	} else {
		_refresh = true;
		_minutes = _workTime;
	}
	_seconds = '00';
	_work = true;
	document.getElementById("tTime").innerHTML = 'Work Time';
	document.getElementById("timer").innerHTML = _minutes + ':' + _seconds;
};

function chronometer() {
	if (_minutes > 0 || _seconds > 0) {
		if (_seconds == 0) {
			_minutes --;
			_seconds  = 60;
		}
		_seconds --;
		if (_seconds < 10) { 
			_seconds = '0' + _seconds 
		};
	} else {
		audio.play();
		if (_work) {
			_work = false;
			_minutes = _breakTime;
			document.getElementById("tTime").innerHTML = 'Break Time';
		} else {
			_work = true;
			_minutes = _workTime;
			document.getElementById("tTime").innerHTML = 'Work Time';
		}
	}
	document.getElementById("timer").innerHTML = _minutes + ':' + _seconds;
}