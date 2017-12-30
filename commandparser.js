var validCommands = ['sample'];
var validDelimiters = ['!'];

module.exports = {
  parseCommand: function(plainText, callback) {
  	data = plainText.split(/ (.+)/);
  	if (validDelimiters.includes(data[0].charAt(0)) && validCommands.includes(data[0].substring(1, data[0].length))) {
  		var command = {
  			image: data[0].substring(1, data[0].length),
  			caption: data[1]
  		};
  		callback(null, command);
  	}
  	else {
  		callback('Invalid Command');
  	}
  }
};