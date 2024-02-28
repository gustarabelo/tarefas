const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    titulo: { type: String, required: true},
    descricao: String
})

const HomeModel = mongoose.model('Home', ModelSchema);

class Home {

}

module.exports = Home;
