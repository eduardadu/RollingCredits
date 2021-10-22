var svgRBudget   = document.querySelector("#right_Budget");
var svgLBudget   = document.querySelector("#left_Budget");

var svgRRevenue  =document.querySelector("#right_Revenue");
var svgLRevenue  =document.querySelector("#left_Revenue");

var svgRF        = document.querySelector("#right_Female");
var svgLF        = document.querySelector("#left_Female");

var svgRM        = document.querySelector("#right_Male");
var svgLM        = document.querySelector("#left_Male");

var svgRNum        = document.querySelector("#right_Num");
var svgLNum        = document.querySelector("#left_Num");




//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

function labelsSVG(x){
  var maxMon = Math.max(x.retBudget(), x.retRevenue());
  var maxPeo;
  var maxNum = x.retNumber();

  var greyH;
  var redH;
  var fH;  //first either cast or male
  var sH;  //second either crew or female
  var num;


  num= map(x.retNumber(), 0, maxNum, 0, PI*(settings.maxHeightEllipse*settings.maxHeightEllipse));
  num= 2* sqrt(num)/PI;

  if(budgetOn==true){
    greyH=  map(x.retBudget(), 0, maxMon, 0, svgHeight);
    redH =  map(x.retRevenue(),0, maxMon, 0, svgHeight);
  }else{

    if(x.retRevenue() - x.retBudget() > 0){
      redH =  map(x.retRevenue(),0, maxMon, 0, svgHeight);
      greyH=0;
    }else{
      greyH=  map(x.retBudget(), 0, maxMon, 0, svgHeight);
      redH=0;
    }
  }

  if(genderOn==false){
    svgLM.setAttribute('fill', colors['cast']);
    svgLF.setAttribute('fill', colors['crew']);
    var maxPeo =x.retCast() + x.retCrew();
    fH = map(x.retCast(), 0, maxPeo, 0, svgHeight/2);
    sH = map(x.retCrew(), 0, maxPeo, 0, svgHeight/2) ;

  }else{
    svgLM.setAttribute('fill', colors['male']);
    svgLF.setAttribute('fill', colors['female']);
    var maxPeo =x.retMale() + x.retFemale();
    fH = map(x.retMale(), 0, maxPeo, 0, SVGHeight/2);
    sH = map(x.retFemale(), 0, maxPeo, 0, SVGHeight/2) ;
  }


  svgLBudget.setAttribute('d', 'M '+ svgWidth + ' -' + (greyH + svgspace) + ' h ' + svgWidth + ' v ' +  greyH + ' h -' + (svgWidth*2) + ' v -' + (greyH)+' Z');

  svgLRevenue.setAttribute('d', 'M '+ svgWidthSmall + ' -' + (redH +svgspace) + ' h ' + svgWidth + ' v ' +  redH + ' h -' + (svgWidthSmall*2) + ' v -' + (redH)+' Z');

  svgLM.setAttribute('d','M '+ svgWidth + ' ' + svgspace + ' h ' + svgWidth + ' v ' +  fH + ' h -' + (svgWidth*2) + ' v -' + (fH)+' Z');

  svgLF.setAttribute('d', 'M '+ svgWidth + ' ' + (fH + svgspace) + ' h ' + svgWidth + ' v ' +  sH + ' h -' + (svgWidth*2) + ' v -' + (sH)+' Z');

  svgLNum.setAttribute('cx', svgWidth);
  svgLNum.setAttribute('rx', num*2);
  svgLNum.setAttribute('ry', num*2);

}



//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

function TwolabelsSVG( x1,  x2){
  var maxMon = Math.max(x1.retBudget(), x1.retRevenue(), x2.retBudget(), x2.retRevenue());
  var maxNum = Math.max(x1.retNumber(), x2.retNumber());

  var greyH1;
  var redH1;
  var fH1;
  var sH1;
  var num1;

  var greyH2;
  var redH2;
  var fH2;
  var sH2;
  var num2;


  num1 = map(x1.retNumber(), 0, maxNum, 0, PI*(settings.maxHeightEllipse*settings.maxHeightEllipse));
  num2 = map(x2.retNumber(), 0, maxNum, 0, PI*(settings.maxHeightEllipse*settings.maxHeightEllipse));

  num1= 2* sqrt(num1)/PI;
  num2= 2* sqrt(num2)/PI;

  if(budgetOn==true){
    greyH1=  map(x1.retBudget(), 0, maxMon, 0, svgHeight);
    redH1 =  map(x1.retRevenue(),0, maxMon, 0, svgHeight);
    greyH2=  map(x2.retBudget(), 0, maxMon, 0, svgHeight);
    redH2 =  map(x2.retRevenue(),0, maxMon, 0, svgHeight);
  }else{
    if(x1.retRevenue() - x1.retBudget() > 0){
      redH1 =  map(x1.retRevenue(),0, maxMon, 0, svgHeight);
      greyH1=0;
    }else{
      greyH1=  map(x1.retBudget(), 0, maxMon, 0, svgHeight);
      redH1=0;
    }
    if(x2.retRevenue() - x2.retBudget() > 0){
      redH2 =  map(x2.retRevenue(),0, maxMon, 0, svgHeight);
      greyH2=0;
    }else{
      greyH2=  map(x2.retBudget(), 0, maxMon, 0, svgHeight);
      redH2=0;
    }
  }

  if(genderOn==false){

    svgLM.setAttribute('fill', colors['cast']);
    svgRM.setAttribute('fill', colors['cast']);

    svgLF.setAttribute('fill', colors['crew']);
    svgRF.setAttribute('fill', colors['crew']);

    var maxPeo =Math.max(x1.retCast() + x1.retCrew() , x2.retCast() + x2.retCrew());
    fH1 = map(x1.retCast(), 0, maxPeo, 0, svgHeight/2);
    sH1 = map(x1.retCrew(), 0, maxPeo, 0, svgHeight/2);

    fH2 = map(x2.retCast(), 0, maxPeo, 0, svgHeight/2);
    sH2 = map(x2.retCrew(), 0, maxPeo, 0, svgHeight/2)

  }else{
    svgLM.setAttribute('fill', colors['male']);
    svgRM.setAttribute('fill', colors['male']);

    svgLF.setAttribute('fill', colors['female']);
    svgRF.setAttribute('fill', colors['female']);

    var maxPeo =Math.max( x1.retMale() + x1.retFemale(), x2.retMale() + x2.retFemale());
    fH1 = map(x1.retMale(), 0, maxPeo, 0, svgHeight/2);
    sH1 = map(x1.retFemale(), 0, maxPeo, 0, svgHeight/2);
    fH2 = map(x2.retMale(), 0, maxPeo, 0, svgHeight/2);
    sH2 = map(x2.retFemale(), 0, maxPeo, 0, svgHeight/2);
  }

  svgLBudget.setAttribute('d', 'M '+ svgWidth + ' -' + (greyH1 +svgspace) + ' h ' + svgWidth + ' v ' +  greyH1 + ' h -' + (svgWidth*2) + ' v -' + (greyH1)+' Z');

  if(budgetOn==true){
    svgLRevenue.setAttribute('d', 'M '+ svgWidthSmall + ' -' + (redH1+svgspace) + ' h ' + svgWidth + ' v ' +  redH1 + ' h -' + (svgWidthSmall*2) + ' v -' + (redH1)+' Z');
    svgRRevenue.setAttribute('d', 'M '+ svgWidthSmall + ' -' + (redH2+svgspace) + ' h ' + svgWidth + ' v ' +  redH2 + ' h -' + (svgWidthSmall*2) + ' v -' + (redH2)+' Z');
  }else{
    svgLRevenue.setAttribute('d', 'M '+ svgWidth + ' -' + (redH1+svgspace) + ' h ' + svgWidth + ' v ' +  redH1 + ' h -' + (svgWidth*2) + ' v -' + (redH1)+' Z');
    svgRRevenue.setAttribute('d', 'M '+ svgWidth + ' -' + (redH2+svgspace) + ' h ' + svgWidth + ' v ' +  redH2 + ' h -' + (svgWidth*2) + ' v -' + (redH2)+' Z');
  }

  svgLM.setAttribute('d','M '+ svgWidth + ' ' + svgspace + ' h ' + svgWidth + ' v ' +  fH1 + ' h -' + (svgWidth*2) + ' v -' + (fH1)+' Z');
  svgLF.setAttribute('d', 'M '+ svgWidth + ' ' + (fH1 +svgspace) + ' h ' + svgWidth + ' v ' +  sH1 + ' h -' + (svgWidth*2) + ' v -' + (sH1)+' Z');

  svgRBudget.setAttribute('d', 'M '+ svgWidth + ' -' + (greyH2+svgspace) + ' h ' + svgWidth + ' v ' +  greyH2 + ' h -' + (svgWidth*2) + ' v -' + (greyH2)+' Z');

  svgRM.setAttribute('d','M '+ svgWidth + ' ' + svgspace + ' h ' + svgWidth + ' v ' +  fH2 + ' h -' + (svgWidth*2) + ' v -' + (fH2)+' Z');
  svgRF.setAttribute('d', 'M '+ svgWidth + ' ' + (fH2 +svgspace) + ' h ' + svgWidth + ' v ' +  sH2 + ' h -' + (svgWidth*2) + ' v -' + (sH2)+' Z');



  svgLNum.setAttribute('cx', svgWidth);
  svgLNum.setAttribute('rx', num1*2);
  svgLNum.setAttribute('ry', num1*2);

  svgRNum.setAttribute('cx', svgWidth);
  svgRNum.setAttribute('rx', num2*2);
  svgRNum.setAttribute('ry', num2*2);
}


//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------------------------------------------------------------------- UPDATE CLICKED ONES AND CALL DRAW



function drawSubtitle(newC){
  if(newC!= lastClicked1){
    if(lastClicked1!= null && lastClicked1!=""){
      if(lastClicked2!=null){
        lastClicked2= newC;
        updateDiv2(lastClicked2);
        TwolabelsSVG(lastClicked1, lastClicked2);
      }else{
        lastClicked2 = newC;
        updateDiv2(lastClicked2);
        subtitleSHOW2();
        TwolabelsSVG(lastClicked1, lastClicked2);
      }
    }else{
      lastClicked1 = newC;
      updateDiv1(lastClicked1);
      subtitleSHOW1();
      labelsSVG(lastClicked1);
    }
    $("#titulo1").html();
  }
}
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------------------------------------------------------------------- DRAWHOVER
var actualHover;
function drawHoverSubtitles(newC){
  if(lastClicked1==null){
    hoverOn();
    if(dividerType(start)==4){
      title1H.innerHTML = newC.id;
    }else{
      if(newC.retNumber() == 1) {
        title1H.innerHTML = dividZeros(newC.retNumber()) + " movie";
      } else {
        title1H.innerHTML = dividZeros(newC.retNumber()) + " movies";
      }
    }

    BudgetH.style.visibility = "hidden";
    if(profitOn) {
      document.querySelector("#subRevH1").innerHTML = "Profit ";
      document.querySelector("#subRevH2").innerHTML = " dollars";
      document.querySelector("#subBudgetH1").innerHTML = " ";
      document.querySelector("#subBudgetH2").innerHTML = " ";
      if(newC.retRevenue() - newC.retBudget() > 0) {
        RevenueH.style.color = colors['revenue'];
      } else {
        RevenueH.style.color = colors['budget'];
      }
      RevenueH.innerHTML   = dividZeros(newC.retRevenue() - newC.retBudget());
    } else {
      BudgetH.style.visibility = "visible";
      BudgetH.style.color = colors['budget'];
      RevenueH.style.color = colors['revenue'];
      document.querySelector("#subRevH1").innerHTML = "Revenue ";
      document.querySelector("#subRevH2").innerHTML = " dollars";
      document.querySelector("#subBudgetH1").innerHTML = "Budget ";
      document.querySelector("#subBudgetH2").innerHTML = " dollars";
      BudgetH.innerHTML   = dividZeros(newC.retBudget());
      RevenueH.innerHTML  = dividZeros(newC.retRevenue());
    }

    title2H.style.visibility = "hidden";
    document.querySelector("#dinTitulo2H").style.visibility= "hidden";
    if(rolesOn || genderOn) {
      title2H.style.visibility = "visible";
      document.querySelector("#dinTitulo2H").style.visibility= "visible";
      title2H.innerHTML   = dividZeros((newC.retCast() + newC.retCrew()));
    }
    document.querySelector("#subExtraH").style.visibility= "hidden";
    CastH.style.visibility= "hidden";
    CrewH.style.visibility= "hidden";
    document.querySelector("#dinExtraH").innerHTML = "&nbsp";
    document.querySelector("#dinCastH").innerHTML= " &nbsp";
    document.querySelector("#dinCrewH").innerHTML= " &nbsp";

    if(rolesOn) {
      CastH.style.visibility= "visible";
      CrewH.style.visibility= "visible";
      CastH.style.color = colors['cast'];
      CrewH.style.color = colors['crew'];
      document.querySelector("#dinCastH").innerHTML= " cast";
      document.querySelector("#dinCrewH").innerHTML= " crew";
      CastH.innerHTML     = dividZeros(newC.retCast());
      CrewH.innerHTML     = dividZeros(newC.retCrew());
    }
    if(genderOn) {
      CastH.style.visibility= "visible";
      CrewH.style.visibility= "visible";
      document.querySelector("#subExtraH").style.visibility= "visible";
      document.querySelector("#subExtraH").style.color = colors['unknown'];
      CastH.style.color = colors['female'];
      CrewH.style.color = colors['male'];

      document.querySelector("#dinCastH").innerHTML= " female";
      document.querySelector("#dinCrewH").innerHTML= " male";
      CastH.innerHTML = dividZeros(newC.retFemale());
      CrewH.innerHTML = dividZeros(newC.retMale());

      document.querySelector("#subExtraH").innerHTML = dividZeros(newC.retUnknown());
      document.querySelector("#dinExtraH").innerHTML = " unknows";
    }
  }
}


function hoverOn(){
  subClicks.style.display="none";
  subHovers.style.display="flex";
  subHR.style.visibility="visible";
  subHL.style.visibility="visible";
  title1H.style.visibility="visible";
  title2H.style.visibility="visible";
  BudgetH.style.visibility="visible";
  RevenueH.style.visibility="visible";
  CastH.style.visibility="visible";
  CrewH.style.visibility="visible";
  LineH.style.visibility="visible";
  document.querySelector("#subExtraH").style.visibility= "visible";
}

function hoverOff(){
  subClicks.style.display="flex";
  subHovers.style.display="none";
  subHR.style.visibility= "hidden";
  subHL.style.visibility= "hidden";
  title1H.style.visibility="hidden";
  title2H.style.visibility="hidden";
  BudgetH.style.visibility="hidden";
  RevenueH.style.visibility="hidden";
  CastH.style.visibility= "hidden";
  CrewH.style.visibility= "hidden";
  LineH.style.visibility= "hidden";
  document.querySelector("#subExtraH").style.visibility= "hidden";
}

//-------------------------------------------------------------------------------- HANDLE SUBTITLES, WHICH ONE WAS CLICKED
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

function handleSubtitles(){
  let a = start;
  if(start.charAt(0) === "m") {
    let a = start.split("-")[1];
  }
  var center = getZoneFromDate(a);
  if(typeof center != "undefined") {
    if(center.hover(mouseX, mouseY)) {
      lastMarkerPos = a;
      if(center.hover(mouseX, mouseY)) {
        drawSubtitle(center);
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
        drawSubtitle(leftZone);
      }
    }
    var rightZone = getZoneFromDate(right);
    if(typeof rightZone != "undefined") {
      if(rightZone.hover(mouseX, mouseY)) {
        drawSubtitle(rightZone);
      }
    }
  }
}


//--------------------------------------------------------------------------------DYNAMIC CHANGES TO SUBTITLES
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
function updateDiv1(){
  var num= dividerType(lastClicked1.id);
  if(num!=3){ //if filmes nao individuais
    if(lastClicked1.retNumber() == 1) {
      title1.innerHTML = lastClicked1.retNumber() + '<span> movie</span>';
    } else {
        title1.innerHTML = lastClicked1.retNumber() + '<span> movies</span>';
    }
  } else {
    title1.innerHTML= lastClicked1.d.titles;
  }

  document.querySelector("#subExtra1").style.display = "none";
  document.querySelector("#dinExtra1").style.display = "none";
  if(genderOn){
    document.querySelector("#dinAct1").innerHTML= " actors";
    document.querySelector("#dinCrew1").innerHTML= " actresses";
    crew1.innerHTML = (dividZeros(lastClicked1.retFemale())) ;
    cast1.innerHTML = (dividZeros(lastClicked1.retMale())) ;

    crew1.style.color = colors['female'];
    cast1.style.color = colors['male'];
    document.querySelector("#subExtra1").style.display = "inline-block";
    document.querySelector("#dinExtra1").style.display = "inline-block";
    document.querySelector("#subExtra1").style.color = colors['unknown'];
    document.querySelector("#subExtra1").innerHTML = (dividZeros(lastClicked1.retUnknown())) ;
    document.querySelector("#dinExtra1").innerText= " unknows";

  }
  if(rolesOn){
    document.querySelector("#dinAct1").innerHTML= " actors";
    document.querySelector("#dinCrew1").innerHTML= " crew members";
    crew1.innerHTML = dividZeros(lastClicked1.retCrew());
    cast1.innerHTML = dividZeros(lastClicked1.retCast());

    crew1.style.color = colors['crew'];
    cast1.style.color = colors['cast'];
  }
  if(budgetOn){
    document.querySelector("#dinBud1").innerHTML= " dollars";
    document.querySelector("#dinRev1").innerHTML= " dollars";
    budget1.innerHTML = dividZeros(lastClicked1.retBudget());
    revenue1.innerHTML = dividZeros(lastClicked1.retRevenue());

    document.querySelector("#Rev1").innerHTML= "Revenue ";
    document.querySelector("#Bud1").innerHTML= "Budget ";

  }else{
    document.querySelector("#dinBud1").innerHTML= " dollars";
    document.querySelector("#dinRev1").innerHTML= "";
    document.querySelector("#Rev1").innerHTML= " ";
    document.querySelector("#Bud1").innerHTML= "Profit ";

    if(lastClicked1.retRevenue() - lastClicked1.retBudget() > 0) {
      budget1.style.color = colors['revenue'];
    } else {
      budget1.style.color = colors['budget'];
    }

    budget1.innerHTML = (dividZeros(lastClicked1.retRevenue() - lastClicked1.retBudget()) );
    revenue1.innerHTML ="";
  }
  if(genderOn || rolesOn) {
    people1.innerHTML = dividZeros(lastClicked1.retCrew() + lastClicked1.retCast()) + '<span> people</span>';;
  }
}

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------


function updateDiv2(){
  var num= dividerType(lastClicked2.id);
  if(num!=3){ //if filmes nao individuais
    if(lastClicked2.retNumber() == 1) {
      title2.innerHTML = dividZeros(lastClicked2.retNumber()) + '<span> movie</span>';
    } else {
      title2.innerHTML = dividZeros(lastClicked2.retNumber()) + '<span> movies</span>';
    }
  }else{
    title2.innerHTML= lastClicked2.d.titles;
  }
  document.querySelector("#subExtra2").style.display = "none";
  document.querySelector("#dinExtra2").style.display = "none";
  if(genderOn){
    document.querySelector("#dinAct1").innerHTML= " actors";
    document.querySelector("#dinCrew1").innerHTML= " actresses";
    document.querySelector("#dinAct2").innerHTML= " actors";
    document.querySelector("#dinCrew2").innerHTML= " actresses";

    crew1.innerHTML = dividZeros(lastClicked1.retFemale());
    cast1.innerHTML = dividZeros(lastClicked1.retMale());

    crew2.innerHTML = dividZeros(lastClicked2.retFemale());
    cast2.innerHTML = dividZeros(lastClicked2.retMale());

    crew2.style.color = colors['female'];
    crew1.style.color = colors['female'];
    cast2.style.color = colors['male'];
    cast1.style.color = colors['male'];

    document.querySelector("#subExtra2").style.display = "inline-block";
    document.querySelector("#dinExtra2").style.display = "inline-block";
    document.querySelector("#subExtra2").style.color = colors['unknown'];
    document.querySelector("#subExtra2").innerHTML = (dividZeros(lastClicked2.retUnknown())) ;
    document.querySelector("#dinExtra2").innerText= " unknows";

  }
  if(rolesOn){
    document.querySelector("#dinAct1").innerHTML= " actors";
    document.querySelector("#dinCrew1").innerHTML= " crew members";
    document.querySelector("#dinAct2").innerHTML= " actors";
    document.querySelector("#dinCrew2").innerHTML= " crew members";

    crew1.innerHTML = dividZeros(lastClicked1.retCrew());
    cast1.innerHTML = dividZeros(lastClicked1.retCast());
    crew2.innerHTML = dividZeros(lastClicked2.retCrew());
    cast2.innerHTML = dividZeros(lastClicked2.retCast());

    crew2.style.color = colors['crew'];
    crew1.style.color = colors['crew'];
    cast2.style.color = colors['cast'];
    cast1.style.color = colors['cast'];

  }
  if(budgetOn){

    document.querySelector("#dinBud1").innerHTML= " dollars";
    document.querySelector("#dinRev1").innerHTML= " dollars";

    document.querySelector("#dinBud2").innerHTML= " dollars";
    document.querySelector("#dinRev2").innerHTML= " dollars";

    document.querySelector("#Bud1").innerHTML= "Budget ";
    document.querySelector("#Rev1").innerHTML= "Revenue ";
    document.querySelector("#Bud2").innerHTML= "Budget ";
    document.querySelector("#Rev2").innerHTML= "Revenue ";

    budget1.innerHTML = dividZeros(lastClicked1.retBudget());
    revenue1.innerHTML = dividZeros(lastClicked1.retRevenue());
    budget2.innerHTML = dividZeros(lastClicked2.retBudget());
    revenue2.innerHTML = dividZeros(lastClicked2.retRevenue());


  }else{
    document.querySelector("#dinBud1").innerHTML= " dollars";
    document.querySelector("#dinRev1").innerHTML= "";

    document.querySelector("#dinBud2").innerHTML= " dollars";
    document.querySelector("#dinRev2").innerHTML= "";

    document.querySelector("#Bud1").innerHTML= "Profit ";
    document.querySelector("#Rev1").innerHTML= " ";
    document.querySelector("#Bud2").innerHTML= "Profit ";
    document.querySelector("#Rev2").innerHTML= " ";
    if(lastClicked1.retRevenue() - lastClicked1.retBudget() > 0) {
      budget1.style.color = colors['revenue'];
    } else {
      budget1.style.color = colors['budget'];
    }
    if(lastClicked2.retRevenue() - lastClicked2.retBudget() > 0) {
      budget2.style.color = colors['revenue'];
    } else {
      budget2.style.color = colors['budget'];
    }
    budget1.innerHTML = (dividZeros(lastClicked1.retRevenue() - lastClicked1.retBudget()) );
    budget2.innerHTML = (dividZeros(lastClicked2.retRevenue() - lastClicked2.retBudget()) );

    revenue2.innerHTML ="";
    revenue1.innerHTML ="";
  }
  if(genderOn || rolesOn) {
    people2.innerHTML = dividZeros(lastClicked2.retCrew() + lastClicked2.retCast())+ '<span> people</span>';
  }
}

function dividZeros(x ) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
