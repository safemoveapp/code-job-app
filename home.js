jQuery(function ($) {

    // generate cards from clicking search button
    $("#city-cta").on("click", function (e) {
        var $input = $("#city-search").val().trim();
        if ($input.length === 0) {
            e.preventDefault();
            $("#city-cta").addClass("modal-trigger");
            $(".modal").modal();
        } else if($input.length !== 0){
            window.localStorage.setItem('input', $input);
            location.replace("page2.html");
        }
    });


   
})

 