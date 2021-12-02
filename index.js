let order = []
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
$(".sidebar-right").on("click", function() {
        $(".sidebar-right").children().remove(this);
        console.log("item removed");
    });