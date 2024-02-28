const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const ModelSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const SignUpModel = mongoose.model('Conta', ModelSchema);

class SignUp {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;

        //exports.user = this.user;
    };

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExists();
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await SignUpModel.create(this.body);
    };

    valida() {
        this.cleanUp();

        if(this.body.name.length < 4 || this.body.name.length > 20) this.errors.push('Nome inválido');

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if (this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    };

    async userExists() {
        this.user = await SignUpModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('E-mail já cadastrado');
    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            email: this.body.email,
            password: this.body.password,
        }
    };
};

module.exports = { SignUp, SignUpModel};
