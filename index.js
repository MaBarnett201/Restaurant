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

