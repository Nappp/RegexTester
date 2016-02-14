var readline = require('readline');
var fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('records.txt'),
  output: process.stdout,
  terminal: false
});
// const exp = /(?:(\w+):\/{0,2})?((?:(?:(?:\w|[%-])+)\.?)+\.(?:(?:\w|[%-])+))(?::(\d{0,5}))?((?:(?:\/(?:(?:\w|[%-])+))+)?(?:(?:\/)(?:(?:\w|[%-])+)(?:\.(?:(?:\w|[%-])+))?))?(?:\/?\??((?:\w|[=&%\[\]-])+))?(?:\/?#?((?:\w|[=&%-])+))?/

// Compiled Regex
const c_exp = new RegExp(/(?:(\w+):\/{0,2})?((?:(?:(?:\w|[%-])+)\.?)+\.(?:(?:\w|[%-])+))(?::(\d{0,5}))?((?:(?:\/(?:(?:\w|[%-])+))+)?(?:(?:\/)(?:(?:\w|[%-])+)(?:\.(?:(?:\w|[%-])+))?))?(?:\/?\??((?:\w|[=&%\[\]-])+))?(?:\/?#?((?:\w|[=&%-])+))?/);

var parse = (url) => {
  var result = c_exp.exec(url);
  // var result = url.match(exp);

  return result && {
    "url": result[0],
    "protocol": result[1],
    "host": result[2],
    "port": result[3],
    "path": result[4],
    "query": result[5],
    "hash": result[6]
  } || null;
};

rl.on('line', (line) => {
  parse(line);
  // console.log(parse(line));
});
