const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    titulo: { type: String, required: true},
    descricao: String
})

const HomeModel = mongoose.model('Home', ModelSchema);

// module.exports = HomeModel

class Home {

}

module.exports = Home;
