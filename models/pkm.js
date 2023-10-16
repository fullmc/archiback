const mongoose = require('mongoose'); 

const PkmSchema = new mongoose.Schema({
    name: { type: String, required: true},
    type: { type: String, required: true},
    level: { type: Number, required: true},
});


module.exports = mongoose.model('Pkm', PkmSchema);
