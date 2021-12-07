let order = [];
let itemOne = 0;
let appetizersMenu = [];
let entreesMenu = [];
let sideMenu = [];
let dessertMenu = [];
let managerPage = 0;
let hasChange = localStorage.getItem("wholeMenu");

// $(document).ready(function() { ///added any clicked item to cart and sidebar
//     if (managerPage === 0){
//         $(".item2").click(function(){
//             $(this).children(".item-price").children().clone().appendTo(".sidebarItemName");
//             order.push($(this).children(".item-price").children().text());
//             console.log("item added to cart");
//             console.log(order);
//             $(".sidebarItemPrice").text("\$5.00");
    
//             if (itemOne === 0){  
//                 cartTotalPrice();
//                 itemOne++;
//             }
//             else{
//                 itemPrice();
//             }
//         })
//     }
// });



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
    if (managerPage === 1){
        $(document).on('click',".item2", function(){
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
        }
    else {
        $(document).on('click',".item2", function(){
            console.log("function ran")
            $(this).children(".item-price").children().clone().appendTo(".sidebarItemName");
            order.push($(this).children(".item-price").children().text());
            console.log("item added to cart");
            console.log(order);
            $(".sidebarItemPrice").text("\$5.00");
        
            if (itemOne === 0){  
                cartTotalPrice();
                itemOne++;
            }
            else{
                itemPrice();
            }
        })
    }
});
// $(document).ready(function() {  /// manager menu, clicked item expands and displays edit buttons
//     if (managerPage === 1){
//         $('.item2').on("click",function(e){
//             if ($(this).hasClass("expanded")){
//                 $(this).remove(".modifyButtons");
//                 $("input").remove();
//                 $(this).css({"height": "270px", "transition": ".3s ease-in-and-out"});
//                 $(this).parent().css({"height": "300px", "transition": ".3s ease-in-and-out"});
//                 $(this).removeClass("expanded");
//             }
//             else {
//                 $(this).addClass("expanded");
//                 $(this).css({"height": "350px", "transition": ".3s ease-in-and-out"});
//                 $(this).parent().css({"height": "330px", "transition": ".3s ease-in-and-out"});
//                 let r= $('<input type="button" value="Change picture" class="modifyButtons"/>');
//                 let s= $('<input type="button" value="Edit item Name" class="modifyButtons" onclick="editName()"/>');
//                 let t= $('<input type="button" value="Edit item Desc" class="modifyButtons" onclick="editDesc()"/>');
//                 $(this).after().append(r);
//                 $(this).after().append(s);
//                 $(this).after().append(t);
//             }
//         });
//     }
// });


function editName(){    /// edits the name of an item
    let c = window.prompt("Please enter the new item name.")
    $(".expanded").children(".item-price").children(".item-text").text(c);
    console.log("item name has been changed");
};

function editDesc(){    /// edits the description of an item
    let x = window.prompt("Please enter the new item name.")
    $(".expanded").children(".item-desc").text(x);
    console.log("item name has been changed");
};

$(window).on("unload", function saveMenuChanges(){ /// when the manager page unloads this will save the entire menu in local storage
    if (managerPage === 1){
        localStorage.setItem("wholeMenu", $(".menu-container").html());
        managerPage = 0;
    }
});

$(document).ready(function getChangedMenu(){    /// when the user menu loads this checks to see if there is a modified menu, and will use it if there is a updated menu in LS
    if(hasChange){
        console.log('Name exists');
        $(".menu-container").html(localStorage.getItem("wholeMenu"));
    }else{
        console.log('Name is not found');
    }      
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


function saveTipCredit(){
    var NewTip=document.getElementById("CRtip").value;
    var GTip={YourTip: NewTip}
    var StoredTip=JSON.stringify(GTip)
    localStorage.setItem("tip", StoredTip)
    }

function saveTipDebit(){
    var NewTip=document.getElementById("DEtipB").value;
    var GTip={YourTip: NewTip}
    var StoredTip=JSON.stringify(GTip)
    localStorage.setItem("tip", StoredTip)
    }

function addTip(){
    var tipInfo=JSON.parse(localStorage.getItem("tip"))
    var tipName=tipInfo.YourTip;
    document.getElementById("tip").innerHTML +=
    tipName
    }

function addTipB(){
    var tipInfo=JSON.parse(localStorage.getItem("tip"))
    var tipName=tipInfo.YourTip;
    document.getElementById("tip").innerHTML +=
    tipName
    console.log("Working")
    if(tipName>100 || tipName<0){
        window.location.href="Restaurant_Checkout.html"
        alert("Please enter a percentage between 0 and 100 percent")
    }
    else if(isNaN(document.getElementById("tip").innerHTML)){
        window.location.href="Restaurant_Checkout.html"
        alert("Please enter a number")
        }
    }

function CheckoutName() {
    var custInfo = JSON.parse(localStorage.getItem("user"));
    var custName = custInfo.username;
    document.getElementById("checkname").innerHTML +=
    custName;
    }

function saveFoodCost(){
    var NewCost=document.getElementById("totalpricetest").value;
    var GCost={YourCost: NewCost}
    var StoredCost=JSON.stringify(GCost)
    localStorage.setItem("cost", StoredCost)
    }

function addCost(){
    var costInfo=JSON.parse(localStorage.getItem("cost"))
    var costName=costInfo.YourCost;
    document.getElementById("costtest").innerHTML +=
    costName
    }

function addTimer(){
    var costInfo=localStorage.getItem("order")
    var ch=','
    var count=9+(costInfo.split(ch).length)
    document.getElementById("time").innerHTML +=
    count + ' minutes'
}
function addItems(){
    var costInfo=localStorage.getItem("order")
    var costName=costInfo.split()
    var ch=','
    var count=(costInfo.split(ch).length)*5
    document.getElementById("itemsbought").innerHTML +=
    costName
    document.getElementById("costtest").innerHTML +=
    '$' + count + '.00'
    }