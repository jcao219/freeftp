var ftpClient;
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
			{id: "mainwin", innerBounds: {width: 800, height: 459, left: 0}},
			function(w) {
				commandWindow = w;
			});
	}
});

function startServer(addr, port) {
  if (ftpClient) {
    ftpClient.disconnect();
  }
  ftpClient = new FtpClient(addr, port, null, null);
}


function stopServer() {
  if (ftpClient) {
    ftpClient.disconnect();
    ftpClient=null;
  }
}
