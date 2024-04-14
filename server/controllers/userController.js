const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2d'});
}


// login user:
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        const username = user.username;

        res.status(200).json({email, username, token});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}


// signup user:
const signupUser = async (req, res) => {
    const {name, username, email, password} = req.body;
    try {
        const user = await User.signup(name, username, email, password);

        const token = createToken(user._id);
        
        res.status(200).json({email, username, token});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = { signupUser, loginUser };