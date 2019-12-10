const router = require('express').Router(); //needed to create routes.
let Exercise = require('../models/exercise.model'); //mongoose model


//root route for this route.
router.route('/').get( (req,res) => {
    Exercise.find()
    .then( exercises => res.json(exercises)) //returns the exercises from the db as json when a get request is made at this route.
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles post requests.
router.route('/add').post( (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    //Save the new model in the db
    newExercise.save()
    .then( () => res.json('Exercise added!'))
    .catch( err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete( (req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then( () => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error ' + err));
});


router.route('/update/:id').post( (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then( () => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error ' + err));
    })
    .catch(err => res.status(400).json('Error ' + err));
});


module.exports = router;