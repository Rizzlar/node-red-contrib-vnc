var rfb = require('rfb2');

module.exports = function(RED) {
  function vncClientNode(n) {
      RED.nodes.createNode(this,n);
      this.nodes = [];
      this.host = n.host;
      this.port = n.port;
      this.password = n.password;
      this.rfb  = rfb.createConnection({
        host: n.host,
        port: n.port,
        password: n.password
      });
      this.rfb.on('connect', () => {
        this.nodes.forEach((node) => {node.status({fill: "green", shape: "dot", text: "connected"})});
      }).on('error', (err) => {
        this.error(err);
        this.nodes.forEach((node) => {node.status({fill: "red", shape: "ring", text: "error"})});
      })
      this.on('close', (removed,deleted) => {
        this.rfb.end();
        done();
      })
  }
  RED.nodes.registerType("vnc-client",vncClientNode);
}