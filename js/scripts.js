// Business Logic
function Pizza(size) {
  this.size = size;
  this.toppings = [];
}

// User Interface Logic
$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();

    var inputSize = $("#size").val();
    var inputToppings = $("input:checkbox[name=toppings]:checked").val();

    var newPizza = new Pizza(inputSize);

    $(".receipt .size").text(newPizza.size);
    $(".receipt ul").append("<li>" + inputToppings + "</li>");
  });
});
