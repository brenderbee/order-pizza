// Business Logic
function Pizza(size) {
  this.size = size;
  this.toppings = [];
  this.price = 0;
}

Pizza.prototype.priceTotal = function () {
  if (this.size === "Small") {
    this.price = 10;
  } else if (this.size === "Medium") {
    this.price = 12;
  } else {
    this.price = 15;
  }

  for (var i = 0; i < this.toppings.length; i++) {
    this.price = this.price + 1;
  }

  return this.price;
};

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

    var newPrice = newPizza.priceTotal();

    $(".receipt .size").text(newPizza.size);
    newPizza.toppings.forEach(function(topping){
      $(".receipt ul").append("<li>" + topping + "</li>");
    });
    $(".receipt .price").text(newPizza.price);

  });
});
