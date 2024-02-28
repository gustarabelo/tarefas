const SignIn = require('../models/SignInModel');

exports.index = (req, res) => {
    res.render('signIn');
    return;
};

exports.login = async (req, res) => {
    try {
        const login = new SignIn(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                res.redirect('/signIn/index');
                return;
            })
            return;
        }

        req.flash('success', 'Conta logada com sucesso');
        req.session.save(() => {
            res.redirect('/signIn/index');
            return;
        })
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};
