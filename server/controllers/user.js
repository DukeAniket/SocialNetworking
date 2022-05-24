import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }
        
        const userData = req.body;
        const newUser = new User(userData);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        await newUser.save();
        res.status(201).json(newUser);


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const login = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({email: body.email});

    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            res.status(200).json(user);
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Invalid Password',
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'User does not exists',
        });
    }
}

