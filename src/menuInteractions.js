
var yearsButton;
var monthsButton;
var daysButton;
var moviesButton;
var arrowleft;
var arrowright;

var interval;
var intervalZoom;
var title1  ;
var budget1 ;
var revenue1;
var people1 ;
var cast1 ;
var crew1 ;

var title2  ;
var budget2;
var revenue2;
var people2 ;
var cast2 ;
var crew2 ;

var sub1 ;
var sub2;
var subclose;
var lineblack;

var svgright;
var svgleft;

var subHR;
var subHL;
var title1H ;
var title2H ;
var RevenueH ;
var BudgetH;
var CastH ;
var CrewH ;
var LineH;

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

function setSubTitles(){

  title1       = document.querySelector('#titulo1');
  budget1      = document.querySelector('#subBudget1');
  revenue1     = document.querySelector('#subRevenue1');
  people1      = document.querySelector('#people1');
  cast1        = document.querySelector('#subActors1');
  crew1        = document.querySelector('#subCrew1');
  //----------------------------------
  title2       = document.querySelector('#titulo2');
  budget2      = document.querySelector('#subBudget2');
  revenue2     = document.querySelector('#subRevenue2');
  people2      = document.querySelector('#people2');
  cast2        = document.querySelector('#subActors2');
  crew2        = document.querySelector('#subCrew2');
  //----------------------------------
  sub2         = document.querySelector('#subleft');
  sub1         = document.querySelector('#subright');
  lineblack    = document.querySelector('#lineblack');
  subclose     = document.querySelector('#subclose');
  //----------------------------------CLICK SUBTITLE
  svgright     = document.querySelector('#svgright');
  svgleft      = document.querySelector('#svgleft');

  //----------------------------------
  svgRBudget   = document.querySelector("#right_Budget");
  svgLBudget   = document.querySelector("#left_Budget");

  svgRRevenue  = document.querySelector("#right_Revenue");
  svgLRevenue  = document.querySelector("#left_Revenue");

  svgRF        = document.querySelector("#right_Crew");
  svgLF        = document.querySelector("#left_Crew");

  svgRM        = document.querySelector("#right_Cast");
  svgLM        = document.querySelector("#left_Cast");

  svgRNum      = document.querySelector("#right_Num");
  svgLNum      = document.querySelector("#left_Num");

  subClicks    = document.querySelector("#subClicks");

  //----------------------------------HOVER SUBTITLE
  subHovers    = document.querySelector("#subHovers");

  subHR        = document.querySelector("#subHoverR");
  subHL        = document.querySelector("#subHoverL");

  title1H      = document.querySelector("#titulo1H");
  title2H      = document.querySelector("#titulo2H");

  RevenueH     = document.querySelector("#subRevenueH");
  BudgetH      = document.querySelector("#subBudgetH");

  CastH        = document.querySelector("#subCastH");
  CrewH        = document.querySelector("#subCrewH");
  LineH        = document.querySelector("#lineblackH");

}



//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

function EventListeners(){
  yearsButton  = document.querySelector('#yB');
  monthsButton = document.querySelector('#mB');
  daysButton   = document.querySelector('#dB');
  moviesButton = document.querySelector('#movB');
  arrowleft    = document.querySelector('#arrowL');
  arrowright   = document.querySelector('#arrowR');

  document.querySelector('#mainCanvas').addEventListener("mouseout", function() {
    showSubtitle=false;
    hoverOff();
  });

  document.querySelector('#mainCanvas').addEventListener("mouseover", function() {
    showSubtitle=true;
  });

  yearsButton.addEventListener('click', function(){
    if(lastMarkerPos != null) {
      d = lastMarkerPos.toString();
    } else {
      d = start.toString();
    }
    d = d.split("-");
    if(d.length != 1) {
      if(d.length > 1 && d[0] != "m") {
        start = d[0];
      } else if(d[0] === "m") {
        start = movieZones[d[1]].id.split("-")[0];
      } else {
        start = '1980';
      }
    }
    constructView();
    unselect();
    yearsButton.classList.add("selected");

    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });

  monthsButton.addEventListener('click', function(){
    let d;
    if(lastMarkerPos != null) {
      d = lastMarkerPos.toString();
    } else {
      d = start.toString();
    }
    d = d.split("-");
    if(d.length != 2 || d[0] == "m") {
      if(d.length > 1 && d[0] != "m") {
        start = d[0]+"-"+d[1];
      } else if(d[0] === "m") {
        let mDate = movieZones[d[1]].id.split("-");
        start = mDate[0]+"-"+mDate[1];
      } else {
        start = d[0]+"-01";
      }
    }
    constructView();
    unselect();
    monthsButton.classList.add("selected");

    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });

  daysButton.addEventListener('click', function(){
    if(lastMarkerPos != null) {
      d = lastMarkerPos.toString();
    } else {
      d = start.toString();
    }
    d = d.split("-");
    if(d[0] === "m") {
      start = movieZones[d[1]].id;
    } else if(d.length == 1) {
      start = d[0]+"-01-01";
    } else if(d.length == 2) {
      start = d[0]+"-"+d[1]+"-01";
    } else if(d.length == 3) {
      start = d[0]+"-"+d[1]+"-"+d[2];
    }
    constructView();
    unselect();
    daysButton.classList.add("selected");

    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });

  moviesButton.addEventListener('click', function(){
    start = "m-3000";
    constructView();
    unselect();
    moviesButton.classList.add("selected");

    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });

  arrowleft.addEventListener('mousedown', function() {
    decreaseScroll();
    interval = setInterval(decreaseScroll, 100);
  });
  arrowleft.addEventListener('mouseup', function() {
    clearInterval(interval);
  });
  arrowright.addEventListener('mousedown', function() {
    incrementScroll();
    interval = setInterval(incrementScroll, 100);
  });
  arrowright.addEventListener('mouseup', function() {
    clearInterval(interval);
  });

  document.querySelector('#zoom_out').addEventListener('mousedown', function() {
    clearInterval(intervalZoom);
    zoomOut();
    intervalZoom = setInterval(zoomOut, 100);
  });
  document.querySelector('#zoom_out').addEventListener('mouseup', function() {
    clearInterval(intervalZoom);
  });

  document.querySelector('#zoom_in').addEventListener('mousedown', function() {
    clearInterval(intervalZoom);
    zoomIn();
    intervalZoom = setInterval(zoomIn, 100);
  });
  document.querySelector('#zoom_in').addEventListener('mouseup', function() {
    clearInterval(intervalZoom);
  });

  document.querySelector('#subclose').addEventListener('click',function(){
    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
    subClicks.style.display="none";
  });
}

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------- subtitles


function subtitlePOOF(){
  sub1.style.visibility="hidden";
  sub2.style.visibility="hidden";
  lineblack.style.visibility="hidden";
  svgright.style.visibility="hidden";
  svgleft.style.visibility="hidden";
  document.querySelector('#subclose').style.visibility="hidden";
}
function subtitleSHOW1(){
  subClicks.style.display="flex";
  subHovers.style.display="none";

  sub1.style.visibility= "visible";
  lineblack.style.visibility= "visible";
  svgright.style.visibility= "hidden";
  svgleft.style.visibility= "visible";
  document.querySelector('#subclose').style.visibility="visible";
}
function subtitleSHOW2(){
  sub2.style.visibility="visible";
  svgright.style.visibility= "visible";
}



//----------------------------------------------------------------------------------- css clicks

function unselect(){
  monthsButton.classList.remove("selected");
  yearsButton.classList.remove("selected");
  daysButton.classList.remove("selected");
  moviesButton.classList.remove("selected");
}

//----------------------------------------------------------------------------------- scrolls
function incrementScroll() {
  moveLeft();
  reDraw();
  lastMarkerPos = increment(lastMarkerPos);
  var ayyImWaukinHeer = getZoneFromDate(lastMarkerPos);
  if(typeof ayyImWaukinHeer == "object") {
    ayyImWaukinHeer.forceMarker();
  }
  updateGoToVal();
}

function decreaseScroll() {
  moveRight();
  reDraw();
  lastMarkerPos = decrease(lastMarkerPos);
  var ayyImWaukinHeer = getZoneFromDate(lastMarkerPos);
  if(typeof ayyImWaukinHeer == "object") {
    ayyImWaukinHeer.forceMarker();
  }
  updateGoToVal();
}


//-----------------------------------------------------------------------------------  clicks nas barras
//-----------------------------------------------------------------------------------
