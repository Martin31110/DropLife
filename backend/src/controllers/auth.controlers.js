import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import nodemailer from 'nodemailer'

export const register = async (req, res) => {
    
  try {
    const {email, password, username, profileImage, points } = req.body;
    console.log(email, password, username, profileImage, points);

    const userFound = await User.findOne({email})
    
    if(userFound){
      return res.status(400).json(["The email is already in use"])
    }  

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
        username,
        email,
        password: passwordHash,
        profileImage, // Aquí incluimos la URL de la imagen de perfil proporcionada por el usuario
        points: 0,
        
    });

    // Save the user to the database
    const userSaved = await newUser.save();

    // Generate access token
    const token = await createAccessToken({ 
      id: userSaved._id 
    });

    // Send welcome email
    // Config the credentials for the message to GMAIL
    const config = {
      host: 'smtp.gmail.com', 
      port: 587,
      auth: {
          user: 'droplife426@gmail.com',
          pass: 'iqvs ylrr cxuw wtxf'
      }
    };

    const subject = `Hi ${userSaved.username} Thanks for support us, and register with us, Welcome to this great community`;
    const text = `You Have ${userSaved.points} Points,  To encourage your participation in water conservation efforts, we will organize various activities where you can earn prizes based on accumulated points. The more points you gather, the better the rewards. Additionally, you will have the opportunity to communicate with us, allowing you the privilege to initiate campaigns independently. You can invite your community to join this ongoing battle for water conservation.`;

    const message = {
      from: 'droplife426@gmail.com',
      to: userSaved.email,
      subject: subject,
      text: text
    };

    const transport = nodemailer.createTransport(config);

    try {
        const info = await transport.sendMail(message);
        console.log(info);
    } catch (error) {
        console.error(error);
    }

    // Set the token in the cookie
    res.cookie('token', token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
    })

    // Send the user details in the response
    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        profileImage: userSaved.profileImage, 
        points: userSaved.points,
        createdAT: userSaved.createdAt,
        updateAT: userSaved.updatedAt
    });

} catch (error) {
    res.status(500).json({ message: error.message });
}

};

//Login

export const login  = async (req, res) => {
    try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });



  } catch (error) {
    return res.status(500).json({ message: error.message });
  }


};

//Logout

export const logout =  (req, res ) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
};


//Verify the token for the login
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);

      console.log("User Info:", userFound); // Agrega este log
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
 };

  //profile

 export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const userProfile = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        };

        return res.json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
 };