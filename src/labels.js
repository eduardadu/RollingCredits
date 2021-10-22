$( document ).ready(function() {
  updateLabels();
  applyLabelColors();
});

function updateLabels() {
  var labels = document.querySelector("#labels").children;
  for(let i=0; i<labels.length; i++) {
    labels[i].style.display = "none";
  }
  $("#label_numMovies").css("display", "inline-block");
  if(genderOn) {
    if(genders['male']) {
      $("#label_male").css("display", "inline-block");
    }
    if(genders['female']) {
      $("#label_female").css("display", "inline-block");
    }
    if(genders['unknown']) {
      $("#label_unknown").css("display", "inline-block");
    }
  }
  if(rolesOn) {
    if(roles['cast']) {
      $("#label_cast").css("display", "inline-block");
    }
    if(roles['crew']) {
      $("#label_crew").css("display", "inline-block");
    }
  }
  if(budgetOn){
    if(moneys['budget']) {
      $("#label_budget").css("display", "inline-block");
    }
    if(moneys['revenue']) {
      $("#label_revenue").css("display", "inline-block");
    }
  }
  if(profitOn){
    $("#label_loss ").css("display", "inline-block");
    $("#label_profit ").css("display", "inline-block");
  }
}

function applyLabelColors() {
  $("#label_numMovies > .label_rect").css("background-color", colors['numMovies']);
  $("#label_budget > .label_rect").css("background-color", colors['budget']);
  $("#label_revenue > .label_rect").css("background-color", colors['revenue']);
  $("#label_loss > .label_rect").css("background-color", colors['budget']);
  $("#label_profit > .label_rect").css("background-color", colors['revenue']);
  $("#label_numMovies > .label_rect").css("background-color", colors['numMovies']);
  $("#label_cast > .label_rect").css("background-color", colors['cast']);
  $("#label_crew > .label_rect").css("background-color", colors['crew']);
  $("#label_female > .label_rect").css("background-color", colors['female']);
  $("#label_male > .label_rect").css("background-color", colors['male']);
  $("#label_unknown > .label_rect").css("background-color", colors['unknown']);
}
