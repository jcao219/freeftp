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
          width: 1280,
          height: 720,
          minWidth: 1280,
          minHeight: 720
        },
        resizable: true
      }, function(w) {
				commandWindow = w;
			});
	}
});

