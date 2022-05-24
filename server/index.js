import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(express.json({limit: "30mb", extended : true}));
app.use(express.urlencoded({limit: "30mb", extended : true}));

app.use('/posts', postRoutes);

// app.use(bodyParser.json({limit: "30mb", extended : true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended : true}));
app.use(cors);



const userName = process.env.user;
const userPass = process.env.userPass;

const CONNECTION_URL = `mongodb+srv://${userName}:${userPass}@cluster0.rybon.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error)=> console.log(error.message));
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));


// mongoose.set('useFindAndModify', false);
