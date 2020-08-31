const router = require('express').Router();
const User = require('../model/User');
const { sendEmail, sendSms } = require('../coman/coman');

// USER REGISTER 
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    });
    try {
        const saveUser = await user.save();
        var data = {
            message: 'Dummy code will work',
            mobile: saveUser.mobile
        }
        //sms
        let sms = await sendSms(data);
        console.log('************', sms);

        //email
        sendEmail(saveUser.email,)
            .then((send) => {
                console.log('Email Send')
                res.send(saveUser);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET USER LIST
router.get('/userlist', async (req, res) => {
    try{
        const user = await User.find();
        res.json(user);
    }catch(err){
        res.status(400).send(err);
    }
})


module.exports = router;

