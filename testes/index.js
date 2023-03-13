//$("h1").css("color","red");

//$("a").attr("href", "https://youtube.com");

//$("h1").click(function () {
//    $("h1").css("color","purple");
//});


$("button").click(function(){
    $("h1").slideToggle();
});
    

//$("input").keydown(function(event){
//    $("h1").text(event.key);
//});

//$(document).keydown(function(event){
//    $("h1").text(event.key);
//});

$("h1").on("mouseover", function(){
    $("h1").slideToggle().animate({opacity: 0.5}); 
});