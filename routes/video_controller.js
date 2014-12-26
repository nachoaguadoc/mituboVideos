var videosRegistry = require('./../mdb/videosRegistry.js');
var fs = require('fs');
var path = require('path');
var config = require('./../mitubo_config.js');
/* GET home page. */
exports.getList = function(req, res) {


	fs.readdir(config.mitubo.videosPath, function (err, files) {
		// console.log(files, err);
		var videos = {};
		var index = 0;
		files.forEach (function (f) {
			console.log(f);
			var id = path.basename(f);
			var url = "http://" + config.mitubo.URL + "/" +  id;

			videos[id] = url;

		});

			res.json(videos);

	});


};

