module.exports = function(RED) {
  function infoNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);
      this.client.nodes.push(this);
      
      node.on('input', function(msg) {
        this.client.perform((err) => {
          if (err) return this.status(this.client.statuses.error);
          msg.payload = {};
          msg.payload.title = this.client.rfb.title;
          msg.payload.height = this.client.rfb.height;
          msg.payload.width = this.client.rfb.width;
          msg.payload.depth = this.client.rfb.depth;
          node.send(msg);
        })
      });

  }
  RED.nodes.registerType("info",infoNode);
}