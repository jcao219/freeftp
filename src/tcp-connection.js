import Heir from './heir';
import EventEmitter from './event-emitter';
import {NetErrorCode} from './net-errors';

var tcp = chrome.sockets.tcp;

function TcpConnection(addr, port, keepAlive) {
  this.addr = addr;
  this.port = port;
  this.keepAlive = keepAlive === true;
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
        that._onError({resultCode:code});
      } else {
        that.connected = true;
        if(that.keepAlive)
          tcp.setKeepAlive(that.socketId, true, function(result) { 
            if (chrome.runtime.lastError) {
              console.warn("Could not set keep-alive: " + chrome.runtime.lastError.message);
            }
          });
        that.emitEvent('connected');
      }
    });
  });

  log('Connecting to server.');
}

TcpConnection.prototype.send = function(str) {
  console.log("Send: " + str);
  stringToArrayBuffer(str, function(buf) {
    tcp.send(this.socketId, buf, function(sendInfo) {
      if(sendInfo.resultCode < 0)
        this._onError(sendInfo);
    }.bind(this));
  }.bind(this));
};

TcpConnection.prototype.sendln = function(str) {
  this.send(str + "\r\n");
};

TcpConnection.prototype._onReceive = function(receiveInfo) {
  if (receiveInfo.socketId !== this.socketId)
    return;

  arrayBufferToString(receiveInfo.data, function(str) {
    this.emitEvent('recv', [str]);
    log("Recv: " + str);
  }.bind(this));
};

TcpConnection.prototype._onError = function(info) {
  var code = info.resultCode;
  const msg = NetErrorCode[code];
  console.warn("Error code (" + code + "): " + msg);
  this.emitEvent('error', [msg]);
  this.disconnect();
}

TcpConnection.prototype.isConnected=function() {
  return this.connected;
}

TcpConnection.prototype.disconnect = function() {
  this.connected = false;
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

export default TcpConnection;

