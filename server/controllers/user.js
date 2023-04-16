import User from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
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
    console.log(body);
    const user = await User.findOne({ email: body.email });

    console.log(user);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User does not exists',
        });
    }
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Password',
        });
    }

    const accessToken = jsonwebtoken.sign({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }, process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).json({ accessToken: accessToken });
}

export const getProfile = async (req, res) => {
    const userID = req.query.user_id;
    try {
        const userData = await User.findById(userID);
        if (!userData) {
            return res.status(400).json({
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

        return res.status(200).json({
            name: name,
            email: userData.email,
            bio: userData.bio,
            avatar: userData.avatar,
            posts: userData.posts,
            followers: userData.followers.length,
            following: userData.following.length,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getFollowing = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const result = await User.findById(user.following).select('firstName lastName email avatar');
        res.json({ following: result });
        return res.status(200);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getFollowers = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const result = await User.findById(user.followers).select('firstName lastName email avatar');
        res.json({ followers: result });
        return res.status(200);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const follow = async (req, res) => {
    try {
        const follower = await User.findOne({ email: req.user.email });
        const followed = await User.findOne({ email: req.body.email });
        followed.followers.push(follower);
        follower.following.push(followed);
        followed.save();
        follower.save();
        return res.status(200).json({ success: true, message: "User followed" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const unfollow = async (req, res) => {
    try {
        const follower = await User.findOne({ email: req.user.email });
        const followed = await User.findOne({ email: req.body.email });
        followed.followers.pull(follower);
        follower.following.pull(followed);
        followed.save();
        follower.save();
        return res.status(200).json({ success: true, message: "User unfollowed" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}