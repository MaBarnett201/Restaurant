let order = [];
let itemOne = 0;
let appetizersMenu = [];
let entreesMenu = [];
let sideMenu = [];
let dessertMenu = [];
let managerPage = 0;
let hasChange = localStorage.getItem("wholeMenu");
let safeUnloadVal = 0;
let menu = 0;

function itemPrice(){   /// when an item is added to cart this adds the price
    $(".sidebar-right").children("p").first().clone().prependTo(".sidebar-right");
    console.log("item price");
    return cartTotalPrice();
};

function cartTotalPrice(){  /// after any item is added to sidebar cart this recalculates the total
    let n = $(".sidebarItemName").children("p").length;
    $( "span" ).text(n * 5);
    console.log("total cart updated");
};

$(document).ready(function() { // removed clicked item in sidebar, also removed it from the cart array
    $('.sidebarItemName').on("click",function(e){
        $(e.target).remove();
        $(".sidebarItemPrice").last().remove();
        let x = order.indexOf(e.target,0);
        order.splice(x,1);
        console.log(order);
        // return itemPrice();
        console.log("item removed");
        if (order.length === 0){
            itemOne = 0;
            $(".sidebar-right").prepend("<p></p>");
            $(".sidebar-right").children("p").addClass("sidebarItemPrice");
            console.log("test");
            $( "span" ).text("0");
            return;
        }
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
            if ($("div").hasClass("expanded") === true){
                console.log("You can only expand one")
            }
            else{
                if ($(this).hasClass("expanded")){
                    return;
                }
                else {
                    $(this).addClass("expanded");
                    $(this).parent().addClass("expandedParent");
                    let r= $('<input type="button" value="Edit item Image" class="modifyButtons" onclick="editImage()" style="color:white;"/>');
                    let s= $('<input type="button" value="Edit item Name" class="modifyButtons" onclick="editName()" style="color:white;"/>');
                    let t= $('<input type="button" value="Edit item Desc" class="modifyButtons" onclick="editDesc()" style="color:white;"/>');
                    let v= $('<input type="button" value="Close editor" class="modifyButtons" onclick="closeEdit()" style="color:white;"/>');
                    $(this).after().append(r);
                    $(this).after().append(s);
                    $(this).after().append(t);
                    $(this).after().append(v);
                }
            }
        })
    }
    else {  //adds item to cart 
        $(document).on('click',".item2", function(){
            $(this).children(".item-price").children().clone().appendTo(".sidebarItemName");
            order.push($(this).children(".item-price").children().text());
            console.log("item added to cart");
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

function editImage(){   // edits the images but does not work yet
    let gimg = prompt('picture URL', "Google IMG URL");
    $(".expanded").children("img").attr("src", gimg);
};

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

function closeEdit(){   // closes the item editor
    $(document).remove("modifyButtons");
    $("input").remove();
    $("div").removeClass("expanded");
    $("article").removeClass("expandedParent");
};

function saveMenuChanges(){ /// when the manager page unloads this will save the entire menu in local storage
    if (managerPage === 1 && safeUnloadVal === 0){
        $(document).remove(".modifyButtons");
        $("input").remove();
        $("article").removeClass("expandedParent");
        $("div").removeClass("expanded");
        localStorage.setItem("wholeMenu", $(".menu-container").html());
        managerPage = 0;
        window.location.href="manager_home.html";
    }
};

function safeUnload(){ ///allows the user to leave the menu without making chages
    let q = window.prompt("No changes will be saved. Type Yes to continue or No to return");
    console.log(q);
    if (q === "yes" ||q === "YES" || q === "Yes" || q === "YEs" || q === "yES" || q === "yeS"){
        safeUnloadVal = 1;
        localStorage.removeItem("wholeMenu");
        window.location.href="manager_home.html";
    }
    else if (q === "no" || q === "No" || q === "NO" || q === "nO"){
        safeUnloadVal = 0;
    }
    else{
        window.alert("Please enter Yes or No. If you wish to save changes type no and select Save and Return");
    }
};

$(document).ready(function getChangedMenu(){    /// when the user menu loads this checks to see if there is a modified menu, and will use it if there is a updated menu in LS
    if(hasChange){
        console.log('Name exists');
        $(".menu-container").html(localStorage.getItem("wholeMenu"));
    }else{
        console.log('Name is not found');
    }      
});

$(document).ready(function(){   ///adds items to cart when returning from checkoutpage
    if (managerPage === 0 && menu === 1 && localStorage.getItem("order") !== null){
        let myStr = localStorage.getItem("order");
        let myArray = myStr.split(",");
        // console.log(myStr);
        // console.log(myArray);
        for (let i = 0; i < myArray.length++; i++){
            let h = myArray.shift();
            order.push(h);
            // console.log(order);
            $(".item2").first().children(".item-price").children().clone().empty().appendTo(".sidebarItemName").append(h);
            itemPrice();
        }
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
        window.location.href = "manager_home.html";

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

}

function checkoutName() {
    var custInfo = JSON.parse(localStorage.getItem("user"));
    var custName = custInfo.username;
    document.getElementById("orderName").innerHTML +=
    custName;
}


function saveTipCredit(){
    var NewTip=document.getElementById("CRtip").value;
    var GTip={YourTip: NewTip}
    var StoredTip=JSON.stringify(GTip)
    localStorage.setItem("tip", StoredTip)
    var scheduledTime = document.getElementById("schedPickup").value;
    localStorage.setItem("pickup time", scheduledTime);
    }

function saveTipDebit(){
    var NewTip=document.getElementById("DEtipB").value;
    var GTip={YourTip: NewTip}
    var StoredTip=JSON.stringify(GTip)
    localStorage.setItem("tip", StoredTip)
    var scheduledTime = document.getElementById("schedPickup").value;
    localStorage.setItem("pickup time", scheduledTime);
    }

function addTip(){
    var tipInfo=JSON.parse(localStorage.getItem("tip"))
    var tipName=tipInfo.YourTip;
    document.getElementById("tip").innerHTML +=
    tipName
    if (tipName>100 || tipName<0){
        window.location.href="Restaurant_Checkout.html"
        alert("Please enter a percentage between 0 and 100 percent")
    }
    else if(isNaN(tipName)){
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

function becauseYoureSpecial(){
    var costInfo=localStorage.getItem("order")
    var costName=costInfo.split()
    var ch=','
    var count=(costInfo.split(ch).length)*5
    document.getElementById("itemsbought").innerHTML +=
    costName
    document.getElementById("costtestF").innerHTML +=
    '$' + count + '.00'
    }

function totalCost(){
    var costInfo=localStorage.getItem("order")
    var costName=costInfo.split()
    var ch=','
    var count=(costInfo.split(ch).length)*5
    var tipInfo=JSON.parse(localStorage.getItem("tip"))
    var tipName=tipInfo.YourTip;
    var percentage=(Number(count)/100*Number(tipName))
    var finalCost=Number(percentage)+Number(count)
    document.getElementById("costtestA").innerHTML +=
    '$' + finalCost
}

function cancelOrder() {
    localStorage.removeItem("tip");
    localStorage.removeItem("pickup time");
    localStorage.removeItem("order");
    $(".openOrdersInfo").empty();
}

function logOut() {
    window.location.href = "index.html";
}

function openOrderDisplay() {
    if (localStorage.getItem("order") === null){
        document.getElementById("orderName").innerHTML +=
        "No open orders";
    }
    else{
        var custInfo = JSON.parse(localStorage.getItem("user"));
        var custName = custInfo.username;
        document.getElementById("orderName").innerHTML +=
        custName;
    }
}

function schedPickupTime() {
    var scheduledTime = document.getElementById("schedPickup").value;
    localStorage.setItem("pickup time", scheduledTime);
}

function pickUpTime() {
    var pickTime = localStorage.getItem("pickup time");
    document.getElementById("pickTime").innerHTML +=
    pickTime;
}

function addTotal() {

}