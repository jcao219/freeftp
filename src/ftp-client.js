import EventEmitter from './event-emitter';
import TcpConnection from './tcp-connection';

class FtpClient extends EventEmitter {

  constructor(addr, port, user, pass) {
    super();

    this.addr = addr;
    this.port = port;
    this.user = user;
    this.pass = pass;

    this.commander = new TcpConnection(addr, port);
    this.commander.on("recv", str => this._onReceive(str));
    this.commander.on("error", str => this._onError(str));
    this.commander.connect();
  }

  _onError(str) {
    this.emitEvent("tcp error", [str]);
  }

  _onReceive(str) {
    var splitted = str.split(' ');
    switch(splitted[0].substring(0, 3)) {
      case "150": // Opening data channel for directory list.
        break;
      case "220": // Ready for login
        if(this.user == null) {
          this.emitEvent("login pls");
        } else {
          this.commander.sendln("USER " + this.user);
        }
        break;
      case "226": // Transfer Okay
        this.emitEvent('transfer ok');
        break;
      case "227": // Pasv Okay
        break;
      case "250":
        this.emitEvent("cwd success")
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

  pwd() {
    this.commander.sendln("PWD");
  }

  cwd(arg) {
    this.commander.sendln("CWD " + arg)
  }

  ls () {
    this.commander.on("recv", (str) => {
      // See if this is a the response `227 Entering Passive <addr-and-port>`
      if(!str.startsWith("227")) // Not the PASV response
        return;
      const regex = /([\d]+,)+[\d]+/;
      const match = regex.exec(str);
      if(match === null) {
        this.emitEvent("response error", [str]);
        return true;
      }
      const raw_addr = match[0].split(',');
      const addr = raw_addr.slice(0, 4).join(".");
      const raw_port = raw_addr.slice(4);
      var port = 0;
      for(let base of raw_port) { // FTP specifies port in radix-256
        port *= 256;
        port += parseInt(base, 10);
      }

      this.commander.sendln("MLSD");
      console.log("Connecting to " + addr + ":" + port);
      var secondary = new TcpConnection(addr, port);
      let buffer = "";
      this.once("transfer ok", () => {
        const entries = buffer.split(/(\r?\n)+/);
        const results = [];
        for(let entry_ of entries) {
          let entry = entry_.trim();
          if(!entry) {
            continue; // Try this.
          }
          let item = {}; // The item we will store it into.
          // First grab the facts of the file/dir entry
          const regex = /(?:(\w+)=([^;]+);)/g;
          let m = regex.exec(entry);
          if(m === null) {
            this.emitEvent('error', ["Bad MLSD entry line"]);
            return;
          }
          while (m !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex)
              regex.lastIndex++;
            // The result can be accessed through the `m`-variable.
            var fact = m[1].toLowerCase();
            if (fact == "size")
              item.size = m[2];
            else if (fact == "type")
              item.type = m[2].toLowerCase();
            else if (fact == "modify")
              item.date = m[2];
            else if (fact == "perm") {

            } else {
              console.log("Warning: unrecognized MLsD fact " + fact);
            }
            m = regex.exec(entry);
          }
          // Now grab the file/dir name
          const regexname = / .+$/;
          let mname = regexname.exec(entry);
          if(mname === null) {
            this.emitEvent('error', ["Bad MLSD entry line"]);
            console.log(entry);
            return;
          }
          item.name = mname[0].substring(1);
          results.push(item);
        }
        this.emitEvent('ls result', [results]);
      });
      secondary.on("recv", (str) => {
        buffer += str;
      });
      secondary.on("error", (str) => this._onError(str));
      secondary.connect();
      return true;
    });
    this.commander.sendln("PASV");
  }

  login(user, pass) {
    this.user = user;
    this.pass = pass;
    this.commander.sendln("USER " + this.user);
  }
}

export default FtpClient;
