$(document).ready(function() {
  $("#aboutPage").click(function() {
    var ap = document.querySelector("#aboutCont");
    if(ap.style.opacity == "1") {
      ap.style.opacity = "0";
      ap.style.pointerEvents = "none";
    } else {
      ap.style.opacity = "1";
      ap.style.pointerEvents = "all";
    }
  });

  $("#closeA").click(function() {
    var ap = document.querySelector("#aboutCont");
    ap.style.opacity = "0";
    ap.style.pointerEvents = "none";
  });

  $("#goBackYo").click(function() {
    var ap = document.querySelector("#aboutCont");
    ap.style.opacity = "0";
    ap.style.pointerEvents = "none";
  });
});
