let order = [];
let itemOne = 0;

$(document).ready(function() {  ///added any clicked item to cart and sidebar
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


function itemPrice(){   /// when an item is added to cart this adds the price
    $(".sidebar-right").children("p").first().clone().prependTo(".sidebar-right");
    return cartTotalPrice();
};

function cartTotalPrice(){  /// after any item is added to sidebar cart this recalculates the total
    let n = $(".sidebar-right").children("p").length;
    $( "span" ).text(n * 5);
    console.log("this is item <2")
};

$(document).ready(function() { // removed clicked item in sidebar, also removed it from the cart array
    $('.sidebarItemName').on("click",function(e){
        $(e.target).remove();
        $(".sidebarItemPrice").last().remove();
        let x = order.indexOf(e.target,0);
        order.splice(x,1);
        console.log(order);
        return cartTotalPrice();
    });
});

function orderSave(){   // converts array order to string and stores it in local storage
    let stringOrder = order.toString();
    localStorage.setItem('order', stringOrder);
};

$(document).ready(function() {  /// manager menu, clicked item expands and displays edit buttons
    $('.item2').on("click",function(e){
        if ($(this).hasClass("expanded")){
            $(this).remove(".modifyButtons");
            $("input").remove();
            $(this).css({"height": "270px", "transition": ".3s ease-in-and-out"});
            $(this).parent().css({"height": "300px", "transition": ".3s ease-in-and-out"});
            $(this).removeClass("expanded");
        }
        else {
            $(this).addClass("expanded");
            $(this).css({"height": "350px", "transition": ".3s ease-in-and-out"});
            $(this).parent().css({"height": "330px", "transition": ".3s ease-in-and-out"});
            let r= $('<input type="button" value="Change picture" class="modifyButtons"/>');
            let s= $('<input type="button" value="Edit item Name" class="modifyButtons" onclick="editName()"/>');
            let t= $('<input type="button" value="Edit item Desc" class="modifyButtons" onclick="editDesc()"/>');
            $(this).after().append(r);
            $(this).after().append(s);
            $(this).after().append(t);
        }
    });
});

function editName(){
    let x = window.prompt("Please enter the new item name.")
    $(".expanded").children(".item-price").children(".item-text").text(x);
    console.log("item name has been changed");
};

function editDesc(){
    let x = window.prompt("Please enter the new item name.")
    $(".expanded").children(".item-desc").text(x);
    console.log("item name has been changed");
};

// const fileSelector = document.getElementById('file-selector');
// fileSelector.addEventListener('change', (event) => {
//   const fileList = event.target.files;
//   console.log(fileList);
// });

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
};

$(document).ready(function(){
    let newName = "admin";
    let newEmail = "manager";
    let newPassword = "password";

    let admin = {
        username: newName,
        email: newEmail,
        password: newPassword,
    }

    let storedManager = JSON.stringify(admin);
    localStorage.setItem("admin", storedManager);
});

function verify(){
    var savedUser = JSON.parse(localStorage.getItem("user"));
    var enteredEmail = document.getElementById("userEmail").value;
    console.log(enteredEmail);
    var enteredPass = document.getElementById("userPassword").value;
    console.log(enteredPass);
    var savedAdmin = JSON.parse(localStorage.getItem("admin"));

    if (enteredEmail === savedAdmin.email && enteredPass === savedAdmin.password){
        window.location.href = "menu-manager.html";
        console.log("admin logged in");
    }
    if (enteredEmail === savedUser.email && enteredPass === savedUser.password) {
        window.location.href = "menu.html";
        console.log("user logged in");
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
};
