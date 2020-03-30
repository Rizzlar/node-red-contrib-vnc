module.exports = function(RED) {
  function infoNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);

      node.on('input', function(msg) {
        msg.payload = {};
        msg.payload.title = this.client.rfb.title;
        msg.payload.height = this.client.rfb.height;
        msg.payload.width = this.client.rfb.width;
        node.send(msg);
      });

  }
  RED.nodes.registerType("info",infoNode);
}