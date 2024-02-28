const mongoose = require('mongoose');
const validator = require('validator');

const SignUp = require('./SignUpModel').SignUpModel;

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

        this.user = await SignUp.findOne({ email: this.body.email });
        if(!this.user){
            this.errors.push('E-mail não cadastrado');
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
