const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const SignUp = require('./SignUpModel').SignUp;
const SignUpModel = require('./SignUpModel').SignUpModel;

const ModelSchema = mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
})

//const SignInModel = mongoose.model('SignIn', ModelSchema);

class SignIn {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async login(){
        this.valida();
        if(this.errors.length > 0) return;

        this.user = await SignUpModel.findOne({ email: this.body.email });

        if(!this.user){
            this.errors.push('E-mail não cadastrado');
            return;
        }

        // this.user = await SignUpModel.findOne({ password: this.body.password });
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    valida() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if (this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
        }
    };
};

module.exports = SignIn;
