var genderOn = false;
var rolesOn = true;
var budgetOn = true;
var profitOn = false;

var activeDerps = {
  "Editing": true,
  "Art": true,
  "Sound": true,
  "Production": true,
  "Directing": true,
  "Writing": true,
  "Visual Effects": true,
  "Costume & Make-Up": true,
  "Crew": true,
  "Lighting": true,
  "Camera": true,
  "Actors": false
};

var moneys = {
  "budget": true,
  "revenue": true,
}

var roles = {
  "cast": true,
  "crew": true,
}

var genders = {
  "female": true,
  "male": true,
  "unknown": true,
}

var ProfitLoss;

$(document).ready(function() {
  $("#departament_selector").change(function() {
    updateDepartments();
  });
  $("#derps_hide_all").click(function() {
    $('#departament_selector > .genre_box').each(function(i, obj) {
      obj.checked = false;
    });
    updateDepartments();
  });
  $("#derps_show_all").click(function() {
    $('#departament_selector > .genre_box').each(function(i, obj) {
      obj.checked = true;
    });
    updateDepartments();
  });
  $("#display_selector_left").change(function() {
    moneys['budget'] = document.getElementById('budgetCheck').checked
    moneys['revenue'] = document.getElementById('revenueCheck').checked
    reDraw();
  });



  $("#display_selector_right").click(function(e) {
    if(e.target.checked) {
      $("#display_selector_left > input").prop("checked", false);
      budgetOn = false;
      profitOn = true;
    } else {
      budgetOn = true;
      profitOn = false;
      $("#budgetCheck").prop("checked", true);
      $("#revenueCheck").prop("checked", true);
    }
    ProfitLoss = document.querySelector("#ProLossCheck").checked;
    reDraw();
    updateLabels();
    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });



  $("#budgetCheck").prop("checked", true);
  $("#revenueCheck").prop("checked", true);

  $("#display_selector_left").click(function(e) {
    if(e.target.checked) {
      $("#display_selector_right > input").prop("checked", false);
      if(budgetOn==false){
        $("#budgetCheck").prop("checked", true);
        $("#revenueCheck").prop("checked", true);
      }
      budgetOn = true;
      profitOn = false;
    } else {
      //budgetOn = false;
      //profitOn = true;
    }
    reDraw();
    updateLabels();
  });


  $("#isRoles").click(function(e) {
    if(e.target.checked) {
      $("#isGender > input").prop("checked", false);
      $("#gender_selector").css("visibility", "hidden");
      $("#gender_selector").css("pointer-events", "none");
      $("#roles_selector").css("visibility", "visible");
      $("#roles_selector").css("pointer-events", "all");
      $("#departament_container").css("pointer-events", "all");
      $("#departament_container").css("opacity", "1");
      rolesOn = true;
      genderOn = false;
    } else {
      $("#roles_selector").css("visibility", "hidden");
      $("#roles_selector").css("pointer-events", "none");
      $("#departament_container").css("pointer-events", "none");
      $("#departament_container").css("opacity", "0.2");
      rolesOn = false;
    }
    roles['cast'] = document.querySelector("#castCheck").checked;
    roles['crew'] = document.querySelector("#crewCheck").checked;
    reDraw();
    updateLabels();
    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });

  $("#roles_selector").change(function() {
    roles['cast'] = document.querySelector("#castCheck").checked;
    roles['crew'] = document.querySelector("#crewCheck").checked;
    if(roles['crew']) {
      $("#departament_container").css("pointer-events", "all");
      $("#departament_container").css("opacity", "1");
    } else {
      $("#departament_container").css("pointer-events", "none");
      $("#departament_container").css("opacity", "0.2");
    }
    reDraw();
    updateLabels();
  });

  $("#isGender").click(function(e) {
    if(e.target.checked) {
      $("#isRoles > input").prop("checked", false);
      $("#roles_selector").css("visibility", "hidden");
      $("#roles_selector").css("pointer-events", "none");
      $("#gender_selector").css("visibility", "visible");
      $("#gender_selector").css("pointer-events", "all");
      $("#departament_container").css("pointer-events", "none");
      $("#departament_container").css("opacity", "0.2");
      rolesOn = false;
      genderOn = true;
    } else {
      $("#gender_selector").css("visibility", "hidden");
      $("#gender_selector").css("pointer-events", "none");
      genderOn = false;
    }
    genders['male'] = document.querySelector("#maleCheck").checked;
    genders['female'] = document.querySelector("#femaleCheck").checked;
    genders['unknown'] = document.querySelector("#unknownCheck").checked;
    reDraw();
    updateLabels();
    subtitlePOOF();
    lastClicked1=null;
    lastClicked2=null;
  });
  $("#gender_selector").change(function() {
    genders['male'] = document.querySelector("#maleCheck").checked;
    genders['female'] = document.querySelector("#femaleCheck").checked;
    genders['unknown'] = document.querySelector("#unknownCheck").checked;
    reDraw();
    updateLabels();
  });

  $("#filters").click(function(e) {
    var side = document.querySelector("#sideO");
    if(side.offsetLeft < -100) {
      side.style.left = "0";
      //document.querySelector("#filters").innerText = "Hide Options";
    } else {
      side.style.left = "-110%";
      //document.querySelector("#filters").innerText = "Options";
    }
  });

  $("#filtersclose").click(function(e) {
    var side = document.querySelector("#sideO");
    if(side.offsetLeft < -100) {
      side.style.left = "0";
      //document.querySelector("#filters").innerText = "Hide Options";
    } else {
      side.style.left = "-110%";
      //document.querySelector("#filters").innerText = "Options";
    }
  });

});

function updateDepartments() {
  var boxes = document.querySelector("#departament_selector").children;
  var selected = [];
  for(let i=0; i<boxes.length; i++) {
    if(boxes[i].className == "genre_box") {
      activeDerps[boxes[i].value] = boxes[i].checked;
    }
  }
  reDraw();
}
