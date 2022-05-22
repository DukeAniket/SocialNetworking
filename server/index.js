import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';

import postRoutes from "./routes/posts.js";

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({limit: "30mb", extendend : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extendend : true}));
app.use(cors);

const userName = "dukesocial";
const userPass = "dukesocial12345";
const CONNECTION_URL = `mongodb+srv://${userName}:${userPass}@cluster0.rybon.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error)=> console.log(error.message));
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));


// mongoose.set('useFindAndModify', false);
