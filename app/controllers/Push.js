var apn = require('apn');
var options = {
    token: {
      key: "app/controllers/AuthKey_7LAQ57WQ5Q.p8",
      keyId: "7LAQ57WQ5Q",
      teamId: "BKF8N939U5"
    },
    production: false
  };
  
  var apnProvider = new apn.Provider(options);

  exports.push = function(req,res,next) {
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = "ping.aiff";
    note.alert = "Bạn có thông báo mới từ Tuấn Vũ";
    note.payload = {'messageFrom': 'John Appleseed'};
    note.topic = "vn.vnptepay.pushnotify";
    var deviceToken  = "bfcfd7b59f0c6af94018acb6c1a3f0589795990de01dc98b3bab2fcb4e09d528";

    // var deviceToken = "afc41862617b577c87b78b7aa665bc78e5eeba117e9b8a776e2b2b73da3ae5e3"
    apnProvider.send(note, deviceToken).then( (result) => {
        // see documentation for an explanation of result
        console.log(result)
        res.json({});
      });

  }