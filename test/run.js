var path = require('path');
var open = require('../');

describe('open', function () {
  function pathTo(asset) {
    return path.join(__dirname, 'support', asset);
  }

  it('should open html file in chrome', function (done) {
    open('http://www.google.com', done);
  });

  it('should open https uris in chrome', function (done) {
    open('https://www.google.com', done);
  });

  it('should run Chrome files with spaces', function (done) {
    open(pathTo('with space.html'), done);
  });

  it('should run Chrome files with quotes', function (done) {
    open(pathTo('with"quote.html'), done);
  });

  it('should run Chrome with flags', function (done) {
    open('www.google.com', {
      'user-data-dir': path.join(__dirname, '../chrome-user-data'),
      'proxy-pac-url': 'http://127.0.0.1:8081/static/abc.pac',
    }, done);
  });
});

