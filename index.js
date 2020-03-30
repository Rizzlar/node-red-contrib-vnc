var rfb = require('rfb2');
var r = rfb.createConnection({
  host: '172.16.16.29',
  port: 5900,
  password: 'pass'
});

r.on('connect', function() {
  console.log('successfully connected and authorised');
  console.log('remote screen name: ' + r.title + ' width:' + r.width + ' height: ' + r.height);
  r.updateClipboard('send text to remote clipboard');
});

r.on('clipboard', function(newPasteBufData) {
  console.log('remote clipboard updated!', newPasteBufData);
});