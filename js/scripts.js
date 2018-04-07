// Business Logic
var newOrder = {
  pizzas: [],
};

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

function TotalPayment(object) {
  var sum = 0;
  object.pizzas.forEach(function(pizza) {
    sum += pizza.price;
  });
  return sum;
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

  // Delivery Address
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

  // Adds new pizza
  $("#add-pizza").click(function(){
    $("#new-pizza").append( '<div class="eachpizza">' +
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

  // Places order
  $(".order-form form").submit(function(event){
    event.preventDefault();

    $(".eachpizza").each(function() {
      var inputSize = $(this).find(".size").val();
      var newPizza = new Pizza(inputSize);
      $(this).find("input:checkbox[name=topping]:checked").each(function(){
        newPizza.toppings.push($(this).val());
      });
      newPizza.priceTotal();
      newOrder.pizzas.push(newPizza);
    });

    // Receipt for each pizza
    newOrder.pizzas.forEach(function(pizza) {
      $("#new-receipt").append( '<div class="eachpizza-receipt">' +
                                  '<p>' + '<strong>Size</strong>: ' + pizza.size + '</p>' +
                                  '<p><strong>Toppings</strong>: ' + pizza.toppings.join(", ") + '</p>' +
                                  '<p><strong>Subtotal</strong>: ' + '$' + pizza.price + '</p>' +
                                  '</div>');
    });
    var total = TotalPayment(newOrder);
    $(".total").text("Total: $" + total);
    $(".order-form").slideUp();
    $(".receipt").fadeIn();
  });

  // Confirmation screen
  $("#confirm").click(function() {
    $(".receipt").slideUp();
    $(".thankyou").fadeIn();
  });
});
