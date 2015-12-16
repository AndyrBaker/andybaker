
//	variables

	var express = require('express');
	var app = express();
	var port = process.env.PORT || 8000;
	var directory = express.static(__dirname + '/public');

//	functions

	(function(){

		app.use(directory);

		app.listen(port, function(){

			console.log('Server started http://localhost:' + port + '/');

		});

	})();
