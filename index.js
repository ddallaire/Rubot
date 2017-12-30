var cap = require('./caption.js');
var parser = require('./commandparser.js');
const fs = require("fs");
const login = require("facebook-chat-api");

login({email: "sample@gmail.com", password: "password"}, (err, api) => {
  if (err) {
    return console.error(err);
  }

  api.setOptions({selfListen: true});
  api.listen((err, message) => {
    if (message.body != undefined) {
      parser.parseCommand(message.body, function(err, command) {
        if (!err) {
          cap.caption(command.image, command.caption, function(err, captioned) {
            if (!err) {
              var msg = {
                body: "",
                attachment: fs.createReadStream(captioned)
              };
              api.sendMessage(msg, message.threadID);
            }
          });
        }
      });              
    }
  });
});