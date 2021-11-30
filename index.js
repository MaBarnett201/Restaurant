$(document).ready(function(){
    $('.slider1').slick({
        accessibility: true,
        slidesToShow:3,
        slidesToScroll:1,
        draggable: false,
        infinte:true,
        prevArrow: $('.previous1'),
        nextArrow: $('.next1'),
    });
});

$(document).ready(function(){
    $('.slider2').slick({
        accessibility: true,
        slidesToShow:3,
        slidesToScroll:1,
        draggable:true,
        infinte:true,
        prevArrow: $('.previous2'),
        nextArrow: $('.next2'),
    });
});

$(document).ready(function(){
    $('.slider3').slick({
        accessibility: true,
        slidesToShow:3,
        slidesToScroll:1,
        draggable:true,
        infinte:true,
        prevArrow: $('.previous3'),
        nextArrow: $('.next3'),
    });
});

$(document).ready(function(){
    $('.slider4').slick({
        accessibility: true,
        slidesToShow:3,
        slidesToScroll:1,
        draggable:true,
        infinte:true,
        prevArrow: $('.previous4'),
        nextArrow: $('.next4'),
    });
});
function toCart(){
    // let p1 = $("<p></p>", {class:"sidebarItemName"});
    // let p2 = $("<p></p>", {class:"sidebarItemPrice"});
    // $(".sidebar-left").append(p1);
    // $(".sidebar-right").append(p2);
    let itemName= $("#test")
    let itemPrice= $('#test2');
    $(".sidebarItemName").append(itemName);
    $(".sidebarItemPrice").append(itemPrice);
    order.push(itemName);
    console.log("item has been clicked");
    console.log(order)
};
function toCart2(){
    // let p1 = $("<p></p>", {class:"sidebarItemName"});
    // let p2 = $("<p></p>", {class:"sidebarItemPrice"});
    // $(".sidebar-left").append(p1);
    // $(".sidebar-right").append(p2);
    let itemName= $("#test3")
    let itemPrice= $('#test4');
    $(".sidebarItemName").append(itemName);
    $(".sidebarItemPrice").append(itemPrice);
    order.push(itemName);
    console.log("item has been clicked");
    console.log(order)
};

let order = [];
