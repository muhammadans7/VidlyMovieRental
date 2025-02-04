
const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findOne(filter, projection, options);
    if (user) return res.status(400).send(user);
});



router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered');


    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    // user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // _.pick(user, ['id', 'name', 'email']);

    // res.send(user);
    // const token = jwt.sign({
    //     _id: user._id,
    //     name: user.name
    // },
    //     config.get('jwtwebtoken')
    // );

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));

});

router.get('/', async (req, res) => {

    const users = await User.find();

    res.send(users);
});

router.put('/:id', async (req, res) => {
    const user = await User.updateOne({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            
        }
    },
        { new: true }
    );

    res.send(user);
});




module.exports = router;