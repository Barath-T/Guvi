const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

loginRouter.post("/",
    async (req, res) => {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        const correctPassword = (user === null)
            ? false
            : await bcrypt.compare(password, user.passwordHash);

        if (!correctPassword) {
            return res
                .status(401)
                .json({error: "incorrect email or password"});
        }

        const toTokenize = {
            email: user.email,
            id: user._id
        };

        const token = jwt.sign(toTokenize, process.env.SECRET, {expiresIn: 60 * 60});

        return res
            .status(200)
            .send({token, email: user.email});

    });

module.exports = loginRouter;
