import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

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

    if (!user) {
        res.status(400).json({
            success: false,
            message: 'User does not exists',
        });
    }
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
        res.status(400).json({
            success: false,
            message: 'Invalid Password',
        });
    }
    
    const accessToken = jsonwebtoken.sign({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).json({ accessToken: accessToken });
}

export const getProfile = async (req, res) => {
    const userID = req.query.user_id;
    try {
        const userData = await User.findById(userID);
        if (!userData) {
            res.status(400).json({
                success: false,
                message: 'User does not exists',
            });
        }
        let name;

        if (userData.lastName) {
            name = `${userData.firstName} ${userData.lastName}`;
        }
        else {
            name = userData.firstName;
        }

        res.status(200).json({
            name: name,
            email: userData.email,
            bio: userData.bio,
            avatar: userData.avatar,
            posts: userData.posts,
            followers: userData.followers.length,
            following: userData.following.length,
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}