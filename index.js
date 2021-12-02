let order = []


$(document).ready(function() {
    $(".item").click(function(){
        $(this).children(".item-price").children().clone().appendTo(".sidebarItemName");
        order.push($(this).children(".item-price").children().clone());
        console.log("item added to cart");
        $(".sidebarItemPrice").text("\$5.00");
        console.log(order);
    });
});

let order = [];

var newEmail = document.getElementById("email");
var newPassword = document.getElementById("password");

function store(){
    localStorage.setItem("email", newEmail.value);
    localStorage.setItem("password", newPassword.value);
};

function verify(){
    var savedEmail = localStorage.getItem("email");
    var savedPassword = localStorage.getItem("password");

    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    if(userEmail.value !== savedEmail || userPassword.value !== savedPassword) {
        alert("Incorrect credentials");
    }
    else{
        alert("You're logged in");
    }
};

