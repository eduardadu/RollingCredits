class Zone {

  constructor(dataZone){
    this.d = dataZone;          //data
    this.id= dataZone['date']; //nome se for individual, data se for grupo
  }

  //------------------------------------------------- RETURNS
  retBudget(){
    return this.d['budget'];
  }
  retRevenue(){
    return this.d['revenue'];
  }
  retFemale(){
    return this.d['female'];
  }
  retMale(){
    return this.d['male'];
  }
  retUnknown(){
    return this.d['unknown'];
  }
  retCast(){
    return this.d['numCast'];
  }
  retCrew(){
    return this.d['numCrew'];
  }
  retNumber(){
    return this.d['numMovies'];
  }
  //------------------------------------------------------SETTINGS
  setSettings(locX, locY){
    this.locX = locX;
    this.locY = locY;
    this.spaceY = settings.spaceBetweenY /2;
  }

  //--------------------------------------------------DRAW BARS
  drawBudget(cor){
    dataRep(this.locX, this.locY - this.spaceY, "budget", this.d['budget'], getMappingsArray()['maxMoney'], cor, settings.eachWidth, true);
  }

  drawRevenue(cor){
      dataRep(this.locX, this.locY - this.spaceY,"Revenue", this.d['revenue'], getMappingsArray()['maxMoney'], cor, settings.eachWidthSmall, true);
  }

  drawGender(male, female, unknown, cor1, cor2, cor3) {
    let maxW = getMappingsArray()['maxPeople']
    if(male== true && female == true && unknown==true) {
      dataRepThree(this.locX, this.locY+ this.spaceY ,"Gender", this.d['male'], this.d['female'],this.d['unknown'],  maxW, cor1, cor3, cor2 );
    } else if(male == true && female == true && unknown == false) {
      dataRepTwo(this.locX, this.locY+ this.spaceY,"Gender", this.d['male'],this.d['female'], maxW, cor1, cor2);
    } else if(male == false && female == true && unknown == true) {
      dataRepTwo(this.locX, this.locY+ this.spaceY,"Gender",  this.d['unknown'],this.d['female'], maxW, cor3, cor2);
    } else if(male == true && female == false && unknown == true) {
      dataRepTwo(this.locX, this.locY+ this.spaceY,"Gender",  this.d['male'],this.d['unknown'], maxW, cor1, cor3);
    } else if(female == true && male == false && unknown == false) {
      dataRep(this.locX, this.locY + this.spaceY ,"Female", this.d['female'], maxW, cor2, settings.eachWidth, false);
    } else if(female == false && male == true && unknown == false) {
      dataRep(this.locX, this.locY + this.spaceY,"Male", this.d['male'], maxW, cor1, settings.eachWidth, false);
    } else if(female == false && male == false && unknown == true) {
      dataRep(this.locX, this.locY + this.spaceY,"Unknown", this.d['unknown'], maxW, cor3, settings.eachWidth, false);
    }
  }

  drawRole(cast, crew, cor1, cor2){
    let maxW = getMappingsArray()['maxPeople'];
    let nCrew = 0;
    Object.keys(activeDerps).forEach((item, i) => {
      if(activeDerps[item]) {
        nCrew += this.d[item];
      }
    });
    if(cast == true && crew == true) {
      dataRepTwo(this.locX, this.locY + this.spaceY ,"Role", this.d['numCast'], nCrew, maxW, cor1, cor2);
    } else if(cast == true && crew == false) {
      dataRep(this.locX, this.locY + this.spaceY,"Cast", this.d['numCast'], maxW, cor1, settings.eachWidth, false);
    } else if(cast == false && crew == true) {
      dataRep(this.locX, this.locY + this.spaceY ,"Crew", nCrew, maxW, cor2, settings.eachWidth, false);
    }
  }


  drawNumber(cor){
    let maxW = getMappingsArray()['maxNumMovies']
    if(start.charAt(0) == "m") {
      maxW = 10;
    }
    dataRepCircle(this.locX, this.locY, "Number", this.d['numMovies'], maxW, cor);
  }


  drawProfitLoss(cor1, cor2){
    let maxW = getMappingsArray()['maxMoney'];
    var ProLoss= this.d['revenue']- this.d['budget'] ;
    if( ProLoss>0){
      dataRep(this.locX, this.locY - this.spaceY,"ProLoss", Math.abs(ProLoss), getMappingsArray()['maxMoney'], cor1, settings.eachWidth, true);
    }else{
      dataRep(this.locX, this.locY - this.spaceY,"ProLoss", Math.abs(ProLoss), getMappingsArray()['maxMoney'], cor2, settings.eachWidth, true);
    }
  }


  //----------------------------------------mouse interactions
  forceMarker() {
    stroke(colors['main']);
    line(this.locX+ settings.spaceBetweenX*(0.5),  this.locY + settings.hoverHeight/2,  this.locX +settings.spaceBetweenX*(0.5),  this.locY - settings.hoverHeight/2);
    let outputS = this.d.titles;
    if(start.charAt(0) != "m") {
      let dateS = this.id.split("-");
      outputS = dateS[0];
      if(dateS.length == 2) {
        outputS = monthShort[int(dateS[1])-1]+", "+dateS[0];
      } else if(dateS.length == 3) {
        outputS = dateS[2]+", "+monthShort[int(dateS[1])-1]+", "+dateS[0];
      }
    }
    fill(colors['main']);
    textAlign(CENTER);
    text(outputS, this.locX +settings.spaceBetweenX*(0.5),  this.locY - settings.hoverHeight/2 - 15);
    noFill();
  }

  hover(mx, my){
    if(mx > this.locX - settings.eachWidth/2 - settings.spaceBetweenX/4 && mx < this.locX + settings.eachWidth/2 + settings.spaceBetweenX/4 && my > this.locY - settings.hoverHeight/2 && my < this.locY + settings.hoverHeight/2){
      //this.forceMarker();
      return true;
    }
    return false;
  }

}
