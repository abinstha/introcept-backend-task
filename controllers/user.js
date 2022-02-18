const User = require('../models/User');

// handle form post request 
const newUser = async (req, res) => {
    req.body.hobbies = JSON.stringify(req.body.hobbies);
    try {
        // await User.create(req.body)
        return res.status(201).json({ msg: 'success' })
    } catch (error) {
        res.status(422).json({ msg: error })
    }
}

// handle form post request with database 
const newUserSchema = async (req, res) => {
    try {
        // req.body.phone = parseInt(req.body.phone);
        req.body.hobbies = JSON.stringify(req.body.hobbies);
        console.log(req.body)
        const user = await User.create(req.body);
        res.status(201).json({ msg: 'success' })
    } catch (error) {
        res.status(422).json({ msg: error })
    }
}

module.exports = { newUser, newUserSchema }