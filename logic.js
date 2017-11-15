$(".carousel").slick({
    dots: true,

    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
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

jQuery(function ($) {
   
    var width = "600";
    var height = "450";
    var gKey = "AIzaSyB8DKnCUswaOV0Afr4jd1jyteETwqWQ4-M";
    var ikey = "AIzaSyD8yKqnL-7Y8-2cOWW_3YqN66bePhCWp6g";
    var gSrc = "https://www.google.com/maps/embed/v1/place?key=";


    function displayCards() {
        var city = window.localStorage.getItem('input');
        var queryUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" +
            "&city=" + city;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).done(function (response) {
            //console.log(response);
            var list = response.resultItemList;

            for (i = 0; i < 8; i++) {
                var $jobDiv = $(".carousel");
                // $jobDiv.append("<div class='card-size card purple darken-1'><div class='card-content white-text'>" + "<div class='card-title job-name'>" +
                //     (list[i].jobTitle).substring(0, 30) + " </div><div class='card-title city-name' data-name=" + list[i].location + ">" +
                //     list[i].location + " </div> <div class='card-title posted-date'>" +
                //     list[i].date + "</div> <div class='card-title pcompany-name' data-name=" + list[i].company + ">" +
                //     list[i].company + "</div> <a href='#' class='map-link'>See map for location</a>");
                // above sample line replaces job posting detail with map  

                var $card = $("<div>").addClass("card-size card purple darken-1");
                var $content = $("<div>").addClass("card-content white-black");
                var $jobTitle = $("<div>").addClass("card-title job-name");
                $jobTitle.append((list[i].jobTitle).substring(0, 20));

                var $location = $("<div>").addClass("card-title city-name");
                $location.append(list[i].location);

                var $date = $("<div>").addClass("card-title posted-date");
                $date.append(list[i].date);

                var $company = $("<div>").addClass("card-title company-name");
                $company.append(list[i].company);

                var $link = $("<a>").addClass("waves-effect waves-light btn lime accent-3 mapToggle map-link");
                $link.attr("data-company", list[i].company);
                $link.attr("data-location", list[i].location);
                $link.append("See map on link");

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
        $("#map").html($iframe);
    }


    displayCards();

    $(document).on("click", ".map-link", renderMap);

    $("#map-job-container").hide();
    
    $(".mapToggle").click(function (event) {
        event.preventDefault();
        $("#map-job-container").show();
        console.log("button");
      });
})