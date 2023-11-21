const User = require('../models/user');
const bcrypt = require('bcrypt');

const util = require('util');
const hashAsync = util.promisify(bcrypt.hash);

const isStringValid = (string) => {
    if(!string || string.length ===0){
        return true;
    }else
        return false;
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (isStringValid(name) || isStringValid(email) || isStringValid(password)) {
            return res.status(400).json({ err: "Bad parameter. Something missing" });
        }

        const hashedPassword = await hashAsync(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Successfully signed up!!' });
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ success: false, message: 'Email is already in use. Please use a different email.' });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


module.exports = {
    signup
}