var electron    = require('electron');
var main        = electron.remote.require('./main.js');
var ipcRenderer = electron.ipcRenderer;
var parseArguments = require('../src/parseArguments.js');
var jeff = require('../src/index.js');

ipcRenderer.on('argv', function (sender, argv) {
	argv = JSON.parse(argv);
	var haveArguments = argv.length > 2;

	if (haveArguments) {
		// execute jeff with provided arguments
		var exportParams = parseArguments(argv);
		jeff(exportParams, function onComplete() {
			// close electron application
			main.quit();
		});
	} else {
		// no arguments => start Jeff in GUI mode
		require('./gui');
	}
});
