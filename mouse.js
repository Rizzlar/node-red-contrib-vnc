module.exports = function(RED) {
  function mouseNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);
      this.client.nodes.push(this);

      node.on('input', function(msg) {
        this.client.perform((err) => {
          if (err) return this.status(this.client.statuses.error);
          this.client.rfb.pointerEvent(msg.payload.x, msg.payload.y, msg.payload.mask);
          node.send(msg);
        });
      });

  }
  RED.nodes.registerType("mouse",mouseNode);
}