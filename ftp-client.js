(function(exports) {

  var tcp = chrome.sockets.tcp;

  function FtpClient(addr, port, user, pass) {
    this.addr = addr;
    this.port = port;
    this.user = user;
    this.pass = pass;

    this.commander = new TcpConnection(addr, port);
    this.commander.on("recv", function(str) {
      log(str);
    });
    this.commander.connect();
  }

  Heir.inherit(FtpClient, EventEmitter);

  function TcpConnection(addr, port) {
    this.addr = addr;
    this.port = port;
    this.connected = false;
    this.socketId = null;
    this._onReceive = this._onReceive.bind(this);
    this._onError = this._onError.bind(this);
  }

  Heir.inherit(TcpConnection, EventEmitter);

  TcpConnection.prototype.connect = function() {
    var that = this;
    tcp.create({}, function(info) {
      that.socketId = info.socketId;
      tcp.onReceive.addListener(that._onReceive);
      tcp.onReceiveError.addListener(that._onError);
      tcp.connect(that.socketId, that.addr, that.port, function(code) {
        if (code < 0) {
          that._onError(null, code);
        } else {
          that.connected = true;
          that.emitEvent('connected');
        }
      });
    });

    log('Connecting to server.');
  }

  TcpConnection.prototype.send = function(str) {
    stringToArrayBuffer(str, function(buf) {
      tcp.send(this.socketId, buf, function(sendInfo) {
        if(sendInfo.resultCode < 0)
          this._onError(null, sendInfo.resultCode);
      }.bind(this));
    }.bind(this));
  };

  TcpConnection.prototype._onReceive = function(receiveInfo) {
    if (receiveInfo.socketId != this.socketId)
      return;

    arrayBufferToString(receiveInfo.data, function(str) {
      this.emitEvent('recv', [str]);
      log("Recv: " + str);
    }.bind(this));
  };

  TcpConnection.prototype._onError = function(info, code) {
    error("Error code: " + code);
    this.emitEvent('error', [code]);
    this.disconnect();
  }

  TcpConnection.prototype.isConnected=function() {
    return this.connected;
  }

  TcpConnection.prototype.disconnect = function() {
    tcp.onReceive.removeListener(this._onReceive);
    tcp.onReceiveError.removeListener(this._onError);
    tcp.close(this.socketId);
  };

  function stringToArrayBuffer(str, callback) {
    var bb = new Blob([str]);
    var f = new FileReader();
    f.onload = function(e) {
        callback(e.target.result);
    };
    f.readAsArrayBuffer(bb);
  }

  function arrayBufferToString(buf, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      callback(e.target.result);
    };
    var blob = new Blob([buf], {type: 'application/octet-stream'});
    reader.readAsText(blob);
  }

  function log(msg) {
    console.log(msg);
  }

  function error(msg) {
    console.error(msg);
  }

  exports.FtpClient = FtpClient;
})(window);
