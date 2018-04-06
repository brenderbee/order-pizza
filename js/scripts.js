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

function Order() {
  this.order = [];
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

    $(".name").text(newPerson.name);
    $(".street").text(newPerson.street);
    $(".citystate").text(newPerson.city + ", " + newPerson.state + " " + newPerson.zip);

    $(".greeting").slideUp();
    $(".order-form").show();
  });

  $("#add-pizza").click(function(){
    $(".eachpizza").append( '<div class="eachpizza">' +
                '<div class="form-group">' +
                  '<label for="size">Select a size:</label>' +
                  '<select class="form-control size">' +
                    '<option value="Small">Small (10"), $10</option>' +
                    '<option value="Medium">Medium (12"), $12</option>' +
                    '<option value="Large">Large (14"), $15</option>' +
                  '</select>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label for="topping">Select toppings:</label>' +
                  '<p>All pizzas come with tomato sauce. All toppings are $1 each (including cheese):</p>' +
                  '<input type="checkbox" name="topping" value="cheese" checked> Cheese<br>' +
                  '<input type="checkbox" name="topping" value="pepperoni"> Pepperoni<br>' +
                  '<input type="checkbox" name="topping" value="mushrooms"> Mushrooms<br>' +
                  '<input type="checkbox" name="topping" value="onions"> Onions<br>' +
                  '<input type="checkbox" name="topping" value="extra cheese"> Extra cheese<br>' +
                  '<input type="checkbox" name="topping" value="black olives"> Black olives<br>' +
                  '<input type="checkbox" name="topping" value="green peppers"> Green peppers<br>' +
                  '<input type="checkbox" name="topping" value="spinach"> Spinach<br>' +
                '</div>' +
              '</div>');
  });

  $(".order-form form").submit(function(event){
    event.preventDefault();
    $("ul").empty();

    var inputSize = $(".size").val();
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
