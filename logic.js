jQuery(function ($) {
    var job = "javascript";
    //var city = "chicago,il";
    var location;
    
    var company = "kpmg";
    var width = "600";
    var height = "450";


    var gKey = "AIzaSyB8DKnCUswaOV0Afr4jd1jyteETwqWQ4-M";
    var ikey = "AIzaSyD8yKqnL-7Y8-2cOWW_3YqN66bePhCWp6g";
    var gSrc = "https://www.google.com/maps/embed/v1/place?key=";

    var test = "";



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
            // for (var i = 0; i < list.length; i++) {
            //     // console.log(list[i].jobTitle);
            //     // console.log(list[i].location);
            //     // console.log(list[i].company);
            //     // console.log(list[i].detailUrl);
            //     console.log("-----------------");
            //     location = list[0].location;
            //     console.log(location);
            // }
            // var jobDiv = $("<div class='carousel'>");
       // var jobDiv = $("<div class='card - size card purple darken - 1'>  <div class='card - content white - text'>'");
       for (i = 0; i < 10; i++) {
        var jobDiv = $(".carousel");
        jobDiv.append("<div class='card-size card purple darken-1'>  <div class='card-content white-text'>" + "<div class='card-title job-name'>" +
            (list[i].jobTitle).substring(0, 30) + " </div> <div class='card-title city-name'>" + 
            list[i].location + " </div> <div class='card-title posted-date'>" +
            list[i].date + "</div> <div class='card-title pcompany-name' id='" + i + "'>" + list[i].company + "</div> <div class='card-title job-link'> See map for location..");
         // above sample line replaces job posting detail with map  
        // response.resultItemList[i].detailUrl + "' > See map for location.. </a>");
       }
            // var $iframe = $("<iframe>");
            // $iframe.attr("width", width);
            // $iframe.attr("height", height);
            // $iframe.attr("frameborder", "0");
            // $iframe.attr("style", "border:0");
            // $iframe.attr("src", gSrc + ikey + "&q=" + company + ", " + newCity);
            // $("#map").append($iframe);


            // var plus = "+";
            // var newCity = location.split(",").join(plus);
            // console.log(newCity);
       
        });// end of ajax call 

        //console.log(test);
        console.log(city);
    }
    
    displayCards();
})