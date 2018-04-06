// Business Logic

// User Interface Logic
$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();

    var inputSize = $("#size").val();

    $(".receipt .size").text(inputSize);
  });
});
