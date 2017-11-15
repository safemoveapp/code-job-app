jQuery(function ($) {
    var job = "javascript";
    //var city = "chicago,il";

    var width = "600";
    var height = "450";


    var gKey = "AIzaSyB8DKnCUswaOV0Afr4jd1jyteETwqWQ4-M";
    var ikey = "AIzaSyD8yKqnL-7Y8-2cOWW_3YqN66bePhCWp6g";
    var gSrc = "https://www.google.com/maps/embed/v1/place?key=";



    $('.carousel.carousel-slider').carousel({fullWidth: true});

    function displayCards() {
        var city = window.localStorage.getItem('input');
        var queryUrl3 = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" +
            "&city=" + city;
        $.ajax({
            url: queryUrl3,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            var list = response.resultItemList;

            for (i = 0; i < 5; i++) {
                var $jobDiv = $("#jobs");

                // var $card = $("<div>").addClass("card-size card purple darken-1");
                // var $content = $("<div>").addClass("card-content white-black");
                // var $jobTitle = $("<div>").addClass("card-title job-name");
                // $jobTitle.append((list[i].jobTitle).substring(0, 20));
                // var $location = $("<div>").addClass("card-title city-name");
                // $location.append(list[i].location);
                // var $date = $("<div>").addClass("card-title posted-date");
                // $date.append(list[i].date)
                // var $company = $("<div>").addClass("card-title company-name");
                // $company.append(list[i].company);
                // var $link = $("<a>").addClass("map-link");
                // $link.attr("data-company", list[i].company);
                // $link.attr("data-location", list[i].location);
                // $link.append("See map on link");

                // $content.append($jobTitle);
                // $content.append($location);
                // $content.append($date);
                // $content.append($company);
                // $content.append($link);

                // $card.append($content);

                // $jobDiv.append($card);

                // var $carousel = $("<div>").addClass("carousel carousel-slider center");
                //     $carousel.attr("data-indicators", "true");
                var $panel = $("<div>").addClass("carousel-item red white-text");
                    $panel.attr("href", "#one!");
                var $title = $("<h1>");
                    $title.append((list[i].jobTitle));
                var $location = $("<h5>");
                    $location.append((list[i].location));
                var $date = $("<h5>");
                    $date.append((list[i].date));
                var $company = $("<h5>");
                    $company.append((list[i].company));
                var $link = $("<div>").addClass("carousel-fixed-item center");
                var $btn = $("<a>").addClass("btn waves-effect white grey-text darken-text-2 map-link");
                    $btn.attr("data-company", list[i].company);
                    $btn.attr("data-location", list[i].location);
                    $btn.text("see more on map");

                $link.append($btn);

                $panel.append($title);
                $panel.append($location);
                $panel.append($date);
                $panel.append($company);
                $panel.append($link);

                //$carousel.append($panel);

                $jobDiv.html($panel);
            }
            // test = $(".company-name").text(); 
            // console.log(test);
        });// end of ajax call 

        //console.log(test);

    }

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
})