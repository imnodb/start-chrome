var exec = require('child_process').exec
  , path = require('path')
  ;


/**
 * run chrome with flags.
 *
 * @return {ChildProcess} - the child process object.
 * @param {string} target - the file/uri to open.
 * @param {object} args - Google Chrome add the flags (or "switches")
 * @param {function(Error)} callback - called with null on success, or
 *      an error object that contains a property 'code' with the exit
 *      code of the process.
 */

module.exports = open;

function open(target, args, callback) {
  var opener;
  var flags = {
    // 'user-data-dir': '',
  };

  if (typeof (args) === 'function') {
    callback = args;
  } else {
    Object.assign(flags, args);
  }

  switch (process.platform) {
    case 'darwin':
      var pathQuery = 'mdfind "kMDItemCFBundleIdentifier=="' + 'com.google.Chrome' + '""'

      return exec(pathQuery, function (err, stdout) {
        var loc = stdout.trim()
        try {
          if (loc === '') {
            loc = null
            err = err || new Error('Not found Google Chrome.')
            throw err;
          }
        } catch (error) {
          console.log(error);
          return;
        }
        opener = loc.replace(/ /g, '\\ ') + '/Contents/MacOS/Google\\ Chrome' + switches(flags);
        console.log(opener);
        if (process.env.SUDO_USER) {
          opener = 'sudo -u ' + process.env.SUDO_USER + ' ' + opener;
        }
        return exec(opener + ' "' + escape(target) + '"', callback);
      });

      return;
    case 'win32':
      opener = 'start "chrome" ' + switches(flags);

      break;
    default:
      opener = 'google-chrome ' + switches(flags);

      break;
  }
  if (process.env.SUDO_USER) {
    opener = 'sudo -u ' + process.env.SUDO_USER + ' ' + opener;
  }
  return exec(opener + ' "' + escape(target) + '"', callback);
}

function escape(s) {
  return s.replace(/"/g, '\\\"');
}
function switches(flags) {
  var str = ' ';
  for (var key in flags) {
    str += '--' + key + '="' + flags[key] + '" '
  }
  return str;
}
