let order = [];
let itemOne = 0;

$(document).ready(function() {
    $(".item").click(function(){
        $(this).children(".item-price").children().clone().appendTo(".sidebarItemName");
        order.push($(this).children(".item-price").children().text());
        console.log("item added to cart");
        console.log(order);
        $(".sidebarItemPrice").text("\$5.00");	
        if (itemOne === 0){  
            cartTotalPrice();
            itemOne++
        }
        else{
            itemPrice();
        }
    });
});


function itemPrice(){
    $(".sidebar-right").children("p").first().clone().prependTo(".sidebar-right");
    return cartTotalPrice();
};

function cartTotalPrice(){
    let n = $(".sidebar-right").children("p").length;
    $( "span" ).text(n * 5);
    console.log("this is item <2")
};

$(document).ready(function() {
    $('.sidebarItemName').on("click",function(e){
        $(e.target).remove();
        $(".sidebarItemPrice").last().remove();
        let x = order.indexOf(e.target,0);
        order.splice(x,1);
        console.log(order);
        return cartTotalPrice();
    });
});

function orderSave(){
    let stringOrder = order.toString();
    localStorage.setItem('order', stringOrder);
};

$(document).ready(function() {
    $('.item2').on("click",function(e){
        $(this).empty().children();

    });
});

function register() {
    var newName = document.getElementById("name").value;
    var newEmail = document.getElementById("email").value;
    var newPassword = document.getElementById("password").value;

    var user = {
        username: newName,
        email: newEmail,
        password: newPassword,
    }

    var storedUser = JSON.stringify(user);
    localStorage.setItem("user", storedUser);
}

function verify(){
    var savedUser = JSON.parse(localStorage.getItem("user"));
    var enteredEmail = document.getElementById("userEmail").value;
    var enteredPass = document.getElementById("userPassword").value;

    if (enteredEmail === savedUser.email && enteredPass === savedUser.password) {
        displayName();
    }
    else{
        console.log("Incorrect credentials");
    }
};

function displayName() {
    var custInfo = JSON.parse(localStorage.getItem("user"));
    var custName = custInfo.username;
    document.getElementById("welcomeUser").innerHTML +=
    "Welcome, " + custName;
}

