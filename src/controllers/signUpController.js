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
            req.flash('errors', register.errors);
            req.session.save(() => {
                res.redirect('/signUp/index');
                return;
            })
            return;
        }

        req.flash('success', 'Conta criada com sucesso');
        req.session.save(() => {
            res.redirect('/signUp/index');
            return;
        })
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}
