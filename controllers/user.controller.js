let passport = require('passport');

let jwt = require('jsonwebtoken');

let User = require('../models/user')

exports.login = (req, res, next) => {
    
    passport.authenticate('local',
        (err, user, info) => {
     // server err?
        if(err)
        {
            return next(err);
        }
            
        if(!user)
        {
            return res.status(400).json({failed:true, message: "Invalid Credentials"}) 
        }
            req.login(user, (err) => {
                    
            // server error?
            if(err)
            {

                return next(err);
            }

            const payload = 
            {
                id: user._id,
                email: user.email,
                username:user.username,
                isAdmin:user.isAdmin
            }

            const authToken = jwt.sign(payload, process.env.Secret, {
                expiresIn: 604800 // 1 week
            });
            
            return res.status(200).json({success: true, message: 'User Logged in Successfully!', user:payload, token: authToken});
        });
    })(req, res, next);
}


exports.register = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
      email: req.body.email,
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
            return res.status(400).json({failed: true, message: 'User already exists'});
            }
            
        }
        else
        {
            return res.status(200).json({success: true, message: 'User Registered Successfully!'});
        }
    });
}

exports.logout = (req, res, next) => {
    req.logout();
    res.status(201).json({success: true, msg: 'Log out success!'});
}