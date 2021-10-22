var showSubtitle=false;




function handleMarkers() {
  let a = start;
  if(start.charAt(0) === "m") {
    let a = start.split("-")[1];
  }
  var center = getZoneFromDate(a);
  if(typeof center != "undefined") {
    if(center.hover(mouseX, mouseY)) {
      lastMarkerPos = a;
      if(showSubtitle==true){
        drawHoverSubtitles(center );
      }
    }
  }
  let left = start;
  let right = start;
  for(let i = 1; i < (maxVisible/2); i++) {
    left = decrease(left);
    right = increment(right);
    var leftZone = getZoneFromDate(left);
    if(typeof leftZone != "undefined") {
      if(leftZone.hover(mouseX, mouseY)) {
        lastMarkerPos = left;
        if(showSubtitle==true){
          drawHoverSubtitles(leftZone );
        }
      }
    }
    var rightZone = getZoneFromDate(right);
    if(typeof rightZone != "undefined") {
      if(rightZone.hover(mouseX, mouseY)) {
        lastMarkerPos = right;
        if(showSubtitle==true){
          drawHoverSubtitles(rightZone);
        }
      }
    }
  }

  updateGoToVal();
  if(start.charAt(0) == "m") {
    if(typeof movieZones[lastMarkerPos.split("-")[1]] == "object") {
      movieZones[lastMarkerPos.split("-")[1]].forceMarker();
    }
  } else {
    let z = getZoneFromDate(lastMarkerPos);
    if(typeof z == "object") {
      if(z.locX > settings['canvasSideMargins'] && z.locX < mainCanvas.width - settings['canvasSideMargins']) {
        z.forceMarker();
      }
    }
  }
}

function updateSizes() {
  maxVisible = int(mainCanvas.width - (settings['canvasSideMargins']*2) / (settings.eachWidth + settings.spaceBetweenX/2));
}

function constructView() {
  let date = start.split("-");
  if(start.charAt(0) === "m") {
    activeGoTo = document.querySelector("#go_to_movie");
  } else {
    if(date.length == 1) {
      activeGoTo = document.querySelector("#go_to_year");
    } else if(date.length == 2) {
      activeGoTo = document.querySelector("#go_to_month");
    } else if(date.length == 3) {
      activeGoTo = document.querySelector("#go_to_day");
    }
  }
  document.querySelector("#go_to_day").style.display = "none";
  document.querySelector("#go_to_month").style.display = "none";
  document.querySelector("#go_to_year").style.display = "none";
  document.querySelector("#go_to_movie").style.display = "none";
  activeGoTo.style.display ="inline-block";

  scrollOffset = 0;
  maxVisible = int(canvas.width / (settings.eachWidth + settings.spaceBetweenX/2));
  lastMarkerPos = start;
  //start = subToDate(start, int(maxVisible/2));
  reDraw();
  updateGoToVal();
  var ayyImWaukinHeer = getZoneFromDate(lastMarkerPos);
  if(typeof ayyImWaukinHeer == "object") {
    ayyImWaukinHeer.forceMarker();
  }
}

function dispZone(zone, inc) {
  if(typeof zone == "object") {
    zone.setSettings((mainCanvas.width/2) + (inc * settings.eachWidth) + (inc * settings.spaceBetweenX/2)  + scrollOffset, mainCanvas.height/2);
    if(budgetOn==true){
      if(moneys['budget']) {
        zone.drawBudget(colors['budget']);
      }
      if(moneys['revenue']) {
        zone.drawRevenue(colors['revenue']);
      }
    }else{
      zone.drawProfitLoss(colors['profit'], colors['loss']);
    }
    if(genderOn) {
      zone.drawGender(genders['male'], genders['female'], genders['unknown'], colors['male'], colors['female'], colors['unknown']);
    }
    if(rolesOn){
      zone.drawRole(roles['cast'], roles['crew'], colors['cast'], colors['crew']);
    }
    zone.drawNumber(colors['numMovies']);
  }
}

function drawMovieTimeline() {
  let movieIndex = start.split("-")[1];
  let leftIndex = movieIndex;
  let rightIndex = movieIndex;

  dispZone(movieZones[movieIndex], 0);
  for(let i = 1; i < (maxVisible/2); i++) {
    leftIndex--;
    rightIndex++;
    if(leftIndex >= 0 && leftIndex < movieZones.length) {
      dispZone(movieZones[leftIndex], -i);
    }
    if(rightIndex >= 0 && rightIndex < movieZones.length) {
      dispZone(movieZones[rightIndex], i);
    }
  }
}

//https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === "Y_AXIS") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === "X_AXIS") {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

let fallLeft = true;
function reDraw(){
  background(255);
  referenceDividers();
  let divs = [];
  if(start.split("-")[0] === "m") {
    drawMovieTimeline();
  } else {
    let leftDate = start;
    let rightDate = decrease(start);
    let rightAux = 0;
    let leftAux = 0;

    for(let i = 1; i < (maxVisible/2) + visibilityBuffer; i++) {
      //left
      if(checkDivision(decrease(leftDate)) && leftAux != i && !(!fallLeft && leftDate === (start))) {
        divs[decrease(leftDate)] = mainCanvas.width/2 + (-i * settings.eachWidth) + (-i * settings.spaceBetweenX/2)  + scrollOffset;
        //displayDivider(decrease(leftDate), mainCanvas.width/2 + (-i * settings.eachWidth) + (-i * settings.spaceBetweenX/2)  + scrollOffset, mainCanvas.height/2);
        leftAux = i+1;
      } else {
        leftDate = decrease(leftDate);
        dispZone(getZoneFromDate(leftDate), -i);
      }
      //right
      if(checkDivision(rightDate) && rightAux != i && !(fallLeft && decrease(start) == rightDate)) {
        divs[rightDate] = (mainCanvas.width/2 + (i-1) * settings.eachWidth) + ((i-1) * settings.spaceBetweenX/2)  + scrollOffset;
        //displayDivider(rightDate, (mainCanvas.width/2 + (i-1) * settings.eachWidth) + ((i-1) * settings.spaceBetweenX/2)  + scrollOffset, mainCanvas.height/2);
        rightAux = i + 1;
      } else {
        rightDate = increment(rightDate);
        dispZone(getZoneFromDate(rightDate), i-1);
      }
    }
  }

  fill(255);
  rectMode(CORNER);
  rect(0, 0, mainCanvas.width, mainCanvas.height/2 - settings['hoverHeight']/2);
  rect(0, mainCanvas.height/2 + settings['hoverHeight']/2, mainCanvas.width, mainCanvas.height/2 - settings['hoverHeight']/2);
  rectMode(CENTER);
  setGradient(0, mainCanvas.height/2 - settings['hoverHeight']/2, mainCanvas.width, settings['verticalFade'], color(255), color(255, 0), "Y_AXIS");
  setGradient(0, mainCanvas.height/2 + (settings['hoverHeight']/2) - settings['verticalFade'], mainCanvas.width, settings['verticalFade'], color(255, 0), color(255), "Y_AXIS");

  Object.keys(divs).forEach((item, i) => {
    displayDivider(item, divs[item], mainCanvas.height/2);
  });

  fill(255);
  rectMode(CORNER);
  rect(0, 0, settings['canvasSideMargins'], mainCanvas.height);
  rect(mainCanvas.width - settings['canvasSideMargins'], 0, settings['canvasSideMargins'], mainCanvas.height);
  setGradient(settings['canvasSideMargins'], 0, settings['horizontalFade'], mainCanvas.width, color(255), color(255, 0), "X_AXIS");
  setGradient(mainCanvas.width - settings['canvasSideMargins'] - settings['horizontalFade'], 0, settings['horizontalFade'], mainCanvas.width, color(255, 0), color(255), "X_AXIS");

  referenceLabels();
}

function moveRight() {
  if(checkDivision(decrease(start)) && fallLeft) {
    fallLeft = false;
  } else {
    start = decrease(start.toString());
    fallLeft = true;
  }
}

function moveLeft() {
  if(checkDivision(decrease(start)) && !fallLeft) {
    fallLeft = true;
  } else {
    start = increment(start.toString());
    fallLeft = false;
  }
}
