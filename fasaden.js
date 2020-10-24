var fasadenRaw =
    "0.0.0;0.5.0;hvit som vanilje men er søtere enn kesam\n" +
    "0.5.0;0.10.0;alltid masse jenter men har alltid følt meg ensom"


function toSeconds(timestamp) {
    var numbers = timestamp.split(".")
    var mins = Number(numbers[0])
    var secs = Number(numbers[1])
    var milis = Number(numbers[2])
    return mins* 60 + secs + milis/1000
}

function parseLyrics(src) {
    var lines = src.split("\n")
    // console.log(lines)
    return lines.map(function(line) {
        var words = line.split(";")
        var start = toSeconds(words[0])
        var end = toSeconds(words[1])
        var text = words[2]
        return {start, end, text}
    })
}

var fasaden = parseLyrics(fasadenRaw)

