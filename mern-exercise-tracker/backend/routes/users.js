const router = require('express').Router(); //needed to create routes.
let User = require('../models/user.model'); //mongoose model


//root route for this route.
router.route('/').get( (req,res) => {
    User.find()
    .then( users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles post requests at this route.
router.route('/add').post( (req, res) => {
    const username = req.body.username;
    //Create new instance of user
    const newUser = new User({username});

    //Save this new instance to the db
    newUser.save()
    .then( () => res.json('User added!')) //return this message
    .catch( err => res.status(400).json('Error: ' + err)); //else, return error.
});

//Standard for all router files.
module.exports = router;