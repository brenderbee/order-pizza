// Business Logic
function Pizza(size) {
  this.size = size;
  this.toppings = [];
}

// function resetFields() {
//   newPizza.name = "";
//   newPizza.toppings = [];
// }

// User Interface Logic
$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();
    $("ul").empty();

    var inputSize = $("#size").val();
    var newPizza = new Pizza(inputSize);

    $("input:checkbox[name=topping]:checked").each(function(){
      newPizza.toppings.push($(this).val());
    });

    $(".receipt .size").text(newPizza.size);

    newPizza.toppings.forEach(function(topping){
      $(".receipt ul").append("<li>" + topping + "</li>");
    });

    // resetFields();
  });
});
