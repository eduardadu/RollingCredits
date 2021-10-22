var start = '1966'; //começo, onde está
var ant;

//-------------------------------------------------------SETUP + DRAW
var mainCanvas;
var allData;
var scrollOffset;

var maxVisible = 0;
var visibilityBuffer = 1;

var lastMarkerPos = null;
var lastClicked1 = null;
var lastClicked2 = null;

let fontRegular;
function preload() {
	allData = loadTable('/data/data.csv', 'csv', 'header');
	fontRegular = loadFont('/assets/fonts/IBMPlexSans-Regular.ttf');
}

function setup() {
	allData.rows.forEach((item, i) => {
		parseMovie(item.obj);
	});
	mainCanvas = createCanvas(window.innerWidth - 100, window.innerHeight * 0.4);
	settings.hoverHeight = mainCanvas.height - 50;
	settings.maxHeight = (mainCanvas.height - 50) * 0.35;
	settings.minZoomHeight = settings.maxHeight;
	mainCanvas.id('mainCanvas');
	textFont(fontRegular);

	EventListeners();
	setSubTitles();
	zoomButtons();
	constructView();

	mainCanvas.mouseMoved(function (event) {
		if (mouseX > settings['canvasSideMargins'] && mouseX < mainCanvas.width - settings['canvasSideMargins']) {
			reDraw();
			handleMarkers();
		}
	});

	mainCanvas.mouseClicked(function () {
		if (mouseX > settings['canvasSideMargins'] && mouseX < mainCanvas.width - settings['canvasSideMargins']) {
			reDraw();
			handleSubtitles();
		}
	});
	reSizeSub();
	document.querySelector('#loading').style.opacity = '0';
	document.querySelector('#loading').style.pointerEvents = 'none';
}

function draw() {}

function windowResized() {
	mainCanvas = createCanvas(window.innerWidth - 100, window.innerHeight * 0.4);
	settings.hoverHeight = mainCanvas.height - 50;
	settings.maxHeight = (mainCanvas.height - 50) * 0.35;
	settings.minZoomHeight = settings.maxHeight;
	zoomButtons();
	reSizeSub();
	constructView();
	reDraw();
}

function mouseWheel(event) {
	if (event.delta >= 0) {
		scrollOffset += Math.sqrt(event.delta * 5);
	} else {
		scrollOffset -= Math.sqrt(Math.abs(event.delta * 5));
	}

	if (scrollOffset >= settings.eachWidth) {
		moveRight();
		scrollOffset = 0;
	}
	if (scrollOffset <= -settings.eachWidth) {
		moveLeft();
		scrollOffset = 0;
	}
	reDraw();
	handleMarkers();
}

function reSizeSub() {
	var bottom = document.querySelector('#mainCanvas').offsetTop + document.querySelector('#mainCanvas').offsetHeight;
	var offset = (document.documentElement.scrollHeight - bottom) / 2;
	$('.subtitle').css('top', bottom + (mainCanvas.height * 20) / 328 + 'px');
}

//-------------------------------------------------------
//-------------------------------------------------------
//-------------------------------------------------------

function getZoneFromDate(d) {
	if (d.charAt(0) === 'm') {
		return movieZones[d.split('-')[1]];
	} else {
		var date = d.split('-');
		if (date.length == 1) {
			return yearZones[date];
		} else if (date.length == 2) {
			date = date[0] + '-' + date[1];
			return monthZones[date];
		} else if (date.length == 3) {
			date = date[0] + '-' + date[1] + '-' + date[2];
			return dayZones[date];
		}
	}
	return false;
}
