const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

usersRouter.get("/", async(request, response)=>{
    const users = await User.find({});
    response.json(users);
});

usersRouter.post("/", async (request, response)=>{
    const { name, email, password, gender, age, dob, mobile } = request.body;

    if(await User.findOne({email})){
        return response.status(400).json({error: "email already exists!"});
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({name, email, passwordHash, gender, age, dob: new Date(dob), mobile});

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
});

module.exports = usersRouter;
