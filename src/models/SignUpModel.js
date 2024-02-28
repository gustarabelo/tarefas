const mongoose = require('mongoose');
const validator = require('validator');

const ModelSchema = mongoose.Schema({
    name: { type: String, required: true},
    surname: { type: String, required: false},
    email: { type: String, required: true},
    password: { type: String, required: true},
})

const SignUpModel = mongoose.model('Conta', ModelSchema);

class SignUp {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async register(){
        this.valida();

        if(this.errors.length > 0) return;

        this.user = await SignUpModel.create({email: this.body.email});
    };

    valida(){
        this.cleanUp();
        console.log('cheguei aq');

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if(this.password.length < 6 || this.password.length > 20){
            this.errors.push('A senha precisa ter entre 6 e 20 caracteres');
        }
    };

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
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

module.exports = SignUp;
