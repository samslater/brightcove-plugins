(function() {

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
        console.log('message', message);
        window.parent.postMessage(JSON.stringify(message), '*');
    }

    var events = [
        'progress', // Buffering (loading) video data
        'waiting', // 	Waiting momentarily for requested video data
        'stalled', // 	Buffering stalled
        'error', // 	Error occurred while loading video
        'playing', // Playback resumed following pause or download delay
        'ratechange', // Playback rate has changed (could be manual or automatic)
        'loadstart', // Dispatched when the player is initialized, and if it’s re-initialized in the case of giving it a new source to play
        'loadedmetadata', //  Dispatched when the player has initial duration and dimension information, in other words, when the first segment is downloaded. For live videos the loadedmetadata event won't be dispatched until the user clicks play. This is because live videos don't start downloading segments until the user clicks play.
        'play',
        'pause',
        'ready', // method has a dual personality in that it seems like an event, but you use it like a method. This method/event means the player is ready to receive commands.
        'ended',
        'loadeddata',  //  Dispatched when the player has downloaded data at the current playback position
        'timeupdate',
        'useractive',
        'userinactive',
        'bc-catalog-error',
        'fullscreenchange ',  // event is emitted by the player when it is toggled to or from fullscreen mode.
        'volumechange',
        'video_load',
        'percent_played',
        'start',
        'seek_start',
        'seek_end',
        'fullscreen_exit',
        'fullscreen_enter',
        'resize',
        'volume_change',
        'player_load',
        'end'
    ];

    var eventsList = [];

    if (typeof videojs !== 'undefined') {
        videojs.registerPlugin('iframeEventBroadcaster', function() {
            var player = this;
            for (var i = 0; i < events.length; i++) {
                var eventName = events[i];
                console.log('eventName', eventName);
                player.on(eventName, (function(name) {
                    return function(e) {
                        // console.log(e, arguments);
                        sendMessage(name, {
                            mediainfo: this.mediainfo,
                            currentSrc: this.currentSrc(),
                            currentTime: this.currentTime(),
                            duration: this.duration(),
                            muted: this.muted(),
                            volume: this.volume(),
                            width: this.width(),
                            height: this.height(),
                            options: this.options(),
                            isFullscreen: this.isFullscreen(),
                        });
                    };
                })(eventName));
            }
        });
    } else {
        console.error('videojs not found');
    }

    setTimeout(function() {
        sendMessage('ready');
    }, 100);

})();