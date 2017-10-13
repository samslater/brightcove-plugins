var mId = 0;

function sendMessage(name, data) {
    mId++;
    if (!data) {
        data = {};
    }
    var message = {
        name: name,
        id: mId,
        data: data
    }
    window.parent.postMessage(JSON.stringify(message), '*');
}

var events = ['play', 'pause', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'timeupdate', 'useractive', 'userinactive', 'volumechange'];
var eventsList = [];

if (typeof videojs !== 'undefined') {
    videojs.registerPlugin('iframeEventBroadcaster', function() {
        var player = this;

        for (var i = 0; i < events.length; i++) {
            var eventName = events[i];
            player.on(eventName, (function(name) {
                return function(e) {
					console.log(e, arguments);
                    sendMessage(name);
                };
            })(eventName));

        }
    });

}

setTimeout(function() {
    sendMessage('hello', {
        id: 12
    });
}, 5000);