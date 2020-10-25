// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videotime = 0;
var debug = false
var currentLine = ""
var lyrics = fasaden

console.log(lyrics)

function onYouTubeIframeAPIReady() {
    console.log("API ready")
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '4OFRFVnuBEQ',
        playerVars: {
            modestbranding: true,
            autoplay: 1,
            // controls: 0,
            showinfo: 0,
            fs: 0,
            rel: 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function updateLine(next) {
    currentLine = next.text
    const textLine = document.getElementById("text")
    const progressLine = document.getElementById("progress")
    textLine.innerHTML = next.text
    progressLine.innerHTML = next.text
    var duration = next.end - next.start

    progressLine.setAttribute("style", "");
    setTimeout(function() {
        progressLine.setAttribute("style", "animation-duration: " + duration + "s; animation-name: run-text;");
    }, 10)

}

function update(time) {
    if (debug) {
        document.getElementById("time").innerHTML = time;
    }
    var pastLines = lyrics.filter(function(l) {return l.start < time});
    var next = pastLines[pastLines.length - 1];
    debug && console.log("next: ", time, next)
    if (currentLine != next.text) {
        updateLine(next)
    }
}

function onPlayerReady(event) { }

function updateTime() {
    if (player && player.getCurrentTime) {
        update(player.getCurrentTime())
    }
}

var intervalId
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        intervalId = setInterval(updateTime, 100);
    } else {
        clearInterval(intervalId)
    }
}

function stopVideo() {
    player.stopVideo();
}



function setTheme(i) {
    var themes = ["top", "bottom", "mid"]
    document.body.className = themes[i % 3]
}

var theme = 0

document.addEventListener("DOMContentLoaded", function(event) {
    setTheme(theme)
});

document.addEventListener("keydown", event => {
    if (event.code === "KeyT") {
        setTheme(++theme)
    }
    if (event.code === "Space") {
        console.log(player.getCurrentTime())
    }
})