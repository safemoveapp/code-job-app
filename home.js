jQuery(function($){
    
    // generate cards from clicking search button
    $("#city-cta").on("click", function () {
        var $input = $("#city-search").val().trim();
        if ($input.length !== 0) {
            window.localStorage.setItem('input', $input);
        } else {
            alert("Input field is required!");
        }


    });
})