function toSeconds(timestamp) {
  var numbers = timestamp.split(".")
  var mins = Number(numbers[0])
  var secs = Number(numbers[1])
  var milis = Number(numbers[2])
  return mins * 60 + secs + milis / 1000
}

function parseLyrics(src) {
  var lines = src//.split("\n")
  return lines.map(function (line) {
    var words = line.split(";")
    var start = toSeconds(words[0])
    var end = toSeconds(words[1])
    var text = words[2]
    return {start, end, text}
  })
}
