const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenKey=process.env.TOKEN_KEY




// user registration
exports.register = async (req, res) => {
  try {
    const { email, password, profilePicture,coverPicture, isAdmin, userName, city, from, relationship} =
      req.body;
    // form validation server side
    if (
      !(email && password && userName )
    ) {
      return res.status(400).send("all input are required");
    }

    // check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User ALeready exists, Please login");
    }

    // Ecrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // saving our new created instance
    const savedUser = await User.create({
      email,
      password: encryptedPassword,
      userName,
      isAdmin,
      city,
      from,
      relationship
    });

    // generate token
    const token = jwt.sign(
      { user_id: savedUser._id, email },
      tokenKey,
      { expiresIn: "2h" }
    );

    // save user token
    savedUser.token = token;

    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};




/// login a user
exports.login = async (req, res) => {
  try {
    // our login logic starts here
    //Get user input
    const { email, password } = req.body;
    //validate user input
    if (!(email && password)) {
      return res.status(400).send("All input are required");
    }
    // validate if usrr exists in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create a token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      // register user token
      user.token = token;

      // response
      res.status(200).send(user);
    } else {
      res.status(409).send("incorrect email or password");
    }
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};

exports.getFriends=async (req,res)=>{
    try{
      const user=await User.findById(req.params.userId);
      const friends=await Promise.all(
        user.followings.map((friendId)=>{
          return User.findById(friendId);
        })
      );
      let friendList=[];
      friends.map((friend)=>{
        const {_id,useName,profilePicture}=friend;
        friendList.push({_id,userName,profilePicture});
      });
        res.status(200).json(friendList)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getUser=async (req,res)=>{
    try{
        const user=await User.find({
            _id:req.params.userId
        })
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
}