var videosRegistry = require('./../mdb/videosRegistry.js');
var fs = require('fs');
var path = require('path');
/* GET home page. */
exports.getList = function(req, res) {


	fs.readdir("public/videos", function (err, files) {
		// console.log(files, err);
		var videos = {};
		var index = 0;
		files.forEach (function (f) {
			console.log(f);
			var id = path.basename(f);
			var url = "http://" + config.mitubo.URL + ":" + config.mitubo.port + "/"+ id;
			videos[id] = url;

		});

			res.json(videos);

		// res.render('index', {files: videos});
	});
	// videosRegistry.getList(function(videos){
	// 	console.log(videos);
	// 	res.send({"PRUEBA": "hola"});

	// })

};

