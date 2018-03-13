# start-chrome

run chrome with flags.

# Usage

```javascript
var startChrome = require("start-chrome");
startChrome("http://www.google.com");
```

`startChrome` To use a command line switch.

```javascript
startChrome("http://www.google.com", {'user-data-dir': path.join(__dirname, './chrome-user-data'),});
```

# Installation

    npm install start-chrome

