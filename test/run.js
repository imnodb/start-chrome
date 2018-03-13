var path = require('path');
var startChrome = require('../');

describe('run', function () {
  function pathTo(asset) {
    return path.join(__dirname, 'support', asset);
  }

  it('should run chrome', function (done) {
    startChrome('http://www.google.com', done);
  });

  it('should run https uris in chrome', function (done) {
    startChrome('https://www.google.com', done);
  });

  it('should run Chrome with spaces', function (done) {
    startChrome(pathTo('with space.html'), done);
  });

  it('should run Chrome with quotes', function (done) {
    startChrome(pathTo('with"quote.html'), done);
  });

  it('should run Chrome with flags', function (done) {
    startChrome('www.google.com', {
      'user-data-dir': path.join(__dirname, '../chrome-user-data'),
      'proxy-pac-url': 'http://127.0.0.1:8081/static/abc.pac',
    }, done);
  });
});

