var rfb = require('rfb2');

module.exports = function(RED) {
  function vncClientNode(n) {
      RED.nodes.createNode(this,n);
      //Config Params
      this.host = n.host;
      this.port = n.port;
      this.password = n.password;

      //Instance Vars
      this.connected = false;
      this.connecting = false;
      this.nodes = [];
      this.statuses = {
        connected: {fill: 'green', shape: 'dot', text: 'connected'},
        connecting: {fill: 'yellow', shape: 'ring', text: 'connecting'},
        error: {fill: 'red', shape: 'ring', text: 'error'}
      }

      //Node Events
      this.on('close', (removed,deleted) => {
        this.rfb.end();
        done();
      })

      //Functions
      this.connect = (callback) => {
        callback = callback || function(){};
        this.connecting = true;
        this.updateStatus(this.statuses.connecting);
        this.rfb  = rfb.createConnection({
          host: n.host,
          port: n.port,
          password: n.password
        });
        this.rfb.on('connect', () => {
          this.connected = true;
          this.connecting = false;
          this.updateStatus(this.statuses.connected);
          this.clipboardNodes('register');
          callback();
        }).on('error', (err) => {
          this.connecting = false;
          if (err == 'Error: This socket has been ended by the other party'){
            this.connected = false;
            this.clipboardNodes('unregister');
            this.connect();
            return callback(err);
          } else {
            this.updateStatus(this.statuses.error);
            this.clipboardNodes('unregister');
            this.error(err);
            return callback(err);
          }
        })
      }

      this.updateStatus = (status) => {
        this.nodes.forEach((node) => {node.status(status)});
      }

      this.clipboardNodes = (func) => {
        switch(func){
          case 'register':
            this.nodes.forEach((n) => {
              if (n.type == 'clipboard' && !n.registered) n.register();
            })
            break;
          case 'unregister':
            this.nodes.forEach((n) => {
              if (n.type == 'clipboard') n.registered = false;
            })
            break;
        }
      }
      
      this.perform = (callback) => {
        callback = callback || function(){};
        if (this.connected){
          callback();
        } else if (this.connecting){
          this.error('Error: Connection attempt already in progress')
          return callback('Error: Connection attempt already in progress');
        } else {
          this.connect(callback);
        }
      }
  }
  RED.nodes.registerType('vnc-client',vncClientNode);
}

