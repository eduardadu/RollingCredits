var activeGoTo;
$( document ).ready(function() {
  $("#go_to_month").change(function() {
    goToDate(event.target.value);
  });
  $("#go_to_year > form > input").on('input', function() {
    goToDate(event.target.value);
  });
  $("#go_to_day").change(function() {
    goToDate(event.target.value);
  });
  $("#go_to_movie > form > input").on('input', function() {
    goToMovie(event.target.value);
  });
});

function goToDate(d) {
  if(checkDateBounds(d) && d.length > 0) {
    let date = d.split("-");
    if(date.length == 1) {
      activeGoTo = document.querySelector("#go_to_year");
    } else if(date.length == 2) {
      activeGoTo = document.querySelector("#go_to_month");
    } else if(date.length == 3) {
      activeGoTo = document.querySelector("#go_to_day");
    }
    start = d;
    lastMarkerPos = start;
    reDraw();
    var ayyImWaukinHeer = getZoneFromDate(d);
    if(typeof ayyImWaukinHeer == "object") {
      ayyImWaukinHeer.forceMarker();
      $("#"+activeGoTo.id+" > form > input").css("color", "var(--thi-color)");
    } else {
      $("#"+activeGoTo.id+" > form > input").css("color", "var(--no-date)");
    }
  } else {
    $("#"+activeGoTo.id+" > form > input").css("color", "var(--no-date)");
  }
}

function goToMovie(mRef) {
  let index = mNameToIndex[mRef.toLowerCase()];
  if(typeof movieZones[index] === "object") {
    $("#"+activeGoTo.id+" > form > input").val(movieZones[index].d.titles);
    start = "m-"+index;
    lastMarkerPos = start;
    reDraw();
    movieZones[index].forceMarker();
    $("#"+activeGoTo.id+" > form > input").css("color", "var(--thi-color)");
  } else {
    let suggestedIndex = movieSuggestion(mRef);
    if(typeof movieZones[suggestedIndex] === "object") {
      start = "m-"+suggestedIndex;
      lastMarkerPos = start;
      reDraw();
      movieZones[suggestedIndex].forceMarker();
    }
    $("#"+activeGoTo.id+" > form > input").css("color", "var(--no-date)");
  }
}

function movieSuggestion(query) {
  if(query.length > 0) {
    let keys = Object.keys(mNameToIndex);
    let simi = 0;
    for(let i=0; i<keys.length; i++) {
      var title = keys[i];
      if(title.toLowerCase().includes(query.toLowerCase()) && title.length > query.length){
        return mNameToIndex[title];
      }
    }
  }
  return "";
}


function updateGoToVal() {
  if(start.charAt(0) === "m") {
    $("#"+activeGoTo.id+" > form > input").val(movieZones[lastMarkerPos.split("-")[1]].d.titles);
  } else {
    $("#"+activeGoTo.id+" > form > input").val(lastMarkerPos);
  }
  if(typeof getZoneFromDate(lastMarkerPos) == "object") {
    $("#"+activeGoTo.id+" > form > input").css("color", "var(--thi-color)");
  } else {
    $("#"+activeGoTo.id+" > form > input").css("color", "var(--no-date)");
  }
}
