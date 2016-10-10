(function(exports) {
  "use strict";

  function FtpClient(addr, port, user, pass) {
    this.addr = addr;
    this.port = port;
    this.user = user;
    this.pass = pass;

    this._onReceive = this._onReceive.bind(this);

    this.commander = new TcpConnection(addr, port, true);
    this.commander.on("recv", this._onReceive);
    this.commander.connect();
  }

  Heir.inherit(FtpClient, EventEmitter);

  FtpClient.prototype._onReceive = function(str) {
    var splitted = str.split(' ');
    switch(splitted[0]) {
      case "220": // Ready for login
        this.commander.sendln("USER " + this.user);
        break;
      case "331": // Need password
        this.commander.sendln("PASS " + this.user);
        break;
      case "230": // Logged in
        this.emitEvent("logged in");
        break;
      case "257": // Either PWD response or MKD(ir) response
        var pwd = splitted[1];
        pwd = pwd.substring(1, pwd.length - 1);
        pwd = pwd.replace(/""/g, '"'); // FTP converts " to ""
        this.emitEvent("dir result", [pwd]);
        break;
      default:
        log("Unable to handle: " + splitted[0]);
    }
  };

  FtpClient.prototype.getPwd = function() {
    this.commander.sendln("PWD");
  };

  function log(msg) {
    console.log(msg);
  }

  function error(msg) {
    console.error(msg);
  }

  exports.FtpClient = FtpClient;
})(window);
