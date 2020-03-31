module.exports = function(RED) {
  function clipboardNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);
      this.client.nodes.push(this);
      this.status({fill: 'yellow', shape: 'ring', text: 'connecting'});
      this.registered = false;

      this.register = () => {
        this.client.perform((err) => {
          if (err) return;
          this.client.rfb.on('clipboard', function(newPasteBufData) {
            msg = {payload: newPasteBufData};
            node.send(msg);
          });
          this.registerd = true;
        })
      }

      if(this.client){
        this.register();
      } else {
        node.error('Node not configured')
      }
      
      node.on('input', function(msg) {
        var cData = msg.payload.toString();
        this.client.rfb.updateClipboard(cData);
        console.log(this);
      });

  }
  RED.nodes.registerType('clipboard',clipboardNode);
}