function checkDivision(d) {
  d = d.toString();
  let date = d.split("-");
  if(checkDateBounds(d)) {
    if(date.length == 1 && increment(d).charAt(2) != d.charAt(2)) {
      return true;
    } else if(date.length == 2 && increment(d).charAt(3) != d.charAt(3)) {
      return true;
    } else if(date.length == 3 && increment(d).charAt(6) != d.charAt(6)) {
      return true;
    }
  }
  return false;
}

function displayDivider(date, x, y) {
  rectMode(CENTER);
  noStroke();
  fill(dividers['color']);
  if(dividers['dashed']) {
    let start = y - (settings['hoverHeight'])/2;
    let end = y + (settings['hoverHeight'])/2;
    let dashHeight = (end - start) / ((dividers['numDashes']*2)+1);
    for(let i = 0; i <= dividers['numDashes']*2; i+=2) {
      rect(x+settings.spaceBetweenX*(0.5), start + i*dashHeight + dashHeight/2, dividers['width'], dashHeight);
    }
  } else {
    rect(x+settings.spaceBetweenX*(0.5), y, dividers['width'], settings['hoverHeight']);
  }
  textAlign(CENTER);
  text(dividerName(date), x+settings.spaceBetweenX*(0.5),  y - settings.hoverHeight/2 - 15);
}


function referenceDividers() {
  let refHeight = settings['hoverHeight']/2 - settings['spaceBetweenY']/2;
  noStroke();
  fill(dividers['referenceColor'], 90);
  rectMode(CENTER);
  for(let i = 0; i < dividers['referenceNumBars']; i++) {
    rect(mainCanvas.width/2, (mainCanvas.height/2) - settings['spaceBetweenY']/2 - (i*refHeight/(dividers['referenceNumBars'])), mainCanvas.width, dividers['referenceWidth']);
    rect(mainCanvas.width/2, (mainCanvas.height/2) + settings['spaceBetweenY']/2 + (i*refHeight/(dividers['referenceNumBars'])), mainCanvas.width, dividers['referenceWidth']);
  }
}

function referenceLabels() {
  let refHeight = settings['hoverHeight']/2 - settings['spaceBetweenY']/2;
  noStroke();
  fill(dividers['referenceColor']);
  rectMode(CENTER);
  textAlign(RIGHT, CENTER);

  let moneyRef = getMappingsArray().maxMoney;
  let peopleRef = getMappingsArray().maxPeople;

  for(let i = 0; i < dividers['referenceNumBars']; i++) {
    let yTop = (mainCanvas.height/2) - settings['spaceBetweenY']/2 - (i*refHeight/(dividers['referenceNumBars']));
    let labelTop = refMap(yTop, mainCanvas.height/2 - settings['spaceBetweenY']/2, mainCanvas.height/2 - settings['spaceBetweenY']/2 - settings['maxHeight'], 0, moneyRef, "dough");
    text(labelTop, settings['canvasSideMargins'] - 10, yTop);
    let yBottom = (mainCanvas.height/2) + settings['spaceBetweenY']/2 + (i*refHeight/(dividers['referenceNumBars']));
    let labelBottom = refMap(yBottom, mainCanvas.height/2 + settings['spaceBetweenY']/2, mainCanvas.height/2 + settings['spaceBetweenY']/2 + settings['maxHeight'], 0, peopleRef, "peeps");
    text(labelBottom, settings['canvasSideMargins'] - 10, yBottom);
  }
}

function refMap(posY, min1, max1, min2, max2, type) {
  let mapped = parseInt(map(posY, min1, max1 , min2, max2));
  mapped = mapped.toString();
  if(mapped.length > 9) {
    mapped /= 1000000000;
    mapped = Math.round(mapped);
    if(mapped == 0) {
      mapped = "999M";
    } else {
      mapped = mapped+"B";
    }
  } else if(mapped.length > 6) {
    mapped /= 1000000;
    mapped = Math.round(mapped);
    if(mapped == 0) {
      mapped = "999K";
    } else {
      mapped = mapped+"M";
    }
  } else if(mapped.length > 3) {
    mapped /= 1000;
    mapped = Math.round(mapped);
    if(mapped == 0) {
      mapped = "999";
    } else {
      mapped = mapped+"K";
    }
  }
  if(type == "dough") {
    return "$"+mapped;
  }
  return mapped;
}
