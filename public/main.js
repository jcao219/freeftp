var commandWindow;

/**
 * Listens for the app launching then creates the window
 *
 * @see https://developer.chrome.com/apps/app_runtime
 * @see https://developer.chrome.com/apps/app_window
 */
chrome.app.runtime.onLaunched.addListener(function() {
  if (commandWindow && !commandWindow.contentWindow.closed) {
    commandWindow.focus();
  } else {
    chrome.app.window.create('index.html',
      {
        id: "mainwin",
        frame: "none",
        innerBounds: {
          width: 1024,
          height: 768,
          minWidth: 640,
          minHeight: 480
        },
        resizable: true
      }, function(w) {
        commandWindow = w;
      });
  }
});
