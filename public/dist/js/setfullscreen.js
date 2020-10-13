if (document.fullscreenEnabled) {			
    var btn = document.getElementById("toggle");

    btn.addEventListener("click", function (event) {

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

    }, false);


    document.addEventListener("fullscreenchange", function (event) {

        console.log(event);

        if (!document.fullscreenElement) {
            btn.innerHTML = "<i class='fas fa-arrows-alt'></i>";
        } else {
            btn.innerHTML = "<i class='fas fa-compress-arrows-alt'></i>";
        }
    });

    document.addEventListener("fullscreenerror", function (event) {

        console.log(event);

    });
}