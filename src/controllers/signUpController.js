const SignUp = require('../models/SignUpModel');

exports.index = (req, res) => {
    res.render('signUp');
    return;
};

exports.register = async (req, res) => {
    try {
        const register = new SignUp(req.body);
        await register.register();

        if (register.errors.length > 0) {
            res.send(register.errors);
        }
        res.send('Feito');
    } catch (e) {
        console.log(e);
    }
}
