var db = require('./dataBase').db;

var getVideo = exports.getVideo = function(id, callback) {
    "use strict";

    db.videos.findOne({
        _id: db.ObjectId(id)
    }, function(err, video) {
        if (video === undefined) {
            log.warn('Video ', id, ' not found');
        }
        if (callback !== undefined) {
            callback(video);
        }
    });
};

exports.getList = function(callback) {
    "use strict";
    db.videos.find({}, function(err, videos) {
            if (err || !videos) {
                console.log("There are no videos");
            } else {
                callback(videos);
            }
    });
};

var hasVideo = exports.hasVideo = function(id, callback) {
    "use strict";

    getVideo(id, function(video) {
        if (video === undefined) {
            callback(false);
        } else {
            callback(true);
        }
    });
};

exports.addVideo = function(video, callback) {
    "use strict";

    db.videos.save(video, function(error, saved) {
        if (error) log.warn('MongoDB: Error adding video: ', error);
        if (callback !== undefined) {
            callback(saved);
        }
    });
};

/*
 * Removes a determined room from the data base.
 */
var removeVideo = exports.removeVideo = function(id, callback) {
    "use strict";

    hasVideo(id, function(hasVideo) {
        if (hasVideo) {
            db.videos.remove({
                _id: db.ObjectId(id)
            }, function(error, removed) {
                if (error) log.warn('MongoDB: Error removing video: ', error);
                callback("yes");
            });
        }
    });
};

