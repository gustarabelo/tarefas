const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: false, default: '' },
    vencimento: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const TarefaModel = mongoose.model('Tarefa', ModelSchema);

class Tarefa {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.tarefa = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.tarefa = await TarefaModel.create(this.body);
    };

    valida() {
        this.cleanUp();

        if (!this.body.titulo) this.errors.push('"Título" é um campo obrigatório.');
    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            titulo: this.body.titulo,
            descricao: this.body.descricao,
            vencimento: this.body.vencimento,
        }
    };

    async edit(id) {
        if (typeof id !== 'string') return;
        this.valida();
        if (this.errors.length > 0) return;
        this.tarefa = await TarefaModel.findByIdAndUpdate(id, this.body, { new: true });
    };

    static async buscaId(id) {
        if (typeof id !== 'string') return;
        const tarefa = await TarefaModel.findById(id);
        return tarefa;
    };

    static async buscaTarefas() {
        const tarefas = await TarefaModel.find().sort({ criadoEm: -1 });
        return tarefas;
    };

    static async delete(id) {
        if (typeof id !== 'string') return;
        const tarefa = await TarefaModel.findOneAndDelete({ _id: id });
        return tarefa;
    }
};

module.exports = Tarefa;
