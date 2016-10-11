import EventEmitter from './event-emitter';
import TcpConnection from './tcp-connection';

class FtpClient extends EventEmitter {

  constructor(addr, port, user, pass) {
    super();

    this.addr = addr;
    this.port = port;
    this.user = user;
    this.pass = pass;

    this.commander = new TcpConnection(addr, port, true);
    this.commander.on("recv", str => this._onReceive(str));
    this.commander.on("error", str => this._onError(str));
    this.commander.connect();
  }

  _onError(str) {
    this.emitEvent("tcp error", [str]);
  }

  _onReceive(str) {
    var splitted = str.split(' ');
    switch(splitted[0]) {
      case "220": // Ready for login
        if(this.user == null) {
          this.emitEvent("login pls");
        } else {
          this.commander.sendln("USER " + this.user);
        }
        break;
      case "331": // Need password
        if(this.pass != null)
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
        console.log("Unable to handle: " + splitted[0]);
    }
  }

  getPwd () {
    this.commander.sendln("PWD");
  }

  login(user, pass) {
    this.user = user;
    this.pass = pass;
    this.commander.sendln("USER " + this.user);
  }
}

export default FtpClient;
