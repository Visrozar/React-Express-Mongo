const User = require('../models/user');
const multer = require('multer');
const path = require('path');

//File Upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

 var upload = multer({ storage: storage }).single('resume');


module.exports = (router) => {

    router.post('/uploadResume', (req, res) => {
        upload(req, res, (err)=>{
            if(err) {
        res.json({ success: false, message: 'Could not upload file' + err });
            } else {
                // console.log(req.file.path);
                if (!req.body.email) {
                    res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
                } else {
                    // Check if username was provided
                    if (!req.body.name) {
                        res.json({ success: false, message: 'You must provide a name' }); // Return error
                    } else {
                        // Check if password was provided
                        if (!req.body.phone) {
                            res.json({ success: false, message: 'You must provide a phone number' }); // Return error
                        } else {
                            // Check if password was provided
                            if (!req.body.jobTitle) {
                                res.json({ success: false, message: 'You must provide a job title' }); // Return error
                            } else {
                                // Create new user object and apply user input
                                let user = new User({
                                    email: req.body.email.toLowerCase(),
                                    name: req.body.name.toLowerCase(),
                                    phone: req.body.phone,
                                    jobTitle: req.body.jobTitle.toLowerCase(),
                                    resume: req.file.path
                                });
                                // Save user to database
                                user.save((err) => {
                                    // Check if error occured
                                    if (err) {
                                        // Check if error is an error indicating duplicate account
                                        if (err.code === 11000) {
                                            res.json({ success: false, message: 'E-mail already exists' }); // Return error
                                        } else {
                                            // Check if error is a validation error
                                            if (err.errors) {
                                                // Check if validation error is in the email field
                                                if (err.errors.email) {
                                                    res.json({ success: false, message: err.errors.email.message }); // Return error
                                                } else {
                                                    // Check if validation error is in the name field
                                                    if (err.errors.name) {
                                                        res.json({ success: false, message: err.errors.username.message }); // Return error
                                                    } else {
                                                        // Check if validation error is in the phone field
                                                        if (err.errors.phone) {
                                                            res.json({ success: false, message: err.errors.phone.message }); // Return error
                                                        } else {
                                                            // Check if validation error is in the jobTitle field
                                                            if (err.errors.jobTitle) {
                                                                res.json({ success: false, message: err.errors.jobTitle.message }); // Return error
                                                            } else {
                                                                if (err.errors.resume) {
                                                                    res.json({ success: false, message: err.errors.resume.message }); // Return error
                                                                } else {
                                                                    res.json({ success: false, message: err }); // Return any other error not already covered
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                                            }
                                        }
                                    } else {
                                        res.json({ success: true, message: 'User added!' }); // Return success
                                    }
                                });
                            }
                        }
                    }
                }
                res.json({ success: true, message: 'File Uploaded!' });
            }
        });
    });

    router.get('/getUsers', (req, res) => {
        User.find({}).exec((err, users) => {
            if (err) {
                res.json({ success: false, message: err }); // Return error
            }
            else {
                if (!users) {
                    res.json({ success: false, message: 'No Users found' }); // Return error, user was not found in db
                } else {
                    res.json({ success: true, users: users }); // Return success, send users object to frontend
                }
            }
        });
    });



    return router;
}