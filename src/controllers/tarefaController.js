const Tarefa = require('../models/TarefaModel');

exports.index = (req, res) => {
    res.render('tarefa', {
        tarefa: {}
    });
};

exports.register = async (req, res) => {
    try {
        const tarefa = new Tarefa(req.body);
        await tarefa.register();

        if (tarefa.errors.length > 0) {
            req.flash('errors', tarefa.errors);
            req.session.save(() => res.redirect('/tarefa/index'));
            return;
        }

        req.flash('success', 'Tarefa criada com sucesso');
        req.session.save(() => res.redirect(`/tarefa/index/${tarefa.tarefa._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');

        const tarefa = await Tarefa.buscaId(req.params.id);
        if (!tarefa) return res.render('404');

        res.render('tarefa', { tarefa });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const tarefa = new Tarefa(req.body);
        await tarefa.edit(req.params.id);

        if (tarefa.errors.length > 0) {
            req.flash('errors', tarefa.errors);
            req.session.save(() => res.redirect(`/tarefa/index/${tarefa.tarefa._id}`));
            return;
        }

        req.flash('success', 'tarefa editada com sucesso');
        req.session.save(() => res.redirect(`/tarefa/index/${tarefa.tarefa._id}`));
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async (req, res) => {
    try{
        if (!req.params.id) return res.render('404');

        const tarefa = await Tarefa.delete(req.params.id);
        if (!tarefa) return res.render('404');

        req.flash('success', 'Tarefa deletada com sucesso');
        req.session.save(() => res.redirect('/'));
        return;
    } catch(e){
        console.log(e);
        res.render('404');
    }
};
