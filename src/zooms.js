var zoomVert = true;


function zoomIn() {
  if(zoomVert) {
    if(settings['maxHeight'] + settings['zoomHeightInc'] <= settings['maxZoomHeight']) {
      settings['maxHeight'] += settings['zoomHeightInc'];
      reDraw();
    }
  } else {
    if(settings['eachWidth'] + settings['eachWidthStep'] <= settings['maxEachWidth']) {
      settings['eachWidth'] += settings['eachWidthStep'];
      settings['eachWidthSmall'] = settings['eachWidth']/2;
      settings['maxHeightEllipse'] = settings['eachWidth'];
      settings['spaceBetweenX'] = settings['eachWidth'];
      reDraw();
    }
  }
}

function zoomOut() {
  if(zoomVert) {
    settings['maxHeight'] -= settings['zoomHeightInc'];
    if(settings['maxHeight'] < settings['minZoomHeight']) {
      settings['maxHeight'] = settings['minZoomHeight'];
    }
    constructView() 
    reDraw();
  } else {
    if(settings['eachWidth'] - settings['eachWidthStep'] > settings['minEachWidth']) {
      settings['eachWidth'] -= settings['eachWidthStep'];
      settings['eachWidthSmall'] = settings['eachWidth']/2;
      settings['maxHeightEllipse'] = settings['eachWidth'];
      settings['spaceBetweenX'] = settings['eachWidth'];
      constructView()
      reDraw();
    }
  }
}

function zoomButtons() {
  var cont = document.querySelector("#zooms");
  var rightOffset = document.querySelector("#mainCanvas").offsetLeft + document.querySelector("#mainCanvas").offsetWidth - settings['canvasSideMargins'];
  cont.style.left = (rightOffset - cont.offsetWidth)+"px";
}

$( document ).ready(function() {
  $('#rotateZoom').click(function() {
    if(zoomVert) {
      $('#rotateZoom').css("transform", "translate(0, -0.25rem) rotate(45deg)");
      zoomVert = false;
    } else {
      $('#rotateZoom').css("transform", "translate(0, -0.25rem) rotate(-45deg)");
      zoomVert = true;
    }
  });

  $('#resetZoom').click(function() {
    settings['eachWidth'] = 10;
    settings['eachWidthSmall'] = 5;
    settings['spaceBetweenX'] = 10;
    settings['maxHeightEllipse'] = 10;
    settings['maxHeight'] = 130;
    settings.hoverHeight = mainCanvas.height-50;
    settings.maxHeight = (mainCanvas.height-50)*0.35;
    settings.minZoomHeight = settings.maxHeight;
    reDraw();
  });

});
