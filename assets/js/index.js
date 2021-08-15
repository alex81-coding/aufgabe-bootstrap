let fsSearchButtonState = 0

$('#fs-search-input-trigger').click(() => {
    if (fsSearchButtonState === 0) {
        $('#fs-search-input').show()
        fsSearchButtonState++
    } else {
        $('#fs-search-input').hide()
        fsSearchButtonState--
    }
})

function closeMobileMenu(){
    $('body').css('overflow', 'auto')
    $('#fs-mobile-menu-container').css('transform', 'translateX(-100%)');
    $(".fs-mobile-menu-overlay").fadeOut();
    $(".fs-startpage").removeClass("mobileNavOpened");
};

$('#fs-hamburger-trigger').click(() => {
    $(".fs-mobile-menu-overlay").fadeIn();
    $('body').css('overflow', 'hidden');
    $('#fs-mobile-menu-container').css('transform', 'translateX(0)');
    $(".fs-startpage").addClass("mobileNavOpened");
})

$('#fs-mobile-menu-overlay').click(() => {
    closeMobileMenu();
})

$(".fs-mobile-menu").on("click","i", function(){
    $(this).toggleClass("fs-active");
    let _this = $(this).parent();
    _this.next().slideToggle();
})


$(window).resize(function() {
    if(window.innerWidth > 992){
        closeMobileMenu();
    }
});

$(document).ready(function(){
        /*
    Carousel
    */
    $('#carousel-example').on('click', '.carousel-control-next', function (e) {
        /*
            CC 2.0 License Iatek LLC 2018 - Attribution required
        */
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 5;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });

$(".fs-mobile-menu-nav i").on("click",function(event){
    event.preventDefault();
})
$(".fs-button").on("click",function(){
    $(this).closest(".fs-submitBox").fadeOut()
})


})

let counterData = {
    eigenkapital : ["0,1","0,2","0,3","0,4","0,5","0,6","0,7","0,8","0,9","1,0","1,1","1,2","1,3","1,4","1,5","1,6","1,7","1,8","1,9","2,0","2,1","2,2","2,3","2,4","2,5","2,6","2,7","2,8","2,9","3,0","3,1","3,2","3,3","3,4","3,5"],
    umsaetze : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87],
    standorte : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,61,62,63,64,65,66,67,68,69,70,71]
}


//
// function startCounting(){
//     let _duration = 2000;
//     $('.fs-count').each(function() {
//         var $this = $(this);
//         let countTo = $this.attr('data-value');
//
//         $({ countNum: $this.text()}).animate({
//                 countNum: countTo
//             },
//             {
//                 duration: _duration,
//                 easing:'linear',
//                 step: function() {
//                     $this.text(Math.floor(this.countNum));
//                     //console.log(this.countNum);
//                     //$this.text(counterData.eigenkapital[this.countNum]);
//                 },
//                 complete: function() {
//                     $this.html(this.countNum);
//                     _duration = _duration/2;
//                 }
//             });
//     });
// }


allCoordinates = [
    {lat: 51.43530188, lng: 6.98775419}
]
// Initialize and add the map
var map;
const mapCenter = {lat: 51, lng: 10.34822335};
function initMap() {
    console.log("init");
    map = new google.maps.Map(document.getElementById("fs-map"), {
        center: mapCenter,
        zoom: 5,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });

    $(allCoordinates).each(function(){
        const marker = new google.maps.Marker({
            position: this[1],
            map: map,
            id: this[0],
            icon: '/fileadmin/assets/images/marker-small.png'
        });
        marker.addListener("click", () => {
            map.setZoom(8);
            map.setCenter(marker.getPosition());

            showOrHideLocInfo("loc" + this[0], false);
        });
    });
}

