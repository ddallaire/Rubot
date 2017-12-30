var img = require('./imageprocessor.js');

module.exports = {
  caption: function(image, caption, callback) {
    var options = {
	  caption: caption,
	  bottomCaption: caption,
	  outputFile: __dirname + '/images/' + image + '-captioned.jpg'
  	};

  	img.path(__dirname + '/images/' + image + '.jpg', options, function(err, captioned){
      if (err) {
        callback(err); 
      }
      else {
      	callback(null, captioned);
      }
    });
  }
};