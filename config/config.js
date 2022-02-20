const port = 9000;
const secretKey = 'adlfjadlkjflkadjflk';
const expiredAfter = 999 * 365 * 24 * 1 * 60 * 60 * 1000;
let nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  name: "Gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'testing@gmail.com',
      pass: 'ateast@123d$'
    }
});
export default {
  port,
  secretKey,
  expiredAfter,
  transporter

};


