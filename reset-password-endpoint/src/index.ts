import express, { Express } from "express";
import rateLimit from 'express-rate-limit';
import cors from "cors";

const app = express();
const PORT = 3000;
const SECRET_KEY = "process.env.SECRET_KEY";
app.use(cors());

app.use(express.json());

const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 3, 
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, 
    legacyHeaders: false, 
});

const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Too many password reset attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});



const otpStore: Record<string,string> = {};

app.post('/send-otp',otpLimiter,(req,res) =>{
    const email = req.body.email;

    if(!email){
        return res.status(400).json({error: "Email is required"});
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    console.log(`OTP for ${email} is ${otp}`);
    res.status(200).json({ message: "OTP generated and logged" });

})


app.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword, token } = req.body;
    console.log(token);
  
    let formData = new FormData();
      formData.append('secret', SECRET_KEY);
      formData.append('response', token);
  
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const result = await fetch(url, {
          body: formData,
          method: 'POST',
      });
    const challengeSucceeded = (await result.json()).success;
  
    if (!challengeSucceeded) {
      return res.status(403).json({ message: "Invalid reCAPTCHA token" });
    }
  
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (Number(otpStore[email]) === Number(otp)) {
      console.log(`Password for ${email} has been reset to: ${newPassword}`);
      delete otpStore[email]; 
      res.status(200).json({ message: "Password has been reset successfully" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});


