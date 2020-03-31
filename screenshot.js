var Jimp = require('jimp');

module.exports = function(RED) {
  function screenshotNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      this.client = RED.nodes.getNode(config.client);
      this.client.nodes.push(this);
      

      node.on('input', function(msg) {
        this.client.perform((err) => {
          if (err) return this.status(this.client.statuses.error);
          r = this.client.rfb;
          this.client.rfb.once('rect', (rect) => {
            var png = new Jimp({data: parseRectAsRGBABuffer(rect), height: rect.height, width: rect.width});
            png.getBuffer(Jimp.MIME_PNG, (err,buf) => {
              if (err){
                msg.payload = "Error: "
              }
              msg.payload = buf;
              node.send(msg);
            })
          });
          r.requestUpdate(false, 0, 0, r.width, r.height);
        });
      });
  }
  RED.nodes.registerType("screenshot",screenshotNode);
}

allocBinaryBuffer = (size) => {
  return Buffer.alloc(size);
};

parseRectAsRGBABuffer = (rect) => {
const size = rect.width * rect.height * 4;
const rgba = allocBinaryBuffer(size);
for (let i = 0; i < size; i += 4) {
  rgba.writeUInt8(rect.data[i + 2], i);
  rgba.writeUInt8(rect.data[i + 1], i + 1);
  rgba.writeUInt8(rect.data[i], i + 2);
  rgba.writeUInt8(255, i + 3);
}
return rgba;
};