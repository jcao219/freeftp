import FtpClient from './ftp-client';

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
