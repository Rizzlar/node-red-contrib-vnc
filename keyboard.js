module.exports = function(RED) {
  function keyboardNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);

      node.on('input', function(msg) {
        if (typeof msg.payload == 'string'){
          strData = msg.payload.toString();
          for (var i = 0; i < strData.length; i++){
            this.client.rfb.keyEvent(strData.charCodeAt(i), 1);
          }
        } else {
          if('code' in msg.payload && 'state' in msg.payload){
            this.client.rfb.keyEvent(msg.payload.code, msg.payload.state);
          }
        }
        node.send(msg);
      });

  }
  RED.nodes.registerType("keyboard",keyboardNode);
}