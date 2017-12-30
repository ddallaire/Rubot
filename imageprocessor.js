var im = require('imagemagick');
const fs = require("fs");

var generate = function(imgPath, caption, options, callback) {
  im.identify(imgPath, function(err, features) {
    var outFile = imgPath.replace(/\.(\w+)$/,'-captioned.$1');
    var h = features.height;
    var w = features.width;
    var args = [
      //'-font', 'OpenSansEmoji',
      '-strokewidth','2',
      '-stroke','black',
      '-background','transparent',
      '-fill','white',
      '-gravity','south',
      '-size',w/1.2+'x'+h/3,
      "caption:"+unescape(caption),
      imgPath,
      '+swap',
      '-gravity',
      'south',
      '-size',w+'x',
      '-composite',
      outFile
    ];
    im.convert(args, function(err){
      callback(err, outFile);
    });
  });
};

var fromPath = module.exports.path = function(imagePath, options, callback) {
  var caption = options.caption;
  var bottomCaption = options.bottomCaption;
  var outputFile = options.outputFile;
  generate(imagePath, caption, {top : !!bottomCaption}, function(err, captioned, original) {
    callback(err, captioned);
  });
};