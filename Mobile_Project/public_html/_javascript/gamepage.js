
var width;
var height;

var events = [];
var transitions = [];
var reverse = [];

var lastEvent = "";

/*
 * Function for centering element on page
 * Params:
 *      element -> $(node) 
 *      sub1 -> number to be subtracted from centering on height
 *      sub2 -> number to be subtracted from centering on width
 */
function center(element, sub1, sub2) {

    width = $(window).width() / 2 - sub1;
    height = $(window).height() / 2 - sub2;

    element.css({"margin-left": width, "margin-top": height});

}

function eventsToString() {
    var list = "";
    for (event in events) {
        list += events[event] + " ";
    }
    return list;
}

/*
 * Function for playing audio
 * Param:
 *      filename -> the path/name to a sound file
 */
function playAudio(filename) {
    var sound = document.createElement('audio');
    sound.setAttribute('src', filename);
    sound.setAttribute('autoplay', 'autoplay');
    sound.play();
}

$(document).ready(function () {
    center($("#startBtn"), 100, 100);
    $.ajax({
        type: "GET",
        url: "_xml/mobile_events.xml",
        dataType: "xml",
        success: storevalues
    });


    $(document).on(eventsToString() + " click", function () {
       lastEvent = event.type + "";
       alert(event.type);

    });
    function storevalues(xml) {

        $(xml).find("event").each(function () {
            events.push($(this).attr("name"));
            transitions.push($(this).attr("transition"));
            reverse.push($(this).attr("reverse"));

        });


    }

    $("#start").click(function () {
        $("#countdown").text("");
        center($("#countdown"), 100, 100);
        countDown("#countdown", 3);

    });

    function startgame() {
        var page = "game1";
        var success = true;
        while (success) {
            page = (page == "game1") ? "game2" : "game1";
            success = round(page);
            
        }


    }


    function round(page) {
        $(":mobile-pagecontainer").pagecontainer("change", "#" + page, {transition: "pop"});

        $("#" + page).css({"background-color": randomColor()});
        var index = Math.floor((Math.random() * events.length));

        drawImage(page, index);
        lastEvent = "";
       
        var interval = setInterval(function () {           
            //TODO: Check event to see if it matches randomly selected event
           
            if ("click" == lastEvent) {
                $(":mobile-pagecontainer").pagecontainer("change", "#game1", {transition: "pop"});
                clearInterval(interval);
                return true;
            } else {
                return true;
            }
            
          
           
          
        }, 1000);




    }

    function drawImage(page, index) {
        var canvas = document.getElementById(page + "Canvas");

        var ctx = canvas.getContext("2d");
        var imageObj = new Image();
        imageObj.onload = function () {
            imageObj.width = imageObj.width * .22;
            imageObj.height = imageObj.height * .22;
            ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
        };

        center($("canvas"), 70, 100);
        imageObj.src = "_images/" + events[index] + ".png";
    }


    function countDown(element, length) {
        $element = $(element);
        var num = length;
        var timer = setInterval(function () {
            if (num == 0) {
                clearTimeout(timer);
                $element.text("GO!");
                playAudio('_sounds\\beep2.wav');
                startgame();
                return;
            }
            playAudio('_sounds\\beep1.wav');
            $element.text(num--);


        }, 1000);
    }

});
$(window).resize(function () {
    center($("#startBtn"), 100, 100);
    center($("#countdown"), 100, 100);
    center($("canvas"), 70, 100);
});


/*
 * Generates a random color
 * Returns: Hex for color
 */
function randomColor() {
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color;
}
