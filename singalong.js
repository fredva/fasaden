// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videotime = 0;
var debug = true
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
    const element = document.getElementById("textContainer")
    element.innerHTML = next.text
    element.dataset.text = next.text
    var duration = next.end - next.start
    element.setAttribute("style", "animation-duration: " + duration + "s;");

}

function update(time) {
    if (debug) {
        document.getElementById("time").innerHTML = time;
    }
    var pastLines = lyrics.filter(function(l) {return l.start < time});
    var next = pastLines[pastLines.length - 1];
    console.log(time, next)
    if (currentLine != next.text) {
        updateLine(next)
    }
}

var p
function onPlayerReady(event) {
    window.playz = event.target
    console.log("Player ready")
    // console.log(event.target.playVideo)
    // setTimeout(function() {
    //     event.target.playVideo();
    // }, 1000)
    // setTimeout(function() {
    // }, 10)

    function updateTime() {
        // var oldTime = videotime;
        if (player && player.getCurrentTime) {
            update(player.getCurrentTime())
        }
        // clearInterval(timeupdater)
    }

    // var timeupdater = setInterval(updateTime, 100);

    setTimeout(() => {
        clearInterval(timeupdater)
    }, 10000)
}

function onPlayerStateChange(event) {
    console.log(event)
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}

function stopVideo() {
    player.stopVideo();
}



function setTheme(i) {
    // console.log(themes[i % 3])
    var themes = ["top", "bottom", "mid"]
    document.body.className = themes[i % 3]
}

var theme = 0

document.addEventListener("DOMContentLoaded", function(event) {
    setTheme(theme)
});

document.addEventListener("keydown", event => {
    // console.log(event.code)
    if (event.code === "KeyT") {
        setTheme(++theme)
    }
    // console.log(event)
})