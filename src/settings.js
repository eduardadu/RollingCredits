var svgHeight    = 400;
var svgspace     = 60;
var svgWidth     = 60;
var svgWidthSmall= 30;

var settings = {
  'eachWidth': 10,
  'eachWidthSmall': 5,
  'spaceBetweenX': 10,
  'spaceBetweenY': 40,
  'maxHeightEllipse': 10,
  'zoomInc': 6,
  'maxZoom': 60,
  'minZoom': 6,
  'hoverHeight': 300,
  'maxHeight': 100,
  'maxZoomHeight': 8030,
  'zoomHeightInc': 30,
  'minZoomHeight': 100,
  'canvasSideMargins': 50,
  'verticalFade': 25,
  'horizontalFade': 25,
  'minEachWidth': 0,
  'maxEachWidth': 20,
  'eachWidthStep': 2,
};

var colors = {
  'budget': '#A7A7A7',
  'revenue': '#EE6E76',
  'cast': '#FAC17E',
  'crew': '#BE96FF',
  'male': '#9EE1F6',
  'female': '#F99ADE',
  'unknown': '#9A88D6',
  'numMovies': '#434343',
  'deselected': '#C1C1C1',
  'main': '#363636',
  'loss': '#A7A7A7',
  'profit': '#EE6E76',
};

var dividers = {
  'dashed': false,
  'width': 1,
  'referenceWidth': 1,
  'numDashes': 18,
  'dash': 0.5,
  'color': '#C1C1C1',
  'referenceColor': 215,
  'referenceNumBars': 4,
}
