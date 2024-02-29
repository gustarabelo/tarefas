const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: false },
    vencimento: { type: String, required: true },
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
        if (!this.body.titulo) this.errors.push('"Título" é um campo obrigatório.');
    };
}

module.exports = Tarefa;
