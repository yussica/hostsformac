const request = require('request');
const cheerio = require('cheerio');
const hostList = [
  "github.com",
  "assets-cdn.github.com",
  "github.global.ssl.fastly.net",
  "apple.com"
];

hostList.forEach(function(value, index, array) {
  const ipaddress = 'http://' + value + '.ipaddress.com'
  console.log(ipaddress);
  const options = {
    url: ipaddress,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
    },
    timeout: 1500
  };
  request(options, function (error, response, body) {
    if (error) {
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
    } else {
      const $ = cheerio.load(body);
      const tables = $('table.panel-item');
      tables.each(function(index, element) {
        var $element = $(this);
        var $tr = $($element.children().first().children().first());
        var $th = $tr.children().first();
        var $thText = $th.text();
        if ($thText === 'IPv4 Addresses') {
          var $td = $($tr.children().toArray()[1]);
          var $addressUI = $td.children().first();
          var $addressLI = $($addressUI.children().toArray()[0]);
          var output = $addressLI.text() + '\t\t' + value;
          console.log(output);
        }
      });
      // analyzeTable(tables);
    }
  });
});

var analyzeTable = function(tables) {
  tables.each(function(index, element) {
    var tr = $(element);
    console.log(tr);
  });
}