//------------------------------------------------------- RECT PERSONALIZADO
function persRect(locX, locY, w, h, down){
  rectMode(CENTER);
  if(down == true) {
    rect(locX, locY- h/2, w, h);
  } else {
    rect(locX, locY+ h/2, w, h);
  }
};


//-------------------------------------------------------------------------------- FUNÇOES DE REPRESENTAÇAO
function dataRep(locX, locY, legenda, vdata, maxArray, cord, w, isDown) {
  noStroke();
  fill(cord);
  var value = map(vdata, 0, maxArray, 0, settings.maxHeight);
  persRect(settings.spaceBetweenX*(0.5) + locX, locY, w, value, isDown);
};

//----------------------------------------------------------------------------------------------------
function dataRepTwo(locX, locY, legenda, vdata1, vdata2, maxArray, cor1, cor2) {
  var value = map(vdata1, 0, maxArray, 0, settings.maxHeight);
  var value2 = map(vdata2, 0, maxArray, 0, settings.maxHeight);
  noStroke();
  fill(cor1);
  persRect(settings.spaceBetweenX*(0.5) + locX, locY , settings.eachWidth, value, false);
  fill(cor2);
  persRect(settings.spaceBetweenX*(0.5) + locX, locY + value , settings.eachWidth, value2, false);
};

//-------------------------------------------------------------------------------------------------------
function dataRepThree(locX, locY, legenda, vdata1, vdata2, vdata3, maxArray, cor1, cor2, cor3) {
  var value = map(vdata1, 0, maxArray, 0, settings.maxHeight);
  var value2 = map(vdata2, 0, maxArray, 0, settings.maxHeight);
  var value3 = map(vdata3, 0, maxArray, 0, settings.maxHeight);
  noStroke();
  fill(cor1);
  persRect(settings.spaceBetweenX*(0.5) + locX, locY , settings.eachWidth, value, false);
  fill(cor2);
  persRect(settings.spaceBetweenX*(0.5) + locX, locY + value , settings.eachWidth, value2, false);
  fill(cor3);
  persRect(settings.spaceBetweenX*(0.5) + locX, locY + value + value2 , settings.eachWidth, value3, false);
};


function dataRepCircle(locX, locY, legenda, vdata,  maxArray, cord) {
  noStroke();
  fill(cord);
  ellipseMode(CENTER);
  var value= sqrt(value)/PI;
  var value = map(vdata, 0, maxArray, 0, PI*(settings.maxHeightEllipse*settings.maxHeightEllipse));
  var d = 2 * sqrt(value)/PI;
  ellipse(settings.spaceBetweenX*(0.5) +locX, locY, d, d);
};
