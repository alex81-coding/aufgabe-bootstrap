$(document).ready(function(){
    $(".fs-main-nav-item").mouseover(function(){
        $(".fs-hidden-nav").hide();

        $("#subnav-" + $(this).attr("id")).css("display","flex")
    })
    $(".fs-hidden-nav").mouseleave(function(){
        $(this).hide()
    })


    //MOBILE MENU
    $(".fs-mobile-menu-nav i").on("click",function(event){
        event.preventDefault();
    })
    $(".fs-mobile-menu").on("click","i", function(){
        $(this).toggleClass("fs-active");
        let _this = $(this).parent();
        _this.next().slideToggle();
    })


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



    let fsSearchButtonStateMobile = 0

    $('#fs-search-input-trigger-mobile').click(() => {
        if (fsSearchButtonState === 0) {
            $('#fs-search-input-mobile').show()
            fsSearchButtonStateMobile++
        } else {
            $('#fs-search-input-mobile').hide()
            fsSearchButtonStateMobile--
        }
    })



    let fsHamburgerState = 0
    $('#fs-hamburger-trigger').click(() => {
        if (fsHamburgerState === 0) {
            $("#fs-main").addClass("fs-opened-mobile-nav");
            $(".fs-mobile-overlayer").fadeIn();
            $("body").css("overflow","hidden");
            $(window).scrollTop(0)
            fsHamburgerState++
        } else {
            $("#fs-main").removeClass("fs-opened-mobile-nav");
            $(".fs-mobile-overlayer").fadeOut();
            $("body").css("overflow","unset");
            fsHamburgerState--
        }
    })

    $(".fs-mobile-overlayer").click(() => {
        $("#fs-main").removeClass("fs-opened-mobile-nav");
        $(".fs-mobile-overlayer").fadeOut();
        $("body").css("overflow","unset");
        fsHamburgerState--
    })
    $(".fs-hidden-nav").hide()


    $(".fs-close").on("click", function(){
        $(this).closest(".fs-overlayed").removeClass("fs-overlayed").find(".fs-submit-box-text").hide()
    })


})

let countvar = 1;

$(".fs-slide-buttons *").on("click", function(){
    if($(this).hasClass("fs-go-left")){
        slideCarousel()
    } else {
        countvar++
        if(countvar === 4){
            countvar = 1;
        }
        slideCarousel()
    }
})

function slideCarousel(){
    let _this = $(".fs-carousel-items").children();
    if(countvar == 1){
        $($(_this)[1]).attr("class", "fs-slide-center slide-fast")
        $($(_this)[0]).attr("class", "fs-slide-right slide-slowest");
        $($(_this)[2]).attr("class", "fs-slide-left slide-slow");
    } else if(countvar == 2){
        $($(_this)[0]).attr("class", "fs-slide-center slide-fast");
        $($(_this)[2]).attr("class", "fs-slide-right slide-slow");
        $($(_this)[1]).attr("class", "fs-slide-left slide-slowest");
    } else if(countvar == 3){
        $($(_this)[2]).attr("class", "fs-slide-center slide-fast");
        $($(_this)[1]).attr("class", "fs-slide-right slide-slow");
        $($(_this)[0]).attr("class", "fs-slide-left slide-slow");
        countvar = 0
    }
    countvar++;
}





// MAP GOOGLE




// Initialize and add the map
var map;
var graustufenStyle= [
    {
        featureType: 'all',
        stylers: [
            {saturation: -100},
            {gamma: 2}
        ]
    },
];
let firstCategoryDone = false;
let firstAddingDropDown = true;

const mapCenter = {lat: 51, lng: 10.34822335};
function initMap(data,loadAll) {
    map = new google.maps.Map(document.getElementById("fs-map"), {
        center: mapCenter,
        zoom: 5.5,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: "none"
    });

    $.each(data, function(key,valueObj){

        if(firstAddingDropDown){
            $("#fs-cities").append('<p data-loc-type="' + key + '">' + key + '</p>'); // FILL THE DROPDOWN
        }

        $(valueObj).each(function() {

            if(!firstCategoryDone) {
                const marker = new google.maps.Marker({
                    position: this.coords,
                    map: map,
                    id: this.id

                });
                $(".fs-selected").append('<p data-loc-id="loc' + this.id + '" class="h4 fs-open-loc fs-text-blue">' + this["city"] + '</p>');
                $("#fs-dd-cities p").html(key)
                marker.addListener("click", () => {
                    showOrHideLocInfo("loc" + this.id);
                });
            }
            if(loadAll){
                const marker = new google.maps.Marker({
                    position: this.coords,
                    map: map,
                    id: this.id

                });
                marker.addListener("click", () => {
                    showOrHideLocInfo("loc" + this.id);
                });
            }
            createLoc(this);
        });
        firstCategoryDone = true;
    });
    map.setOptions({styles: graustufenStyle});
}

$("html").on("click", ".fs-select p", function(){
    $("#fs-dd-cities").removeClass("fs-opened");
    $("#fs-cities").slideUp();
    // LOAD THE LOCATIONS FOR THE CHOOSEN SECTOR
    let _mapData = [];
    $(".fs-selected").html('');
    $(allCoordinates[$(this).attr("data-loc-type")]).each(function(){
        $(".fs-selected").append('<p data-loc-id="loc' + this.id + '" class="h4 fs-open-loc fs-text-blue">' + this["city"] + '</p>');
        _mapData.push({id: this.id , coords: this.coords});
        createLoc(this);
    });
    $("#fs-dd-cities p").html($(this).html());
    firstAddingDropDown = false; // MUST BE SETTED NOT TO OVERWRITE DROPDOWN AGAIN
    initMap(_mapData, true)
})


function createLoc(data){
    if($("#loc" + data.id).length == 0){
        let thisLoc = '';
        thisLoc += '<div class="fs-loc" id="loc' + data.id + '">';
        thisLoc += '<p class="h4 fs-text-blue">' + data.name + '</p>';
        thisLoc += '<p>' + data.street + '</p>';
        thisLoc += '<p>' + data.zip + ' ' + data.city + '</p>';
        thisLoc += '<p>Tel: ' + data.tel + '</p>';
        thisLoc += '</div>';
        $(".fs-locs").append(thisLoc)
    }
}

function showOrHideLocInfo(locId){
    if(!locId){
        $(".fs-locs").hide();
        $(".fs-loc").hide();
    } else {
        $(".fs-loc").hide();
        $(".fs-locs").show();
        $("#" + locId).fadeIn();
    }
}

$("#fs-dd-cities").on("click", function(){
    $(".fs-locs").hide();
    $(".fs-loc").hide();
    $(this).next().toggle();
    $(this).toggleClass("fs-opened");
})

$(".fs-locs").click(function(){
    showOrHideLocInfo(false)
});

$("html").on("click", ".fs-open-loc", function(){
    showOrHideLocInfo($(this).attr("data-loc-id"));
})
//icon: '/fileadmin/assets/images/marker-small.png'

// $(".fs-search-ansprechpartner").on("click", ".fs-dropdown", function(){
//     $(this).next().toggle();
//     $(this).toggleClass("fs-opened");
// })