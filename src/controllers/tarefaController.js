const Tarefa = require('../models/TarefaModel');

exports.index = (req, res) => {
    res.render('tarefa');
};

exports.register = async (req, res) => {
    try {
        const tarefa = new Tarefa(req.body);
        await tarefa.register();

        if (tarefa.errors.length > 0) {
            req.flash('errors', tarefa.errors);
            req.session.save(() => res.redirect('/tarefa/index'));
            return;
        };

        req.flash('success', 'Tarefa criada com sucesso');
        req.session.save(() => res.redirect('/tarefa/index'));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}
