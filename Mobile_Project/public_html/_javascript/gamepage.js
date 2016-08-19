/*Group Members:
    Elijah Renaud #991364626
    Danella Olsen #991369845
*/

var width;
var height;

var events = [];
var transitions = [];
var reverse = [];

var lastEvent = "";

var score;

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

    $("start2").click(function () {

        window.location.href = "Game.html";
        //window.location.reload();
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
        score = 0;

        round("game2", "pop", false);
    }
    var index;

    function round(page, trans, rever) {
        $("#" + page + "Score").text("SCORE: " + score);
        $.mobile.pageContainer.pagecontainer.reverse = rever;

        $.mobile.pageContainer.pagecontainer("change", "#" + page, {
            transition: trans
        });


        $("#" + page).css({"background-color": randomColor()});
        index = Math.floor((Math.random() * events.length));

        drawImage(page, index);
        lastEvent = "";
        $("#" + page + "Timer").circletimer({
            onComplete: function () {

                failure();
            },
            timeout: 2000
        });

        $("#" + page + "Timer").circletimer("start");

        $(document).one(events[index], function () {
            //event.stopImmediatePropagation();
            success(page);

        });

    }

    function success(page) {
        ++score;
        // clearTimeout(timer);
        $("#" + page + "Timer").circletimer("stop");
        playAudio('_sounds\\beep1.wav');
        round((page == "game1") ? "game2" : "game1", transitions[index], reverse[index]);
    }

    function failure() {
        $("#scoreDisp").text("Score: " + score);
        $.mobile.pageContainer.pagecontainer("change", "#gameover");
        
        /*
         * 
         * NOTE: The score should be saved in the XML file, the username will be pulled
         * up from localstorage and it will saved in the XML document in the format: 
         * 
         * <player name="somename" score="9"></player>
         * 
         */


    }

    function drawImage(page, index) {
        var canvas = document.getElementById(page + "Canvas");

        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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