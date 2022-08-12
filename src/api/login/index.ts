// const express = require('express');
// const app = express();
var accountSid = 'ACcc8a88c429a18e1392edcd485a4c459b'; // Your Account SID from www.twilio.com/console
var authToken = 'cecc765f24a2f2dac96de9bdb31d64cb';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken)  // Your Auth Token from www.twilio.com/console
require('dotenv').config();

// app.use(express.json());

// const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../../../middleware/auth");
const User = require('../../api/signup/signupmodel/index');

exports.test = (req,res)=>
{
  res.send("hello i am tested now");
}

exports.auth = async (req, res) => {
  if(!req.body.phoneNumber)
  {
    res.send("please enter phone number")
  }
  const user = await User.findOne({ phoneNumber : req.body.phoneNumber });

  if (!user){ 
    res.send("user is not present");
  return;
}

  client.verify.services('VAa4d5d41bf5b560de1d3eb8f5784b0de2')
    .verifications
    .create({ to: `+91${req.body.phoneNumber}`, channel: 'sms' })
    .then(verification => console.log("verification status",verification.status))
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });

  res.status(200).send("OTP sent");
}


exports.verify = async (req, res) => {
  if(!req.body.phoneNumber||!req.body.otp)
  {
    res.status(404);
  }
  const phoneNumber = req.body.phoneNumber;
  const user = await User.findOne({ phoneNumber : phoneNumber });

  if (!user) res.send("user not found");
else{
  //  const accessToken = createTokens(phoneNumber);
  // res.cookie("access-token", accessToken, {
  //   maxAge: 60 * 60 * 24 * 30 * 1000,
  //   httpOnly: true,
  // });
  const check = await client.verify.services('VAa4d5d41bf5b560de1d3eb8f5784b0de2')
    .verificationChecks
    .create({ to: `+91${phoneNumber}`, code: req.body.otp })
    .then(verification =>
       console.log("verification status",verification.status)
        )
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });
    res.status(200).send("login sucessfully");
  // console.log(check);
}
}



