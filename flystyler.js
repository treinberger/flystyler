//initialize by specifying web server

var timer = null;

function __init(styleUrl, view) {

	view.on("close", function(e) {
		__stop();
	});
	//create http requests, one after the other

	//1) by class

	//2) by Tag/Type

	//3) by id

	var views = getViews(view);
	Ti.API.debug("#Views = " + views.length);
	var started = false;
	var currentStyleDefinition = "";
	timer = setInterval(function() {

		if (!started) {
			var xhr = Ti.Network.createHTTPClient({
				onload : function(e) {

					try {
						var styleDefinition = eval('({' + this.responseText + '})');

						if (this.responseText != currentStyleDefinition) {

							//Ti.API.debug(JSON.stringify(styleDefinition));
							Ti.API.debug("--------------------");

							for (var i = 0; i < views.length; i++) {
								var currentView = views[i];
								Ti.API.debug(JSON.stringify(currentView));
								if (!_.isUndefined(currentView.styleClass)) {
									Ti.API.debug("class = " + currentView.styleClass);
									var styleClasses = currentView.styleClass.split(" ");

									for (var j = 0; j < styleClasses.length; j++) {
										Ti.API.debug("searching for style class ." + styleClasses[j]);
										if (!_.isUndefined(styleDefinition["." + styleClasses[j]])) {
											Ti.API.debug("match class!");
											_.extend(views[i], styleDefinition["." + styleClasses[j]]);
										}
									}
								}
								if (!_.isUndefined(currentView.id) && !_.isUndefined(styleDefinition["#" + currentView.id])) {
									Ti.API.debug("match!");
									_.extend(views[i], styleDefinition["#" + currentView.id]);

								}

								if (!_.isUndefined(currentView.Tag) && !_.isUndefined(styleDefinition[currentView.Tag])) {
									Ti.API.debug("match by Ti ns!");
									_.extend(views[i], styleDefinition[currentView.Tag]);
								}
								currentView = null;
							}
							currentStyleDefinition = this.responseText;
							started = false;

						} else {
							Ti.API.debug("Styles are identical. Nothing to do.");
							started = false;
						}

					} catch (e) {
						Ti.API.debug(JSON.stringify(e));
						started = false;
					} finally {
						xhr = null;
					}

				},
				onerror : function(e) {
					Ti.API.debug(JSON.stringify(e));
				},
				timeout : 2000 // in milliseconds
			});

			xhr.open("GET", styleUrl);
			Ti.API.debug("opening " + styleUrl);

			started = true;
			xhr.send();
		}

	}, 2000);

}

function __stop() {
	if (timer != null)
		clearInterval(timer);
	Ti.API.debug("flystyler stopped.");
}

function getViews(view) {
	var result = [];

	var thisChildren = view.getChildren();

	result = result.concat(thisChildren);

	_.each(thisChildren, function(v) {
		result = result.concat(getViews(v));
	});

	return result;
}

exports.init = __init;
exports.stop = __stop;
