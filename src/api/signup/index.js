
const bcrypt = require("bcrypt");
const Register = require('./signupmodel/index');
const User = require('./signupmodel/index')
const { createTokens, validateToken } = require("../../../middleware/auth");

exports.signup = async(req, res) =>{

  try {
    if(!req.body.phoneNumber){
      res.send("enter phone number and password");
      return;
    }
    const phoneNumber = req.body.phoneNumber;
    var isuser = await User.findOne({ phoneNumber : phoneNumber});
    if(isuser){ res.send("user is already present");
  return;
  }
  
  const accessToken = createTokens(phoneNumber);
   
  const password = req.body.password;
    bcrypt.hash(password, 10).then((hash) => {
      Register.create({
        phoneNumber: phoneNumber,
        password: hash,
        userJWTtoken: accessToken
      })
        .then(() => {
          res.json("USER REGISTERED");
        })
    });
  } catch (error) {
    console.log(error)
  }
  
}

