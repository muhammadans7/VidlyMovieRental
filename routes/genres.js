const express = require('express');
const { Genre, validateGenre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();


// getting all genres

router.get('/', async (req, res , next) => {

    try {
        
        const genres = await Genre.find();
        res.send(genres);
    }

    catch (ex) {

        next(ex);
    }

});
function add(a, v) {
    return a + v;
}
console.log(add(5, 6));

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find()
        res.send(genres);
    }
    catch (ex) {
        next(ex);
    }
})


// adding genre
router.post('/', auth , async (req, res) => {

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    const result = await genre.save();

    res.send(result);
    
});

// updating genre

router.put('/:id', async (req, res) => {
    
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!genre) return res.status(404).send('genre with a given Id was not found');

    res.send(genre);
});


// delete

router.delete('/:id', [auth, admin] ,async (req, res) => {
    
    const genre = await Genre.findByIdAndDelete(req.param.id);

    if (!genre) return res.status(404).send('genre with a given Id was not found');
    
    res.send(genre);
});

// getting genres by id

router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('genre with a given Id was not found');

    res.send(genre);


});




module.exports = router;
