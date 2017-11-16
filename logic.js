function initializeCarousel() {
$(".carousel").slick({
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500,
            dots: true
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500
        }
    }
    ]
});
}

jQuery(function ($) {
   
    var width = "600";
    var height = "450";
    var gKey = "AIzaSyB8DKnCUswaOV0Afr4jd1jyteETwqWQ4-M";
    var ikey = "AIzaSyD8yKqnL-7Y8-2cOWW_3YqN66bePhCWp6g";
    var gSrc = "https://www.google.com/maps/embed/v1/place?key=";

    function displayCards() {
        var city = window.localStorage.getItem('input');
        var queryUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=coding" +
            "&city=" + city;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).done(function (response) {
            //console.log(response);
            var list = response.resultItemList;
            for (i = 0; i < 8; i++) {
                var $jobDiv = $(".carousel"); 
                var $card = $("<div>").addClass("card-size card purple darken-1");
                var $content = $("<div>").addClass("card-content white-text card-custom");
                var $jobTitle = $("<div>").addClass("card-title job-name");
                $jobTitle.append((list[i].jobTitle).substring(0, 25));
                var $location = $("<div>").addClass("card-title city-name");
                $location.append(list[i].location);
                var $date = $("<div>").addClass("card-title posted-date");
                $date.append(list[i].date);
                var $company = $("<div>").addClass("card-title company-name");
                $company.append(list[i].company.substring(0, 20));
                var $link = $("<a>").addClass("waves-effect waves-light btn lime accent-3 mapToggle map-link");
                $link.attr("data-company", list[i].company);
                $link.attr("data-location", list[i].location);
                $link.attr("href","#anchor");
                $link.append("See Job on Map");
                $content.append($jobTitle);
                $content.append($location);
                $content.append($date);
                $content.append($company);
                $content.append($link);
                $card.append($content);
                $jobDiv.append($card);
            }
           initializeCarousel();
        });// end of ajax call 
    }// end of dispayCard function 

    function renderMap() {
        var $addr = $(this).data("company").replace(/[ ,]+/g, "+");
        var $city = $(this).data("location").replace(/[ ,]+/g, "+");
        var $iframe = $("<iframe>");
        $iframe.attr("width", width);
        $iframe.attr("height", height);
        $iframe.attr("frameborder", "0");
        $iframe.attr("style", "border:0");
        $iframe.attr("src", gSrc + ikey + "&q=" + $addr + ", " + $city);
        $("#map-frame").html($iframe);
        $("#map-job-container").show();
    }

    displayCards();
    $(document).on("click", ".map-link", renderMap);
    $("#map-job-container").hide();
    
})
