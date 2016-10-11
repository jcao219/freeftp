import React from 'react';
import ReactDOM from 'react-dom';
import ConnectToSite from './ConnectToSite';
//import FtpClient from './ftp-client';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/*
document.addEventListener("DOMContentLoaded", function(event) { 

  document.getElementById('serverStart').addEventListener('click', function() {
    var addr=document.getElementById("addresses").value;
    var port=parseInt(document.getElementById("serverPort").value, 10);
    document.querySelector("#server").className="connected";

    var ftpClient = new FtpClient(addr, port, "demo-user", "demo-user");

    ftpClient.once('dir result', function(pwd) {
      console.log(pwd);
      document.getElementById('pwd').innerHTML = pwd;
    });

    ftpClient.on('logged in', () => ftpClient.getPwd());
  });
});
*/

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <ConnectToSite />
  </MuiThemeProvider>,
  document.getElementById('root')
);
