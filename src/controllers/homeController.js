exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Esse é o título ofc',
        nums: [0,1,2,3,4,5,6,7,8,9]
    });
    return;
};

exports.trataPost = (req, res) => {
    res.send(`Ei, sou sua nova rota de POST. ${req.body.nome}`)
};

