Handlebars.registerHelper('firstname', function (name) {
    return name.first;
});
Handlebars.registerHelper('fullname', function (name) {
    return name.first + " " + name.last;
});

function setupGallery2012() {
    $("#blog2012TabContainer").append(Handlebars.compile($("#blog2012TabTemplate").html())(blog2012Text));
    $("#blog2012TextContainer").append(Handlebars.compile($("#blog2012TextTemplate").html())(blog2012Text));
    $("#blog2012TabContainer").children("li").first().addClass("active");
    setupGallery(2012, 26);
}

function setupGallery2013() {    
    $("#blog2013TabContainer").append(Handlebars.compile($("#blog2013TabTemplate").html())(blog2013Text));
    $("#blog2013TextContainer").append(Handlebars.compile($("#blog2013TextTemplate").html())(blog2013Text));
    $("#blog2013TabContainer").children("li").first().addClass("active");
    setupGallery(2013, 20);
}


function setupGallery(year, spriteCount) {

    //fill in images
    for (var i = 1; i < spriteCount + 1; i++) {
        $("#galleryWrapper").append("<div class='galleryPhoto sprite" + year + " sprite-" + i + "-" + year + "' data-num=" + i + "></div>");
    }

    $(".galleryPhoto").first().addClass("active");
    $("#mainPhoto").attr("src", "/Content/Images/" + year + " photos/" + $(".galleryPhoto").first().attr("data-num") + ".jpg");

    imagePath = $(".galleryPhoto.active").next().css("background-image");
    $("#nextPhoto").attr("src", "/Content/Images/" + year + " photos/" + $(".galleryPhoto.active").next().attr("data-num") + ".jpg");

    var slideTime = 6000;
    slideTimer = setInterval(function () { nextPhoto(year) }, slideTime);

    $(".galleryPhoto").click(function () {
        var newPhoto = $(this);
        $(".galleryPhoto").removeClass("active");
        newPhoto.addClass("active");
        $("#mainPhoto").transition({  //fade out the current
            opacity: 0,
            scale : 1.1
        }, 600, function () {
            //progress bar
            document.getElementById("progressBar").innerHTML = "<div class='bar' style='width:0%'></div>";
            $(".bar").css("width", "100%");

            //replace main photo
            $("#mainPhoto").attr("src", "");
            $("#mainPhoto").attr("src", "/Content/Images/" + year + " photos/" + newPhoto.attr("data-num") + ".jpg");

            //setup next transition
            var futurePhoto;
            if ($(".galleryPhoto.active").next("div").length > 0) {
                futurePhoto = $(".galleryPhoto.active").next();
            } else {
                futurePhoto = $(".galleryPhoto").first();
            }
            $("#nextPhoto").attr("src", "/Content/Images/" + year + " photos/" + futurePhoto.attr("data-num") + ".jpg");

            clearInterval(slideTimer);
            slideTimer = setInterval(function () {
                nextPhoto(year);
            }, slideTime);
            $("#mainPhoto").transition({  //fade in the new
                opacity: 1,
                scale: 1
            });
        });
    });

    setTimeout(function () {
        $(".bar").css("width", "100%");
        $("#content").find("img").removeClass("img-thumbnail");
    }, 1);

}
function nextPhoto(year) {    
    $("#mainPhoto").transition({ //fade out the current
        opacity: 0,
        scale : 1.1
    }, 600, function () {
        //progress bar
        document.getElementById("progressBar").innerHTML = "<div class='bar' style='width:0%'></div>";
        $(".bar").css("width", "100%");

        //change thumbnails
        var firstPhoto = $(".galleryPhoto.active").removeClass("active");
        if (firstPhoto.next("div").length == 0) {
            $(".galleryPhoto").first().addClass("active");

        } else {
            firstPhoto.next().addClass("active")
        }
        //update main photo
        $("#mainPhoto").attr("src", $("#nextPhoto").attr("src"));

        //update next photo
        var futurePhoto;
        if ($(".galleryPhoto.active").next(".galleryPhoto").length > 0) {
            futurePhoto = $(".galleryPhoto.active").next();
        } else {
            futurePhoto = $(".galleryPhoto").first();
        }
        $("#nextPhoto").attr("src", "/Content/Images/" + year + " photos/" + futurePhoto.attr("data-num") + ".jpg");


        $("#mainPhoto").transition({  //fade in the new
            opacity: 1,
            scale: 1
        });
    });
};