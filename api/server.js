const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const app = express();
const port = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://okhli:okhli@okhli-cluster.1mxwtim.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to mongodb");
})
    .catch((err) => {
        console.log("error in connection to mongodb", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const User = require("./models/user");
const Order = require("./models/order");

const transporter = nodemailer.createTransport({
    //configure the email service
    service: "gmail",
    auth: {
        user: "okhlitest@gmail.com",
        pass: "tigj ottk kvui koev"
    }
});

//endpoint to register in the app

app.post("/register", async (req, res) => {
    try {
        console.log("API ke registre me hoon");
        const { name, phNo, email, password, cnfPassword } = req.body;

        //check if the Email is already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(401).json({ message: "Email already Registered!" });
        }

        //check if the Mobile No is already registered
        const existingPhNo = await User.findOne({ phNo });
        if (existingPhNo) {
            return res.status(402).json({ message: "Mobile No. already Registered!" });
        }

        //generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("6 digit OTP is ", otp);

        //compose the email message
        const mailOptions = {
            from: "okhlitest@gmail.com",
            to: email,
            subject: "OTP for Email Verification",
            text: `Your OTP is: ${otp}`,
        };

        //send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending OTP email.' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ userId: newUser.id, message: 'Email sent successfully.' });
        });

        //Create a new User
        const newUser = new User({ name, email, phNo, password, cnfPassword, otp, verified: false });
        //save user to the database
        await newUser.save();
    } catch (error) {
        console.log("error registering new User", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

//endpoint to verify OTP the mail

app.post('/verify-otp', async (req, res) => {
    try {
        const enteredOTP = req.body.otp;
        if (enteredOTP == '') {
            return res.json({ message: 'Invalid OTP' });
        }

        const user = await User.findOne({ otp: enteredOTP });
        if (!user) {
            return res.json({ message: 'Invalid OTP' });
        }

        if (enteredOTP === user.otp) {
            user.verified = true;
            user.otp = "";
            await user.save();
            console.log("success verification");
            return res.status(200).json({ message: 'OTP verification successful' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// To create auth Key
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();

// endpoint to login the user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ code: 401, message: 'Invalid Email' });
        }

        //check if password is correct or not
        if (user.password !== password) {
            return res.json({ code: 402, message: "Invalid password" });
        }
        //generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.json({ token });

    } catch (error) {
        console.error('Error in logging in:', error);
        return res.status(500).json({ message: 'Login Failed' });
    }
});

//Endpoint for Auth token authentication

app.post('/auth', async (req, res) => {
    try {
        const authToken = req.body;
        let key = Object.keys(authToken);
        key = key[0];

        jwt.verify(key, secretKey, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);
            } else {
                console.log('Decoded Token:', decoded);
            }
        });

        console.log("auth API Ends Here");
        return res.status(101).json({ message: 'Auth done' });

    } catch (error) {
        console.error('Error in logging in:', error);
        return res.status(500).json({ message: 'Login Failed' });
    }
});