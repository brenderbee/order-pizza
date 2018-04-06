// Business Logic
function Pizza(size) {
  this.size = size;
  this.toppings = [];
  this.price = 0;
}

function Person(name, street, city, state, zip) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
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
  $(".greeting form").submit(function(event) {
    event.preventDefault();

    var inputName = $("#name").val();
    var inputStreet = $("#street").val();
    var inputCity = $("#city").val();
    var inputState = $("#state").val();
    var inputZip = $("#zip").val();

    var newPerson = new Person(inputName, inputStreet, inputCity, inputState, inputZip);

    $(".receipt .name").text(newPerson.name);
    $(".receipt .street").text(newPerson.street);
    $(".receipt .citystate").text(newPerson.city + ", " + newPerson.state + " " + newPerson.zip);

    $(".greeting").slideUp(); 
  });

  $("form").submit(function(event){
    event.preventDefault();
    $("ul").empty();

    var inputSize = $("#size").val();
    var newPizza = new Pizza(inputSize);

    $("input:checkbox[name=topping]:checked").each(function(){
      newPizza.toppings.push($(this).val());
    });

    var newPrice = newPizza.priceTotal();

    $(".receipt").fadeIn();
    $(".receipt .size").text(newPizza.size);
    newPizza.toppings.forEach(function(topping){
      $(".receipt ul").append("<li>" + topping + "</li>");
    });
    $(".receipt .price").text(newPizza.price);
  });
});
