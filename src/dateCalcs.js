//---------------------------------------------------------------------INCREMENT YEAR, MONTH, DAY

var meses=['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

var monthStr=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthShort=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


function increment(date){
  var dateCell = date.split("-");
  var newDate;
  if(date.charAt(0) === "m") {
    let index = int(dateCell[1]) + 1;
    newDate = dateCell[0]+"-"+index;
  } else {
    if(dateCell.length == 1) {                      //Anos
      dateCell[0]++;
      newDate = dateCell[0];
    } else if(dateCell.length == 2) {               //Meses
      if(dateCell[1]==12){
        dateCell[0]++;
        dateCell[1]='01';
      }else{
        dateCell[1]++;
        dateCell[1] = ("0" + dateCell[1]).slice(-2);
      }
      newDate= dateCell[0] + '-' + dateCell[1];
    } else if(dateCell.length == 3) {               //Dias
      newDate = checkEndMonth(dateCell[0], dateCell[1], dateCell[2]);
    }
  }
  return newDate.toString();
}

//----------------------------------------------------------------------------------
function decrease(date){
  var dateCell = date.split("-");
  var newDate;

  if(date.charAt(0) === "m") {
    let index = int(dateCell[1]) - 1;
    newDate = dateCell[0]+"-"+index;
  } else {
    if(dateCell.length == 1) {                      //Anos
      dateCell[0]--;
      newDate = dateCell[0];
    } else if(dateCell.length == 2) {               //Meses
      if(dateCell[1] != 01){
        dateCell[1]--;
      }else{
        dateCell[1]=12;
        dateCell[0]--;
      }
      dateCell[1] = ("0" + dateCell[1]).slice(-2);

      newDate= dateCell[0] + '-' + dateCell[1];
    } else if(dateCell.length == 3) {               //Dias
      newDate = checkBeginMonth(dateCell[0], dateCell[1], dateCell[2]);
    }
  }
  return newDate.toString();
}

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

function checkEndMonth(year,month, day){
  var y=year;
  var m = month;
  var d= day;
  var newDate;
  if(([1,3,5,7,8,10,12].includes(parseInt(month)) && d==31) || ([4,6,9,11].includes(parseInt(month)) && d==30)){
    d='01';
    if(parseInt(month)==12){
      y++;
      m='01';
    }else{
      m++;
    }
  }else if((parseInt(month)==2 && parseInt(year)%4==0 && parseInt(day)==29) || (parseInt(month)==2 && parseInt(year)%4!=0 && parseInt(day)==28)){
    d='01';
    m='03';
  }else{
    d++;
  }
  m = ("0" + m).slice(-2);
  d = ("0" + d).slice(-2);
  newDate = y+ '-' + m + '-' + d;
  return newDate;
}

//-----------------------------------------------------------------------------

function checkBeginMonth(year, month, day){
  var y = year;
  var m = parseInt(month);
  var d = parseInt(day);
  var newDate;

  if(d == 1){
    if(month == 1){
      m = 12;
      y--;
      d = 31;
    } else {
      if(meses[month-2] == 31){
        d=31;
        m=month-1;

      }else if(meses[month-2]==30){
        d=30;
        m=month-1;
      }else if(meses[month-2]==29){
        if( y%4==0){
          d=29;
        }else{
          d=28;
        }
      }
      m=month-1;
    }
  } else {
    d--;
  }
  m = ("0" + m).slice(-2);
  d = ("0" + d).slice(-2);
  newDate = y+ '-' + m + '-' + d;
  return newDate;
}

//-----------------------------------------------------------------------------

function checkDateBounds(date_to_check) {
  var d = date_to_check.split("-");
  var max = lastDate.split("-");
  var min = firstDate.split("-");
  if(d.length == 1) {
    d = d[0];
    max = max[0];
    min = min[0];
  } else if(d.length == 2) {
    d = d[0]+"-"+d[1];
    max = max[0]+"-"+max[1];;
    min = min[0]+"-"+min[1];;
  } else if(d.length ==3) {
    d = d[0]+"-"+d[1]+"-"+d[2];
    max = max[0]+"-"+max[1]+"-"+max[2];
    min = min[0]+"-"+min[1]+"-"+min[2];
  }

  if(compareDates(d, max) == 1 || compareDates(d, min) == 2) {
    return false;
  }
  return true;
}

//-----------------------------------------------------------------------------

function compareDates(d1, d2) {
  // 1 -> d1 > d2
  // 0 - > d1 == d2
  // 2 - > d1 < d2

  let n_d1 = d1.split("-");
  let n_d2 = d2.split("-");

  if(parseInt(n_d1[0]) > parseInt(n_d2[0])) {
    return 1;
  } else if(parseInt(n_d1[0]) < parseInt(n_d2[0])) {
    return 2;
  } else {
    if(parseInt(n_d1[1]) > parseInt(n_d2[1])) {
      return 1;
    } else if(parseInt(n_d1[1]) < parseInt(n_d2[1])) {
      return 2;
    } else {
      if(parseInt(n_d1[2]) > parseInt(n_d2[2])) {
        return 1;
      } else if(parseInt(n_d1[2]) < parseInt(n_d2[2])) {
        return 2;
      } else {
        return 0;
      }
    }
  }
}

//-----------------------------------------------------------------------------

function addToDate(date, ammount) {
  for(let i = 0; i < ammount; i++) {
    date = increment(date.toString());
  }
  return date;
}

function subToDate(date, ammount) {
  for(let i = 0; i < ammount; i++) {
    date = decrease(date.toString());
  }
  return date;
}

//-----------------------------------------------------------------------------

function dividerName(d) {
  let date = d.split("-");
  if(date.length == 1) {
    return (int(d.slice(0, d.length-1))+1)+"0s";
  } else if(date.length == 2) {
    return int(date[0])+1;
  }else if(date.length == 3) {
    return monthShort[increment(date[0]+"-"+date[1]).split("-")[1]-1];
  }
  return "";
}


//------------------------------------------------------------------------------

/*
function dividerType(d){
  console.log(d);
  date = d.split("-");
  return date.length;
} */

function dividerType(d){
  date = d.split("-");
  if(d.charAt(0) == 'm'){
    return 4;
  }else{
    return date.length;
  }
}
