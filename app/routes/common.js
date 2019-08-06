var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require("fs");
var path = require('path');
var appDir = path.dirname(require.main.filename);
var type = upload.single('file');
module.exports = function(app)
{


    app.post('/uploads', type, function (req, res, next) {

     var file = 'uploads/' + req.file.filename;
     console.log(file)
     var target_path = 'uploads/' + req.file.originalname;
     // console.log(req.file) 
     fs.rename(file, target_path, function(err) {
        if (err) { res.json(err)};
        res.json({message : "success" , filePath : "https://sellingappservice.herokuapp.com/"+target_path });  
     })

    })

};