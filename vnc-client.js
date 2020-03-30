var rfb = require('rfb2');

module.exports = function(RED) {
  function vncClientNode(n) {
      RED.nodes.createNode(this,n);
      this.host = n.host;
      this.port = n.port;
      this.password = n.password;
      this.rfb  = rfb.createConnection({
        host: n.host,
        port: n.port,
        password: n.password
      });;
  }
  RED.nodes.registerType("vnc-client",vncClientNode);
}