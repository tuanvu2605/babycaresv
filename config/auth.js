// const express = require('express');
// const router  = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require("passport”);
// /* POST login. */
// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }
//        req.login(user, {session: false}, (err) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, 'your_jwt_secret');
//            return res.json({user, token});
//         });
//     })(req, res);
// });



module.exports = {

    'facebookAuth' : {
        'clientID'      : '1798359120444364', // your App ID
        'clientSecret'  : 'ae1d743b32e89db5b0daf36886986ffa', // your App Secret
        'callbackURL'   : 'https://sellingappservice.herokuapp.com/auth/facebook/callback'
    }
}