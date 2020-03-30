module.exports = function(RED) {
  function clipboardNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);

      if(this.client){
        this.client.rfb.on('clipboard', function(newPasteBufData) {
          msg = {payload: newPasteBufData};
          node.send(msg);
        });
      } else {
        console.log("Not Configured");
      }

      node.on('input', function(msg) {
        var cData = msg.payload.toString();
        this.client.rfb.updateClipboard(cData);
      });

  }
  RED.nodes.registerType("clipboard",clipboardNode);
}