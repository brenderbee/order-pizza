// Business Logic
function Pizza(size) {
  this.size = size;
  this.toppings = [];
}

function resetFields() {
  newPizza.name = "";
  newPizza.toppings = [];
}

// User Interface Logic
$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();
    $("ul").empty();

    var inputSize = $("#size").val();
    var inputToppings = $("input:checkbox[name=toppings]:checked").val();

    var newPizza = new Pizza(inputSize);

    $(".receipt .size").text(newPizza.size);
    $(".receipt ul").append("<li>" + inputToppings + "</li>");

    resetFields();
  });
});
