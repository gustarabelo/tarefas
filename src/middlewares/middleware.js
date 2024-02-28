exports.middlewareGlobal = (req, res, next) => {
    res.locals.varLocal = 'variavel local é essa';
    //console.log('Passei aqui')
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}
