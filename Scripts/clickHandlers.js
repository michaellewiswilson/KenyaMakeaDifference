
activePage = null;
scrollLocation = null;

function insertNextPage(data, callback) {
    data = $(data).find("#mainPane");
    $("#mainPane").replaceWith(data);
    $("#mainPane").transition({
        scale: 1,
        opacity: 1
    }, 400, function () {

        //route to anchor
        if (scrollLocation != null) jumpToAnchor(event, scrollLocation, function () { });
        scrollLocation = null;
        callback == null ? "" : callback();
    });
}

function handleNav(event, location, callback) {   

    if (location == activePage) {
        return;
    }

    var data = null;
    var transitioned = true;

    $("#mainPane").transition({
        scale: .9,
        opacity: 0
    }, 400, function () {
        if (data != null) { //if we've got the data, load it up
            insertNextPage(data, callback);
            activePage = location;
        } else {
            transitioned = false;
            $("#mainPane").append("<i class='icon-spinner icon-spin'></i>");
        }
    });

    route = location == "index" ? location : "Pages/" + location;

    $.get(route + ".html", function (pageHTML) {
        data = $(pageHTML);
        if (!transitioned) { //only move forward if the transition didn't handle it
            insertNextPage(data, callback);
            activePage = location;
        }
    });
}

function jumpToAnchor(event, anchor, callback) {
    if (document.getElementById(anchor) != null) {
        //scroll to new location
        var destination = $(document.getElementById(anchor)).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 80 }, 500);
    } else {
        scrollLocation = anchor;
    }
}

function hyperlinkFix() {
    $("a[href='kenya-2012-blog.html']").attr("href", "/#/kenya-2012-blog.html");
    $("a[href='photos.html']").attr("href", "/#/Photos2013.html");
    $("a[href='2012.html']").attr("href", "/#/2012-overview.html");
    $("a[href='2013.html']").attr("href", "/#/2013-overview.html");

    //btn fix too, why not
    $(".wsite-button").removeClass("wsite-button").addClass("btn");
}

function is_touch_device() {
    return !!('ontouchstart' in window) // works on most browsers 
        || !!('onmsgesturechange' in window); // works on ie10
};

$(document).on("click", '.scrollPage', function () {
    var elementClicked = $(this).attr("href");
    $(this).parents(".dropdown").removeClass("open");
    var destination = $(elementClicked).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 20 }, 500);
    return false;
});