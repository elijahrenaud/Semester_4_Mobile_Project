var transitions = ["fade", "flip", ]
var width;
var height;

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

    $("#start").click(function () {
        $("#countdown").text("");
        center($("#countdown"), 100, 100);
        countDown("#countdown", 3);
        startgame();
    });

    function startgame() {

    }


});

$(window).resize(function () {
    center($("#startBtn"), 100, 100);
    center($("#countdown"), 100, 100);
});
function countDown(element, length) {
    $element = $(element);
    var num = length;
    var timer = setInterval(function () {
        if (num < 1) {
            clearTimeout(timer);
            $element.text("GO!");
            playAudio('_sounds\\beep2.wav');
            return;
        }
        playAudio('_sounds\\beep1.wav');
        $element.text(num--);


    }, 1000);
}


