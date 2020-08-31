
require('dotenv').config();

const nodemailer = require('nodemailer');
const client = require('twilio')(process.env.accountSID, process.env.authToken);

// EMAIL SEND
module.exports.sendEmail = async (emailId) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    let info = await transporter.sendMail({
        to: emailId,
        subject: 'Hello User',
        text: 'dummy code will work'

    })
    console.log('EMail send');

}

// SMS SEND
module.exports.sendSms = (smsData) => {
    return new Promise(async (resolve, reject) => {
        try {
            await client.messages.create({
                body: smsData.message,
                from: '+19542510783',
                to: '+91'+smsData.mobile
            }).then((message) => {
                if (message.status == 'failed' || message.status == 'undelivered') {
                    console.log("------failed-----");
                    return resolve("SMS_NOT_SEND");
                } else {
                    console.log("------deliver----");
                    return resolve("SMS_SENT");
                }
            }).catch(err => {
                console.log("err in the twilio catch block ::: ", err)
                throw new Error("SMS_NOT_SENT");
            });
        } catch (error) {
            resolve(error.message);
        }
    })

}

